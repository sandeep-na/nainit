import { test } from "node:test";
import assert from "node:assert/strict";
import { isFutureCall } from "../src/utils/call-request.js";

test("call validation compares the visitor's local date and time", () => {
  const now = new Date("2026-09-26T23:00:00Z");
  assert.equal(isFutureCall("2026-09-26", "17:00", "Asia/Kolkata", now), false);
  assert.equal(isFutureCall("2026-09-27", "09:00", "Asia/Kolkata", now), true);
  assert.equal(isFutureCall("2026-09-26", "17:00", "America/Los_Angeles", now), true);
  assert.equal(isFutureCall("2026-09-26", "16:00", "America/Los_Angeles", now), false);
});

test("call validation handles daylight-saving offsets and invalid calendar dates", () => {
  assert.equal(isFutureCall("2026-07-01", "10:00", "America/New_York", new Date("2026-07-01T14:30:00Z")), false);
  assert.equal(isFutureCall("2026-01-01", "10:00", "America/New_York", new Date("2026-01-01T14:30:00Z")), true);
  assert.equal(isFutureCall("2028-02-29", "10:00", "UTC", new Date("2027-01-01")), true);
  assert.equal(isFutureCall("2027-02-29", "10:00", "UTC", new Date("2027-01-01")), false);
});
