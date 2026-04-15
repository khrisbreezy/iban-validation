import { IBAN_REGISTRY, type IbanCountryInfo } from "./ibanData.js";

export { IBAN_REGISTRY, type IbanCountryInfo } from "./ibanData.js";

export type IbanValidationError =
  | "emptyInput"
  | "tooShort"
  | "invalidCharacters"
  | "unknownCountry"
  | "countryMismatch"
  | "invalidLength"
  | "checksumFailed";

export type IbanValidationResult =
  | { isValid: true;  cleanedIban: string; error: undefined; errorMessage: undefined; countryInfo: IbanCountryInfo }
  | { isValid: false; cleanedIban: string; error: IbanValidationError; errorMessage: string; countryInfo: IbanCountryInfo | undefined };

export function isValid(iban: string, options?: { countryCca2?: string }): boolean {
  return validate(iban, options).isValid;
}

export function validate(iban: string, options?: { countryCca2?: string }): IbanValidationResult {
  const clean = iban.replace(/\s/g, "").toUpperCase();

  if (clean.length === 0)
    return fail(clean, "emptyInput", "The input string is empty.");

  if (clean.length < 4)
    return fail(clean, "tooShort", "An IBAN must be at least 4 characters long.");

  if (!/^[A-Z0-9]+$/.test(clean))
    return fail(clean, "invalidCharacters", "IBANs may only contain the letters A\u2013Z and the digits 0\u20139.");

  const countryCode = clean.slice(0, 2);
  const info = IBAN_REGISTRY[countryCode];

  if (!info)
    return fail(clean, "unknownCountry", `"${countryCode}" is not a recognised IBAN country code.`);

  const required = options?.countryCca2?.toUpperCase();
  if (required && countryCode !== required)
    return fail(clean, "countryMismatch", `Expected country "${options!.countryCca2}" but the IBAN starts with "${countryCode}".`, info);

  if (clean.length !== info.ibanLength)
    return fail(clean, "invalidLength", `${info.countryName} IBANs must be exactly ${info.ibanLength} characters long (got ${clean.length}).`, info);

  if (mod97(clean) !== 1)
    return fail(clean, "checksumFailed", "The mod-97 checksum failed. The IBAN contains an error.", info);

  return { isValid: true, cleanedIban: clean, error: undefined, errorMessage: undefined, countryInfo: info };
}

export function getSupportedCountries(): string[] {
  return Object.keys(IBAN_REGISTRY).sort();
}

export function getCountryInfo(countryCode: string): IbanCountryInfo | undefined {
  return IBAN_REGISTRY[countryCode.toUpperCase()];
}

export function getSepaCountries(): IbanCountryInfo[] {
  return Object.values(IBAN_REGISTRY).filter(c => c.isSepa).sort((a, b) => a.countryCode.localeCompare(b.countryCode));
}

export function getNonSepaCountries(): IbanCountryInfo[] {
  return Object.values(IBAN_REGISTRY).filter(c => !c.isSepa).sort((a, b) => a.countryCode.localeCompare(b.countryCode));
}

export function getExperimentalCountries(): IbanCountryInfo[] {
  return Object.values(IBAN_REGISTRY).filter(c => c.isExperimental).sort((a, b) => a.countryCode.localeCompare(b.countryCode));
}

export function getExpectedLength(countryCode: string): number | undefined {
  return IBAN_REGISTRY[countryCode.toUpperCase()]?.ibanLength;
}

function mod97(iban: string): number {
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  let numeric = "";
  for (const char of rearranged) {
    const code = char.charCodeAt(0);
    numeric += code >= 65 && code <= 90 ? String(code - 55) : char;
  }
  let remainder = "";
  let i = 0;
  while (i < numeric.length) {
    const part = remainder + numeric.slice(i, i + 7);
    remainder = String(Number(part) % 97);
    i += 7;
  }
  return Number(remainder);
}

function fail(cleanedIban: string, error: IbanValidationError, errorMessage: string, countryInfo?: IbanCountryInfo): IbanValidationResult {
  return { isValid: false, cleanedIban, error, errorMessage, countryInfo };
}
