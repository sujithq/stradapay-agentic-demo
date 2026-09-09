import { describe, expect, it } from "vitest";
import { loadCountryPolicies, parseCountryPolicies } from "../src/index.js";

describe("country policy configuration", () => {
  it("loads the default synthetic policy file", () => {
    expect(loadCountryPolicies()).toEqual({
      NVR: { minNetPay: 1500, maxNetPay: 12000 }
    });
  });

  it("rejects an empty policy map", () => {
    expect(() => parseCountryPolicies({})).toThrow(
      "Country policy configuration must define at least one country."
    );
  });

  it.each([
    { NVR: { minNetPay: 12000, maxNetPay: 1500 } },
    { NVR: { minNetPay: "1500", maxNetPay: 12000 } },
    { Novara: { minNetPay: 1500, maxNetPay: 12000 } }
  ])("rejects invalid policy configuration", (configuration) => {
    expect(() => parseCountryPolicies(configuration)).toThrow(
      "Country policy configuration is invalid"
    );
  });

  it("reports a missing policy file", () => {
    expect(() => loadCountryPolicies("config/missing-policies.json")).toThrow(
      "Unable to load country policies"
    );
  });

  it("reports malformed JSON", () => {
    expect(() => loadCountryPolicies("tests/fixtures/malformed-country-policies.json")).toThrow(
      "Unable to load country policies"
    );
  });

  it("uses the configured environment path", () => {
    const previousPath = process.env.STRADAPAY_POLICY_FILE;
    process.env.STRADAPAY_POLICY_FILE = "config/missing-policies.json";

    try {
      expect(() => loadCountryPolicies()).toThrow("Unable to load country policies");
    } finally {
      if (previousPath === undefined) {
        delete process.env.STRADAPAY_POLICY_FILE;
      } else {
        process.env.STRADAPAY_POLICY_FILE = previousPath;
      }
    }
  });
});