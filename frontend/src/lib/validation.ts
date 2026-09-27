import type { RegisterOptions } from "react-hook-form";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const URL_RE = /^https:\/\/.+\..+/;
export const PHONE_RE = /^[+]?[\d\s\-()]{7,16}$/;

export const rules = {
  name: {
    required: "Please enter your full name.",
    minLength: { value: 2, message: "Name must be 2+ characters." },
    maxLength: { value: 80, message: "Keep it under 80 characters." },
  } satisfies RegisterOptions,
  email: {
    required: "Enter your email address.",
    pattern: { value: EMAIL_RE, message: "Enter a valid email address." },
  } satisfies RegisterOptions,
  password: {
    required: "Enter your password.",
    minLength: { value: 6, message: "Minimum 6 characters." },
  } satisfies RegisterOptions,
  phone: {
    validate: (v: string) =>
      !v || PHONE_RE.test(v) || "Enter a valid phone number.",
  } satisfies RegisterOptions,
  link: {
    required: "Share a portfolio, GitHub or LinkedIn URL.",
    pattern: { value: URL_RE, message: "URL must start with https://" },
  } satisfies RegisterOptions,
  message: {
    required: "Tell us about your project.",
    minLength: { value: 10, message: "Tell us a little more (10+ characters)." },
    maxLength: { value: 2000, message: "Keep it under 2000 characters." },
  } satisfies RegisterOptions,
  coverNote: {
    validate: (v: string) =>
      !v || v.trim().length >= 20 || "Cover note should be 20+ characters.",
  } satisfies RegisterOptions,
  experience: {
    required: "Please select your experience.",
  } satisfies RegisterOptions,
};
