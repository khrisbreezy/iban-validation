import { describe, expect, it } from "vitest";
import {
  IBAN_REGISTRY, getCountryInfo, getExperimentalCountries, getExpectedLength,
  getNonSepaCountries, getSepaCountries, getSupportedCountries, isValid, validate,
} from "../src/index.js";

describe("isValid returns true for valid IBANs", () => {
  const cases: [string, string][] = [
    ["Germany",        "DE89370400440532013000"],
    ["UK",             "GB29NWBK60161331926819"],
    ["France",         "FR7630006000011234567890189"],
    ["Spain",          "ES7921000813610123456789"],
    ["Italy",          "IT60X0542811101000000123456"],
    ["Netherlands",    "NL02ABNA0123456789"],
    ["Belgium",        "BE71096123456769"],
    ["Switzerland",    "CH5604835012345678009"],
    ["Austria",        "AT483200000012345864"],
    ["Portugal",       "PT50002700000001234567833"],
    ["Denmark",        "DK9520000123456789"],
    ["Finland",        "FI1410093000123458"],
    ["Sweden",         "SE7280000810340009783242"],
    ["Norway",         "NO8330001234567"],
    ["Poland",         "PL10105000997603123456789123"],
    ["Czech Republic", "CZ5508000000001234567899"],
    ["Slovakia",       "SK8975000000000012345671"],
    ["Hungary",        "HU93116000060000000012345676"],
    ["Romania",        "RO66BACX0000001234567890"],
    ["Bulgaria",       "BG19STSA93000123456789"],
    ["Croatia",        "HR1723600001101234565"],
    ["Slovenia",       "SI56192001234567892"],
    ["Estonia",        "EE471000001020145685"],
    ["Lithuania",      "LT601010012345678901"],
    ["Latvia",         "LV97HABA0012345678910"],
    ["Luxembourg",     "LU120010001234567891"],
    ["Malta",          "MT31MALT01100000000000000000123"],
    ["Cyprus",         "CY21002001950000357001234567"],
    ["Greece",         "GR9608100010000001234567890"],
    ["Ireland",        "IE64IRCE92050112345678"],
    ["Iceland",        "IS750001121234563108962099"],
    ["Saudi Arabia",   "SA4420000001234567891234"],
    ["UAE",            "AE460090000000123456789"],
    ["Turkey",         "TR320010009999901234567890"],
    ["Israel",         "IL170108000000012612345"],
    ["Kuwait",         "KW81CBKU0000000000001234560101"],
    ["Bahrain",        "BH02CITI00001077181611"],
    ["Qatar",          "QA54QNBA000000000000693123456"],
    ["Georgia",        "GE60NB0000000123456789"],
    ["Kazakhstan",     "KZ244350000012344567"],
    ["Brazil",         "BR1500000000000010932840814P2"],
    ["Tunisia",        "TN5904018104004942712345"],
    ["Pakistan",       "PK36SCBL0000001123456702"],
  ];
  it.each(cases)("%s", (_name, iban) => expect(isValid(iban)).toBe(true));
});

describe("isValid normalises input", () => {
  it("strips spaces",     () => expect(isValid("DE89 3704 0044 0532 0130 00")).toBe(true));
  it("accepts lowercase", () => expect(isValid("de89370400440532013000")).toBe(true));
});

describe("isValid returns false for invalid IBANs", () => {
  it("empty string",           () => expect(isValid("")).toBe(false));
  it("too short",              () => expect(isValid("DE8")).toBe(false));
  it("unknown country",        () => expect(isValid("XX89370400440532013000")).toBe(false));
  it("wrong length",           () => expect(isValid("DE893704004405320130")).toBe(false));
  it("special characters",     () => expect(isValid("DE89-3704-0044-0532-0130-00")).toBe(false));
  it("bad checksum",           () => expect(isValid("DE99370400440532013000")).toBe(false));
});

describe("isValid with countryCca2", () => {
  it("matching country",       () => expect(isValid("DE89370400440532013000", { countryCca2: "DE" })).toBe(true));
  it("case-insensitive cca2",  () => expect(isValid("DE89370400440532013000", { countryCca2: "de" })).toBe(true));
  it("mismatched country",     () => expect(isValid("DE89370400440532013000", { countryCca2: "FR" })).toBe(false));
});

describe("validate returns typed errors", () => {
  it("empty → emptyInput",          () => expect(validate("").error).toBe("emptyInput"));
  it("short → tooShort",            () => expect(validate("DE8").error).toBe("tooShort"));
  it("symbols → invalidCharacters", () => expect(validate("DE89-3704").error).toBe("invalidCharacters"));
  it("XX → unknownCountry",         () => { const r = validate("XX89370400440532013000"); expect(r.error).toBe("unknownCountry"); expect(r.countryInfo).toBeUndefined(); });
  it("wrong cca2 → countryMismatch",() => { const r = validate("DE89370400440532013000", { countryCca2: "GB" }); expect(r.error).toBe("countryMismatch"); });
  it("short → invalidLength",       () => expect(validate("DE89370400440532").error).toBe("invalidLength"));
  it("flip → checksumFailed",       () => expect(validate("DE99370400440532013000").error).toBe("checksumFailed"));
  it("valid → no error", () => {
    const r = validate("DE89370400440532013000");
    expect(r.isValid).toBe(true);
    if (r.isValid) {
      expect(r.countryInfo.countryName).toBe("Germany");
      expect(r.error).toBeUndefined();
    }
  });
});

describe("getSupportedCountries", () => {
  const codes = getSupportedCountries();
  it("100+ codes",                 () => expect(codes.length).toBeGreaterThanOrEqual(100));
  it("sorted",                     () => expect(codes).toEqual([...codes].sort()));
  it("contains eurozone",          () => { for (const c of ["DE","FR","ES","IT","NL","BE"]) expect(codes).toContain(c); });
  it("contains Middle East",       () => { for (const c of ["AE","SA","BH","KW","QA"]) expect(codes).toContain(c); });
  it("contains African exp.",      () => { for (const c of ["CI","SN","ML","BJ","TG"]) expect(codes).toContain(c); });
});

describe("getCountryInfo", () => {
  it("Germany metadata correct", () => {
    const i = getCountryInfo("DE")!;
    expect(i.countryName).toBe("Germany");
    expect(i.ibanLength).toBe(22);
    expect(i.isSepa).toBe(true);
    expect(i.isExperimental).toBe(false);
  });
  it("CI is experimental",       () => expect(getCountryInfo("CI")?.isExperimental).toBe(true));
  it("case-insensitive",         () => expect(getCountryInfo("gb")?.countryCode).toBe("GB"));
  it("undefined for US",         () => expect(getCountryInfo("US")).toBeUndefined());
});

describe("getExpectedLength", () => {
  it("Norway shortest (15)",     () => expect(getExpectedLength("NO")).toBe(15));
  it("Russia longest (33)",      () => expect(getExpectedLength("RU")).toBe(33));
  it("undefined for US",         () => expect(getExpectedLength("US")).toBeUndefined());
});

describe("country group helpers", () => {
  it("SEPA has all EU members", () => {
    const codes = getSepaCountries().map(c => c.countryCode);
    for (const c of ["DE","FR","ES","IT","NL","BE","AT","PT","FI","IE","GR","LU","SK","SI","EE","LT","LV","HR","BG","CZ","DK","HU","PL","RO","SE","CY","MT"]) {
      expect(codes).toContain(c);
    }
  });
  it("non-SEPA excludes Germany",  () => expect(getNonSepaCountries().map(c => c.countryCode)).not.toContain("DE"));
  it("experimental has WAEMU",     () => { for (const c of ["BJ","BF","CI","ML","NE","SN","TG"]) expect(getExperimentalCountries().map(x => x.countryCode)).toContain(c); });
  it("no SEPA/experimental overlap", () => {
    const sepa = new Set(getSepaCountries().map(c => c.countryCode));
    for (const c of getExperimentalCountries()) expect(sepa.has(c.countryCode)).toBe(false);
  });
});

describe("edge cases", () => {
  it("all-spaces → emptyInput", () => expect(validate("     ").error).toBe("emptyInput"));
  it("every registry example passes", () => {
    const failures: string[] = [];
    for (const info of Object.values(IBAN_REGISTRY)) {
      if (!isValid(info.example)) failures.push(`${info.countryCode}: ${info.example}`);
    }
    expect(failures).toEqual([]);
  });
});
