import { describe, it, expect } from "vitest";
import { validateContact } from "./validate.js";

const ok = { name: "A", email: "a@b.co", subject: "Hi", message: "A long enough message." };

describe("validateContact", () => {
  it("accepts valid input", () => {
    expect(validateContact(ok)).toEqual({});
  });
  it("flags empty fields", () => {
    expect(Object.keys(validateContact({}))).toEqual(["name", "email", "subject", "message"]);
  });
  it("flags bad email", () => {
    expect(validateContact({ ...ok, email: "nope" }).email).toBeTruthy();
  });
  it("flags short message", () => {
    expect(validateContact({ ...ok, message: "short" }).message).toBeTruthy();
  });
});
