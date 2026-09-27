export const callTimeZones = ["Asia/Kolkata", "Asia/Dubai", "Asia/Singapore", "Europe/London", "Europe/Berlin", "America/New_York", "America/Chicago", "America/Los_Angeles", "Australia/Sydney", "UTC"];
export const callTimes = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
export const callServices = ["Web development", "Mobile app development", "AI & machine learning", "Cloud & DevOps", "UI/UX design", "Digital marketing", "Something else"];

export function isFutureCall(date: unknown, time: unknown, timeZone: unknown, now = new Date()): boolean {
  if (typeof date !== "string" || typeof time !== "string" || typeof timeZone !== "string") return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !callTimes.includes(time) || !callTimeZones.includes(timeZone)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return false;
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const part = (name: string) => parts.find((value) => value.type === name)?.value;
  const localNow = `${part("year")}-${part("month")}-${part("day")}T${part("hour")}:${part("minute")}`;
  return `${date}T${time}` > localNow;
}
