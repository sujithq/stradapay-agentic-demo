# Payroll exception operator guide

This guide describes the synthetic rules used by the StradaPay demonstration. Do not add real employee or payroll data to examples, logs, issues, or pull requests.

## Net payment rules

| Country | Code | Inclusive net payment range |
| --- | --- | ---: |
| Novara | `NVR` | 1,500-12,000 |

Novara is fictional and exists only for this demonstration.

## Operator actions

| Reason code | Meaning | Operator action |
| --- | --- | --- |
| `MISSING_FIELD` | A field required for validation is absent or invalid. | Return the record to the originating payroll process for correction. |
| `UNSUPPORTED_COUNTRY` | No country policy is configured for the record. | Escalate the country code for policy review. Do not substitute another country's thresholds. |
| `INVALID_RANGE` | Net payment is below or above the configured inclusive range. | Hold the record for payroll review. Verify source values without placing sensitive fields in notes. |

Operator messages may contain only a masked employee reference. Do not copy gross pay, deductions, full employee references, or other employee-sensitive fields into exception notes.
