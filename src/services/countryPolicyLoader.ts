import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { CountryPolicy } from "../rules/netPayRangeRule.js";

export type CountryPolicies = Readonly<Record<string, CountryPolicy>>;

function isCountryPolicy(value: unknown): value is CountryPolicy {
  if (!value || typeof value !== "object") {
    return false;
  }

  const policy = value as Record<string, unknown>;
  return (
    typeof policy.minNetPay === "number" &&
    Number.isFinite(policy.minNetPay) &&
    typeof policy.maxNetPay === "number" &&
    Number.isFinite(policy.maxNetPay) &&
    policy.minNetPay <= policy.maxNetPay
  );
}

export function parseCountryPolicies(value: unknown): CountryPolicies {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Country policy configuration must be an object.");
  }

  const entries = Object.entries(value);
  if (entries.length === 0) {
    throw new Error("Country policy configuration must define at least one country.");
  }

  for (const [countryCode, policy] of entries) {
    if (!/^[A-Z]{3}$/.test(countryCode) || !isCountryPolicy(policy)) {
      throw new Error(`Country policy configuration is invalid for ${countryCode}.`);
    }

    Object.freeze(policy);
  }

  return Object.freeze(value as Record<string, CountryPolicy>);
}

export function loadCountryPolicies(filePath?: string): CountryPolicies {
  const configuredPath = filePath ?? process.env.STRADAPAY_POLICY_FILE ?? "config/country-policies.json";
  const resolvedPath = resolve(configuredPath);

  try {
    return parseCountryPolicies(JSON.parse(readFileSync(resolvedPath, "utf8")) as unknown);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown configuration error.";
    throw new Error(`Unable to load country policies from ${resolvedPath}: ${detail}`, {
      cause: error
    });
  }
}