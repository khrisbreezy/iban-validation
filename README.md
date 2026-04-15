# iban-validation

[![npm version](https://img.shields.io/npm/v/iban-validation.svg)](https://www.npmjs.com/package/iban-validation)
[![npm downloads](https://img.shields.io/npm/dm/iban-validation.svg)](https://www.npmjs.com/package/iban-validation)
[![CI](https://github.com/khrisbreezy/iban-validation/actions/workflows/node.yml/badge.svg)](https://github.com/khrisbreezy/iban-validation/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg)](https://www.typescriptlang.org/)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)]()

A comprehensive, **zero-dependency** IBAN validator for **TypeScript** and **JavaScript**.

Built on the ISO 7064 MOD-97-10 algorithm and the official SWIFT IBAN registry, covering every country in the world that uses IBAN for banking transactions — from Germany and the UK to Saudi Arabia, Ivory Coast, and Brazil.

```ts
import { isValid } from "iban-validate";

isValid("DE89 3704 0044 0532 0130 00"); // true  ✓
isValid("GB29 NWBK 6016 1331 9268 19"); // true  ✓
isValid("DE99 3704 0044 0532 0130 00"); // false ✗ bad checksum
```

---

## Features

- ✅ **116 country codes** — 94 official ISO 13616 countries + 22 experimental (full list below)
- ✅ **Typed error union** — know exactly why an IBAN failed, not just that it did
- ✅ **Discriminated union result** — TypeScript narrows the type automatically on `isValid`
- ✅ **Rich country metadata** — name, IBAN length, SEPA membership, and a sample IBAN per country
- ✅ **Input-tolerant** — strips spaces and handles lowercase automatically
- ✅ **Dual CJS + ESM build** — works in Node.js, Deno, Bun, React, Next.js, and browsers
- ✅ **Tree-shakeable** — import only what you need
- ✅ **Zero dependencies** — nothing in `dependencies`, only dev tooling
- ✅ **Every registry example tested** — the test suite validates the sample IBAN for all 116 countries

---

## Table of contents

- [Installation](#installation)
- [Quick start](#quick-start)
- [Framework usage](#framework-usage)
  - [React](#react)
  - [Next.js](#nextjs)
  - [Node.js / Express](#nodejs--express)
  - [Vue](#vue)
- [API reference](#api-reference)
  - [isValid](#isvalid)
  - [validate](#validate)
  - [IbanValidationResult](#ibanvalidationresult)
  - [IbanValidationError](#ibanvalidationerror)
  - [getSupportedCountries](#getsupportedcountries)
  - [getCountryInfo](#getcountryinfo)
  - [IbanCountryInfo](#ibancountryinfo)
  - [Other helpers](#other-helpers)
- [Error handling patterns](#error-handling-patterns)
- [How IBAN validate works](#how-iban-validate-works)
- [Supported countries](#supported-countries)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

```sh
# npm
npm install iban-validate

# yarn
yarn add iban-validate

# pnpm
pnpm add iban-validate

# bun
bun add iban-validate
```

---

## Quick start

```ts
import {
  isValid,
  validate,
  getCountryInfo,
  getSupportedCountries,
  getSepaCountries,
  getExperimentalCountries,
  getExpectedLength,
} from "iban-validate";

// ── Simple boolean check ───────────────────────────────────────────────────
isValid("DE89 3704 0044 0532 0130 00"); // true  (spaces stripped automatically)
isValid("gb29 nwbk 6016 1331 9268 19"); // true  (lowercase accepted)
isValid("BADINPUT"); // false

// ── Country-constrained check ──────────────────────────────────────────────
isValid("DE89370400440532013000", { countryCca2: "DE" }); // true
isValid("DE89370400440532013000", { countryCca2: "FR" }); // false

// ── Full validation result with typed error ────────────────────────────────
const result = validate("DE99370400440532013000");
if (!result.isValid) {
  console.log(result.error); // 'checksumFailed'
  console.log(result.errorMessage); // 'The mod-97 checksum failed...'
  console.log(result.countryInfo?.countryName); // 'Germany'
}

// ── TypeScript discriminated union — no type assertions needed ─────────────
const r = validate("GB29NWBK60161331926819");
if (r.isValid) {
  r.countryInfo.countryName; // 'United Kingdom' — TypeScript knows this is defined
  r.error; // undefined — TypeScript knows this too
}

// ── Country metadata ───────────────────────────────────────────────────────
const info = getCountryInfo("SA")!;
info.countryName; // 'Saudi Arabia'
info.ibanLength; // 24
info.isSepa; // false
info.isExperimental; // false
info.example; // 'SA4420000001234567891234'

// ── Enumerate countries ────────────────────────────────────────────────────
const all = getSupportedCountries(); // ['AD', 'AE', ...] — 116 codes
const sepa = getSepaCountries(); // SEPA zone only
const exp = getExperimentalCountries(); // Africa + Iran experimental
const len = getExpectedLength("NO"); // 15 (shortest IBAN in the world)
```

---

## Framework usage

### React

#### Simple input validation

```tsx
import { validate } from "iban-validate";
import { useState } from "react";

function IbanInput() {
  const [iban, setIban] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIban(value);

    // Only validate once the user has typed enough characters
    if (value.replace(/\s/g, "").length >= 15) {
      const result = validate(value);
      setError(result.isValid ? null : (result.errorMessage ?? null));
    } else {
      setError(null);
    }
  };

  return (
    <div>
      <input
        value={iban}
        onChange={handleChange}
        placeholder="DE89 3704 0044 0532 0130 00"
        style={{ borderColor: error ? "red" : undefined }}
      />
      {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
      {!error && iban && (
        <p style={{ color: "green", fontSize: 13 }}>✓ Valid IBAN</p>
      )}
    </div>
  );
}
```

#### With React Hook Form

```tsx
import { useForm } from "react-hook-form";
import { isValid } from "iban-validate";

type FormValues = { iban: string };

function PaymentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Validated IBAN:", data.iban.replace(/\s/g, "").toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("iban", {
          required: "Please enter an IBAN.",
          validate: (value) => isValid(value) || "Please enter a valid IBAN.",
        })}
        placeholder="GB29 NWBK 6016 1331 9268 19"
      />
      {errors.iban && <p style={{ color: "red" }}>{errors.iban.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### With Zod

```ts
import { z } from "zod";
import { isValid } from "iban-validate";

const paymentSchema = z.object({
  recipientName: z.string().min(2),
  iban: z.string().refine(isValid, {
    message: "Please enter a valid IBAN.",
  }),
  amount: z.number().positive(),
  currency: z.string().length(3),
});

type Payment = z.infer<typeof paymentSchema>;
```

#### Country-locked field (when you know the user's country)

```tsx
import { validate, getCountryInfo } from "iban-validate";

function CountryLockedIbanField({ countryCode }: { countryCode: string }) {
  const info = getCountryInfo(countryCode);
  const [error, setError] = useState<string | null>(null);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const result = validate(e.target.value, { countryCca2: countryCode });
    setError(result.isValid ? null : (result.errorMessage ?? null));
  };

  return (
    <div>
      <label>
        Bank account (IBAN)
        {info && (
          <span style={{ color: "#888", fontSize: 12 }}>
            {" "}
            — {info.countryName} · {info.ibanLength} characters
          </span>
        )}
      </label>
      <input
        onBlur={handleBlur}
        placeholder={info?.example}
        maxLength={info?.ibanLength ? info.ibanLength + 6 : undefined}
      />
      {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
    </div>
  );
}
```

#### Displaying country info after successful validation

```tsx
import { validate } from "iban-validate";

function IbanResult({ iban }: { iban: string }) {
  const result = validate(iban);

  if (!result.isValid) {
    return <p style={{ color: "red" }}>✗ {result.errorMessage}</p>;
  }

  const { countryInfo, cleanedIban } = result;

  return (
    <div style={{ padding: 12, border: "1px solid green", borderRadius: 8 }}>
      <p>✓ Valid IBAN</p>
      <p>
        <strong>Country:</strong> {countryInfo.countryName}
      </p>
      <p>
        <strong>SEPA zone:</strong> {countryInfo.isSepa ? "Yes" : "No"}
      </p>
      <p>
        <strong>Cleaned:</strong> <code>{cleanedIban}</code>
      </p>
    </div>
  );
}
```

---

### Next.js

#### API route validation (App Router)

```ts
// app/api/payments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { validate } from "iban-validate";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { iban, countryCode } = body;

  const result = validate(iban, { countryCca2: countryCode });

  if (!result.isValid) {
    return NextResponse.json(
      { error: result.error, message: result.errorMessage },
      { status: 422 },
    );
  }

  return NextResponse.json({
    valid: true,
    iban: result.cleanedIban,
    country: result.countryInfo.countryName,
    isSepa: result.countryInfo.isSepa,
  });
}
```

#### Server action (Next.js 14+)

```ts
// app/actions/validateIban.ts
"use server";

import { validate } from "iban-validate";

export async function validateIbanAction(formData: FormData) {
  const iban = formData.get("iban") as string;
  const result = validate(iban);

  if (!result.isValid) {
    return { success: false, error: result.errorMessage };
  }

  return {
    success: true,
    cleanedIban: result.cleanedIban,
    countryName: result.countryInfo.countryName,
  };
}
```

---

### Node.js / Express

```ts
import express from "express";
import { validate } from "iban-validate";

const app = express();
app.use(express.json());

app.post("/api/validate-iban", (req, res) => {
  const { iban, country } = req.body;

  if (!iban) {
    return res.status(400).json({ error: "iban is required" });
  }

  const result = validate(iban, { countryCca2: country });

  if (!result.isValid) {
    return res.status(422).json({
      valid: false,
      error: result.error,
      message: result.errorMessage,
    });
  }

  return res.json({
    valid: true,
    iban: result.cleanedIban,
    country: result.countryInfo.countryName,
    sepa: result.countryInfo.isSepa,
  });
});
```

---

### Vue

```vue
<script setup lang="ts">
import { ref, computed } from "vue";
import { validate } from "iban-validate";

const iban = ref("");
const result = computed(() =>
  iban.value.replace(/\s/g, "").length >= 15 ? validate(iban.value) : null,
);
</script>

<template>
  <div>
    <input v-model="iban" placeholder="DE89 3704 0044 0532 0130 00" />
    <p v-if="result?.isValid" style="color: green">
      ✓ Valid · {{ result.countryInfo.countryName }}
    </p>
    <p v-else-if="result" style="color: red">✗ {{ result.errorMessage }}</p>
  </div>
</template>
```

---

## API reference

### `isValid`

```ts
function isValid(iban: string, options?: { countryCca2?: string }): boolean;
```

Returns `true` if `iban` passes all validation checks.

- Spaces are stripped and the string is uppercased automatically.
- If `countryCca2` is provided the IBAN country code must match it (case-insensitive).
- For detailed failure information use [`validate`](#validate) instead.

```ts
isValid("DE89 3704 0044 0532 0130 00"); // true
isValid("de89370400440532013000"); // true
isValid("DE89370400440532013000", { countryCca2: "DE" }); // true
isValid("DE89370400440532013000", { countryCca2: "fr" }); // false
isValid(""); // false
```

---

### `validate`

```ts
function validate(
  iban: string,
  options?: { countryCca2?: string },
): IbanValidationResult;
```

Returns an [`IbanValidationResult`](#ibanvalidationresult) with full detail.

Validation runs in this exact order, stopping at the first failure:

| Step | Check                                              |
| ---- | -------------------------------------------------- |
| 1    | Strip spaces, uppercase                            |
| 2    | Not empty                                          |
| 3    | At least 4 characters                              |
| 4    | Only A–Z and 0–9 characters                        |
| 5    | Country code exists in the registry                |
| 6    | Country code matches `countryCca2` (if provided)   |
| 7    | Length matches the expected length for the country |
| 8    | mod-97 checksum equals 1                           |

---

### `IbanValidationResult`

A **discriminated union** — TypeScript narrows the type automatically in `if` blocks:

```ts
type IbanValidationResult =
  | {
      isValid: true;
      cleanedIban: string;
      error: undefined;
      errorMessage: undefined;
      countryInfo: IbanCountryInfo; // always defined when valid
    }
  | {
      isValid: false;
      cleanedIban: string;
      error: IbanValidationError; // always defined when invalid
      errorMessage: string;
      countryInfo: IbanCountryInfo | undefined; // defined if country was recognised
    };
```

```ts
const r = validate("GB29NWBK60161331926819");

if (r.isValid) {
  // TypeScript knows these are defined — no optional chaining needed
  r.countryInfo.countryName; // 'United Kingdom'
  r.countryInfo.isSepa; // true
  r.cleanedIban; // 'GB29NWBK60161331926819'
} else {
  r.error; // IbanValidationError
  r.errorMessage; // human-readable string
}
```

---

### `IbanValidationError`

```ts
type IbanValidationError =
  | "emptyInput" // input was empty or whitespace only
  | "tooShort" // fewer than 4 characters after stripping spaces
  | "invalidCharacters" // contains characters outside A–Z, 0–9
  | "unknownCountry" // first two characters not a recognised IBAN country code
  | "countryMismatch" // country code doesn't match countryCca2 constraint
  | "invalidLength" // length doesn't match the expected length for the country
  | "checksumFailed"; // mod-97 checksum ≠ 1 — the IBAN number itself is wrong
```

```ts
const result = validate(userInput);

if (!result.isValid) {
  switch (result.error) {
    case "unknownCountry":
      showCountryPicker();
      break;
    case "invalidLength":
      showHint(`Should be ${result.countryInfo?.ibanLength} characters`);
      break;
    case "checksumFailed":
      showHint("Double-check your IBAN — there may be a typo");
      break;
    default:
      showError(result.errorMessage);
  }
}
```

---

### `getSupportedCountries`

```ts
function getSupportedCountries(): string[];
```

Returns a sorted array of all supported two-letter country codes (116 total).

```ts
const codes = getSupportedCountries();
// ['AD', 'AE', 'AL', 'AM', 'AO', ..., 'YE']
codes.length; // 116
```

---

### `getCountryInfo`

```ts
function getCountryInfo(countryCode: string): IbanCountryInfo | undefined;
```

Returns [`IbanCountryInfo`](#ibancountryinfo) for the given code, or `undefined` if unsupported. Case-insensitive.

```ts
getCountryInfo("DE"); // { countryCode: 'DE', countryName: 'Germany', ibanLength: 22, ... }
getCountryInfo("de"); // same result
getCountryInfo("US"); // undefined — USA does not use IBAN
```

---

### `IbanCountryInfo`

```ts
interface IbanCountryInfo {
  readonly countryCode: string; // 'DE'
  readonly countryName: string; // 'Germany'
  readonly ibanLength: number; // 22
  readonly isSepa: boolean; // true
  readonly isExperimental: boolean; // false
  readonly example: string; // 'DE75512108001245126199'
}
```

---

### Other helpers

```ts
// All SEPA countries sorted by code
function getSepaCountries(): IbanCountryInfo[];

// All non-SEPA countries sorted by code
function getNonSepaCountries(): IbanCountryInfo[];

// Experimental / partial-IBAN countries (not yet in ISO 13616)
function getExperimentalCountries(): IbanCountryInfo[];

// Expected IBAN length for a country code, or undefined if unsupported
function getExpectedLength(countryCode: string): number | undefined;
```

```ts
getExpectedLength("NO"); // 15 (shortest IBAN)
getExpectedLength("RU"); // 33 (longest IBAN)
getExpectedLength("US"); // undefined

getSepaCountries().length; // 40
getExperimentalCountries().length; // 22
```

---

## Error handling patterns

### Simple service function

```ts
import { validate } from "iban-validate";

// Returns null on success, error message on failure
function validateBeneficiaryIban(iban: string, country: string): string | null {
  const result = validate(iban, { countryCca2: country });
  return result.isValid ? null : result.errorMessage;
}
```

### Throwing on invalid input

```ts
import { validate } from "iban-validate";

function processPayment(iban: string) {
  const result = validate(iban);
  if (!result.isValid) {
    throw new Error(`Invalid IBAN: ${result.errorMessage}`);
  }
  // use result.cleanedIban safely from here
  const cleanIban = result.cleanedIban;
}
```

### Filtering a list of IBANs

```ts
import { isValid } from "iban-validate";

const ibans = [
  "DE89 3704 0044 0532 0130 00",
  "INVALID",
  "GB29 NWBK 6016 1331 9268 19",
  "FR76 3000 6000 0112 3456 7890 189",
];

const valid = ibans.filter(isValid);
const invalid = ibans.filter((i) => !isValid(i));
```

### With async/await in a payment service

```ts
import { validate } from "iban-validate";

async function submitPayment(payload: {
  iban: string;
  amount: number;
  currency: string;
}) {
  const result = validate(payload.iban);

  if (!result.isValid) {
    return {
      success: false,
      error: result.error,
      message: result.errorMessage,
    };
  }

  const response = await fetch("/api/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      iban: result.cleanedIban, // always use the cleaned version
      country: result.countryInfo.countryCode,
      isSepa: result.countryInfo.isSepa,
      amount: payload.amount,
      currency: payload.currency,
    }),
  });

  return response.json();
}
```

---

## CommonJS usage

```js
const { isValid, validate, getCountryInfo } = require("iban-validate");

console.log(isValid("DE89 3704 0044 0532 0130 00")); // true
```

---

## How IBAN validation works

An IBAN (International Bank Account Number) is validated using the **ISO 7064 MOD-97-10** algorithm. Here are the five steps:

**1. Clean the input**
Strip all spaces and convert to uppercase. `'de89 3704'` → `'DE893704'`.

**2. Look up the country**
The first two characters are the ISO 3166-1 alpha-2 country code. Check it against the registry and verify the total length matches the country's fixed IBAN length.

**3. Rearrange**
Move the first four characters (country code + check digits) to the end.
`'DE89370400440532013000'` → `'370400440532013000DE89'`

**4. Convert letters to numbers**
Replace every letter with its numeric equivalent: `A=10`, `B=11` … `Z=35`.
`'...DE89'` → `'...131489'`

**5. Compute mod 97**
Interpret the resulting digit string as a large integer and compute the remainder when divided by 97. If the remainder equals **1**, the IBAN is valid.

The digit string can be up to 34+ characters — far too large for JavaScript's `Number` (`MAX_SAFE_INTEGER` ≈ 9×10¹⁵, but the IBAN number can reach ~10³⁴). This package processes it in 7-digit chunks, carrying the remainder forward, keeping every intermediate value safely within the safe integer range without needing `BigInt`.

---

## Supported countries

### Official ISO 13616 countries (94)

Source: [iban.com/structure](https://www.iban.com/structure), updated 30 March 2026.

| Code | Country                | Length | SEPA |
| ---- | ---------------------- | :----: | :--: |
| AD   | Andorra                |   24   |  ✓   |
| AE   | United Arab Emirates   |   23   |      |
| AL   | Albania                |   28   |      |
| AM   | Armenia                |   28   |      |
| AT   | Austria                |   20   |  ✓   |
| AZ   | Azerbaijan             |   28   |      |
| BA   | Bosnia and Herzegovina |   20   |      |
| BE   | Belgium                |   16   |  ✓   |
| BH   | Bahrain                |   22   |      |
| BI   | Burundi                |   27   |      |
| BG   | Bulgaria               |   22   |  ✓   |
| BR   | Brazil                 |   29   |      |
| BY   | Belarus                |   28   |      |
| CH   | Switzerland            |   21   |  ✓   |
| CR   | Costa Rica             |   22   |      |
| CY   | Cyprus                 |   28   |  ✓   |
| CZ   | Czech Republic         |   24   |  ✓   |
| DE   | Germany                |   22   |  ✓   |
| DJ   | Djibouti               |   27   |      |
| DK   | Denmark                |   18   |  ✓   |
| DO   | Dominican Republic     |   28   |      |
| EE   | Estonia                |   20   |  ✓   |
| EG   | Egypt                  |   29   |      |
| ES   | Spain                  |   24   |  ✓   |
| FI   | Finland                |   18   |  ✓   |
| FK   | Falkland Islands       |   18   |      |
| FO   | Faroe Islands          |   18   |      |
| FR   | France                 |   27   |  ✓   |
| GB   | United Kingdom         |   22   |  ✓   |
| GE   | Georgia                |   22   |      |
| GI   | Gibraltar              |   23   |  ✓   |
| GL   | Greenland              |   18   |      |
| GR   | Greece                 |   27   |  ✓   |
| GT   | Guatemala              |   28   |      |
| HN   | Honduras               |   28   |      |
| HR   | Croatia                |   21   |  ✓   |
| HU   | Hungary                |   28   |  ✓   |
| IE   | Ireland                |   22   |  ✓   |
| IL   | Israel                 |   23   |      |
| IQ   | Iraq                   |   23   |      |
| IS   | Iceland                |   26   |  ✓   |
| IT   | Italy                  |   27   |  ✓   |
| JO   | Jordan                 |   30   |      |
| KG   | Kyrgyzstan             |   26   |      |
| KW   | Kuwait                 |   30   |      |
| KZ   | Kazakhstan             |   20   |      |
| LB   | Lebanon                |   28   |      |
| LC   | Saint Lucia            |   32   |      |
| LI   | Liechtenstein          |   21   |  ✓   |
| LT   | Lithuania              |   20   |  ✓   |
| LU   | Luxembourg             |   20   |  ✓   |
| LV   | Latvia                 |   21   |  ✓   |
| LY   | Libya                  |   25   |      |
| MC   | Monaco                 |   27   |  ✓   |
| MD   | Moldova                |   24   |  ✓   |
| ME   | Montenegro             |   22   |  ✓   |
| MK   | North Macedonia        |   19   |  ✓   |
| MN   | Mongolia               |   20   |      |
| MR   | Mauritania             |   27   |      |
| MT   | Malta                  |   31   |  ✓   |
| MU   | Mauritius              |   30   |      |
| NI   | Nicaragua              |   28   |      |
| NL   | Netherlands            |   18   |  ✓   |
| NO   | Norway                 |   15   |  ✓   |
| OM   | Oman                   |   23   |      |
| PK   | Pakistan               |   24   |      |
| PL   | Poland                 |   28   |  ✓   |
| PS   | Palestine              |   29   |      |
| PT   | Portugal               |   25   |  ✓   |
| QA   | Qatar                  |   29   |      |
| RO   | Romania                |   24   |  ✓   |
| RS   | Serbia                 |   22   |  ✓   |
| RU   | Russia                 |   33   |      |
| SA   | Saudi Arabia           |   24   |      |
| SC   | Seychelles             |   31   |      |
| SD   | Sudan                  |   18   |      |
| SE   | Sweden                 |   24   |  ✓   |
| SI   | Slovenia               |   19   |  ✓   |
| SK   | Slovakia               |   24   |  ✓   |
| SM   | San Marino             |   27   |  ✓   |
| SO   | Somalia                |   23   |      |
| ST   | Sao Tome and Principe  |   25   |      |
| SV   | El Salvador            |   28   |      |
| TJ   | Tajikistan             |   22   |      |
| TL   | Timor-Leste            |   23   |      |
| TM   | Turkmenistan           |   26   |      |
| TN   | Tunisia                |   24   |      |
| TR   | Turkey                 |   26   |      |
| UA   | Ukraine                |   29   |      |
| UZ   | Uzbekistan             |   28   |      |
| VA   | Vatican City           |   22   |  ✓   |
| VG   | British Virgin Islands |   24   |      |
| XK   | Kosovo                 |   20   |      |
| YE   | Yemen                  |   30   |      |

### Experimental / partial IBAN countries (22)

These countries have adopted an IBAN-like format locally but are **not yet registered** in the official ISO 13616 SWIFT registry. Their formats may change. In code these entries have `isExperimental: true`.

> **Note:** Use experimental IBANs with care in production. Consider showing a disclaimer to your users for these countries.

| Code | Country                  | Length |
| ---- | ------------------------ | :----: |
| AO   | Angola                   |   25   |
| BF   | Burkina Faso             |   28   |
| BJ   | Benin                    |   28   |
| CF   | Central African Republic |   27   |
| CG   | Congo                    |   27   |
| CI   | Ivory Coast              |   28   |
| CM   | Cameroon                 |   27   |
| CV   | Cape Verde               |   25   |
| DZ   | Algeria                  |   24   |
| GA   | Gabon                    |   27   |
| GQ   | Equatorial Guinea        |   27   |
| GW   | Guinea-Bissau            |   25   |
| IR   | Iran                     |   26   |
| KM   | Comoros                  |   27   |
| MA   | Morocco                  |   28   |
| MG   | Madagascar               |   27   |
| ML   | Mali                     |   28   |
| MZ   | Mozambique               |   25   |
| NE   | Niger                    |   28   |
| SN   | Senegal                  |   28   |
| TD   | Chad                     |   27   |
| TG   | Togo                     |   28   |

---

## Contributing

Contributions are welcome — especially updates to the country registry.

**To add or update a country:**

1. Edit [`src/ibanData.ts`](src/ibanData.ts) with the new or corrected entry.
2. Add a corresponding test case in [`test/index.test.ts`](test/index.test.ts).
3. Run `npm test` to confirm all tests pass.
4. Open a pull request.

**Registry source:** [iban.com/structure](https://www.iban.com/structure) (updated 30 March 2026).

**Reporting bugs:** Open an issue at [github.com/khrisbreezy/iban-validation/issues](https://github.com/khrisbreezy/iban-validation/issues) and include the IBAN (or a structurally equivalent fake one), the country, and the result you expected vs what you got.

---

## Related

- [`iban_validator`](https://pub.dev/packages/iban_validator) — the Dart / Flutter version of this package, published on pub.dev.

---

## License

[MIT](LICENSE) © 2026 Oyinlola Abolarin
