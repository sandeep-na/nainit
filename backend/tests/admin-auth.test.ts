import { after, afterEach, before, mock, test } from "node:test";
import assert from "node:assert/strict";
import type { Server } from "node:http";
import app from "../src/app.js";
import { User } from "../src/models/User.js";
import { Application } from "../src/models/Application.js";
import { Contact } from "../src/models/Contact.js";
import { signToken } from "../src/utils/sendToken.js";

let server: Server;
let base: string;
before(async () => {
  server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();
  assert(address && typeof address !== "string");
  base = `http://127.0.0.1:${address.port}`;
});
after(() => new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())));
afterEach(() => mock.restoreAll());
const post = (path: string, data: object) => fetch(`${base}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
const account = (role: string) => ({ id: "account-id", name: "Test account", email: "admin@example.com", role, comparePassword: async (password: string) => password === "correct-password" });
const lookupAccount = (role: string) => mock.method(User, "findById", () => ({ select: async () => account(role) }));

test("public registration no longer exists", async () => {
  const response = await post("/api/auth/register", { name: "Visitor", email: "visitor@example.com", password: "password123" });
  assert.equal(response.status, 404);
});

test("client credentials cannot create an administrator session", async () => {
  mock.method(User, "findOne", () => ({ select: async () => account("client") }));
  const response = await post("/api/auth/login", { email: "admin@example.com", password: "correct-password" });
  assert.equal(response.status, 401);
  assert.equal((await response.json()).token, undefined);
});

test("invalid admin password is rejected", async () => {
  mock.method(User, "findOne", () => ({ select: async () => account("admin") }));
  const response = await post("/api/auth/login", { email: "admin@example.com", password: "wrong-password" });
  assert.equal(response.status, 401);
});

test("valid admin credentials return a token and role", async () => {
  mock.method(User, "findOne", () => ({ select: async () => account("admin") }));
  const response = await post("/api/auth/login", { email: "admin@example.com", password: "correct-password" });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.user.role, "admin");
  assert.equal(typeof result.token, "string");
});

test("anonymous visitors cannot read inquiries", async () => {
  assert.equal((await fetch(`${base}/api/contact`)).status, 401);
});

test("existing client tokens cannot access admin endpoints", async () => {
  lookupAccount("client");
  for (const path of ["/api/contact", "/api/auth/me"]) {
    const response = await fetch(`${base}${path}`, { headers: { Authorization: `Bearer ${signToken("account-id")}` } });
    assert.equal(response.status, 403);
  }
});

test("admin can read guest inquiries", async () => {
  lookupAccount("admin");
  const query = mock.method(Contact, "find", () => ({ sort: () => ({ limit: async () => [{ id: "guest-inquiry", name: "Guest", email: "guest@example.com", message: "A project inquiry", company: "Acme", status: "new", get: () => "2026-09-26T00:00:00Z" }] }) }));
  const response = await fetch(`${base}/api/contact`, { headers: { Authorization: `Bearer ${signToken("account-id")}` } });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.data[0].email, "guest@example.com");
  assert.equal(query.mock.calls[0].arguments.length, 0);
});

const callPayload = () => ({
  name: "Call visitor", email: "visitor@example.com", company: "Acme", phone: "+919876543210",
  preferredDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
  preferredTime: "10:00", timeZone: "Asia/Kolkata", service: "Web development",
  message: "We would like to discuss a website project.",
});

test("guest call requests persist schedule details before returning success", async () => {
  const create = mock.method(Contact, "create", async () => ({ id: "call-id" }));
  const payload = callPayload();
  const response = await post("/api/contact/schedule", payload);
  assert.equal(response.status, 201);
  assert.equal((await response.json()).id, "call-id");
  const saved = create.mock.calls[0].arguments[0];
  assert.equal(saved.callRequest.preferredDate, payload.preferredDate);
  assert.equal(saved.callRequest.timeZone, "Asia/Kolkata");
  assert.equal(saved.callRequest.phone, payload.phone);
  assert.equal(saved.email, payload.email);
});

test("invalid call requests cannot reach persistence", async () => {
  const create = mock.method(Contact, "create", async () => ({ id: "unexpected" }));
  for (const overrides of [
    { preferredDate: "2020-01-01" },
    { preferredDate: "2099-02-30" },
    { preferredTime: "25:00" },
    { timeZone: "Invalid/Zone" },
    { email: "invalid" },
    { service: "invalid" },
    { message: "short" },
  ]) {
    assert.equal((await post("/api/contact/schedule", { ...callPayload(), ...overrides })).status, 400);
  }
  assert.equal(create.mock.callCount(), 0);
});

test("database failures do not report a successful call request", async () => {
  mock.method(Contact, "create", async () => { throw new Error("Test persistence failure"); });
  const response = await post("/api/contact/schedule", callPayload());
  assert.equal(response.status, 500);
  assert.equal((await response.json()).ok, undefined);
});

for (const [path, model, status] of [["contact", Contact, "replied"], ["applications", Application, "shortlisted"]] as const) {
  const id = "507f1f77bcf86cd799439011";
  const patch = (data: object, token?: string, recordId = id) => fetch(`${base}/api/${path}/${recordId}`, {
    method: "PATCH", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(data),
  });
  test(`${path} status updates require administrator access`, async () => {
    const update = mock.method(model, "findByIdAndUpdate", async () => ({ id, status }));
    assert.equal((await patch({ status })).status, 401);
    lookupAccount("client");
    assert.equal((await patch({ status }, signToken("account-id"))).status, 403);
    assert.equal(update.mock.callCount(), 0);
  });
  test(`${path} validates IDs and statuses before persistence`, async () => {
    lookupAccount("admin");
    const update = mock.method(model, "findByIdAndUpdate", async () => ({ id, status }));
    assert.equal((await patch({ status: "invalid" }, signToken("account-id"))).status, 400);
    assert.equal((await patch({ status }, signToken("account-id"), "invalid")).status, 400);
    assert.equal(update.mock.callCount(), 0);
  });
  test(`${path} persists only the requested status and handles missing records`, async () => {
    lookupAccount("admin");
    const update = mock.method(model, "findByIdAndUpdate", async () => ({ id, status }));
    const response = await patch({ status, name: "Unwanted change" }, signToken("account-id"));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { id, status });
    assert.deepEqual(update.mock.calls[0].arguments, [id, { $set: { status } }, { new: true, runValidators: true }]);
    update.mock.mockImplementation(async () => null);
    assert.equal((await patch({ status }, signToken("account-id"))).status, 404);
  });
}
