"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  IBAN_REGISTRY: () => IBAN_REGISTRY,
  getCountryInfo: () => getCountryInfo,
  getExpectedLength: () => getExpectedLength,
  getExperimentalCountries: () => getExperimentalCountries,
  getNonSepaCountries: () => getNonSepaCountries,
  getSepaCountries: () => getSepaCountries,
  getSupportedCountries: () => getSupportedCountries,
  isValid: () => isValid,
  validate: () => validate
});
module.exports = __toCommonJS(index_exports);

// src/ibanData.ts
var registry = {
  // ── Europe (SEPA) ──────────────────────────────────────────────────────────
  AD: { countryName: "Andorra", ibanLength: 24, isSepa: true, isExperimental: false, example: "AD1400080001001234567890" },
  AT: { countryName: "Austria", ibanLength: 20, isSepa: true, isExperimental: false, example: "AT483200000012345864" },
  BE: { countryName: "Belgium", ibanLength: 16, isSepa: true, isExperimental: false, example: "BE71096123456769" },
  BG: { countryName: "Bulgaria", ibanLength: 22, isSepa: true, isExperimental: false, example: "BG19STSA93000123456789" },
  CH: { countryName: "Switzerland", ibanLength: 21, isSepa: true, isExperimental: false, example: "CH5604835012345678009" },
  CY: { countryName: "Cyprus", ibanLength: 28, isSepa: true, isExperimental: false, example: "CY21002001950000357001234567" },
  CZ: { countryName: "Czech Republic", ibanLength: 24, isSepa: true, isExperimental: false, example: "CZ5508000000001234567899" },
  DE: { countryName: "Germany", ibanLength: 22, isSepa: true, isExperimental: false, example: "DE75512108001245126199" },
  DK: { countryName: "Denmark", ibanLength: 18, isSepa: true, isExperimental: false, example: "DK9520000123456789" },
  EE: { countryName: "Estonia", ibanLength: 20, isSepa: true, isExperimental: false, example: "EE471000001020145685" },
  ES: { countryName: "Spain", ibanLength: 24, isSepa: true, isExperimental: false, example: "ES7921000813610123456789" },
  FI: { countryName: "Finland", ibanLength: 18, isSepa: true, isExperimental: false, example: "FI1410093000123458" },
  FO: { countryName: "Faroe Islands", ibanLength: 18, isSepa: false, isExperimental: false, example: "FO9264600123456789" },
  FR: { countryName: "France", ibanLength: 27, isSepa: true, isExperimental: false, example: "FR7630006000011234567890189" },
  GB: { countryName: "United Kingdom", ibanLength: 22, isSepa: true, isExperimental: false, example: "GB29NWBK60161331926819" },
  GI: { countryName: "Gibraltar", ibanLength: 23, isSepa: true, isExperimental: false, example: "GI56XAPO000001234567890" },
  GL: { countryName: "Greenland", ibanLength: 18, isSepa: false, isExperimental: false, example: "GL8964710123456789" },
  GR: { countryName: "Greece", ibanLength: 27, isSepa: true, isExperimental: false, example: "GR9608100010000001234567890" },
  HR: { countryName: "Croatia", ibanLength: 21, isSepa: true, isExperimental: false, example: "HR1723600001101234565" },
  HU: { countryName: "Hungary", ibanLength: 28, isSepa: true, isExperimental: false, example: "HU93116000060000000012345676" },
  IE: { countryName: "Ireland", ibanLength: 22, isSepa: true, isExperimental: false, example: "IE64IRCE92050112345678" },
  IS: { countryName: "Iceland", ibanLength: 26, isSepa: true, isExperimental: false, example: "IS750001121234563108962099" },
  IT: { countryName: "Italy", ibanLength: 27, isSepa: true, isExperimental: false, example: "IT60X0542811101000000123456" },
  LI: { countryName: "Liechtenstein", ibanLength: 21, isSepa: true, isExperimental: false, example: "LI7408806123456789012" },
  LT: { countryName: "Lithuania", ibanLength: 20, isSepa: true, isExperimental: false, example: "LT601010012345678901" },
  LU: { countryName: "Luxembourg", ibanLength: 20, isSepa: true, isExperimental: false, example: "LU120010001234567891" },
  LV: { countryName: "Latvia", ibanLength: 21, isSepa: true, isExperimental: false, example: "LV97HABA0012345678910" },
  MC: { countryName: "Monaco", ibanLength: 27, isSepa: true, isExperimental: false, example: "MC5810096180790123456789085" },
  MD: { countryName: "Moldova", ibanLength: 24, isSepa: true, isExperimental: false, example: "MD21EX000000000001234567" },
  ME: { countryName: "Montenegro", ibanLength: 22, isSepa: true, isExperimental: false, example: "ME25505000012345678951" },
  MK: { countryName: "North Macedonia", ibanLength: 19, isSepa: true, isExperimental: false, example: "MK07200002785123453" },
  MT: { countryName: "Malta", ibanLength: 31, isSepa: true, isExperimental: false, example: "MT31MALT01100000000000000000123" },
  NL: { countryName: "Netherlands", ibanLength: 18, isSepa: true, isExperimental: false, example: "NL02ABNA0123456789" },
  NO: { countryName: "Norway", ibanLength: 15, isSepa: true, isExperimental: false, example: "NO8330001234567" },
  PL: { countryName: "Poland", ibanLength: 28, isSepa: true, isExperimental: false, example: "PL10105000997603123456789123" },
  PT: { countryName: "Portugal", ibanLength: 25, isSepa: true, isExperimental: false, example: "PT50002700000001234567833" },
  RO: { countryName: "Romania", ibanLength: 24, isSepa: true, isExperimental: false, example: "RO66BACX0000001234567890" },
  RS: { countryName: "Serbia", ibanLength: 22, isSepa: true, isExperimental: false, example: "RS35105008123123123173" },
  SE: { countryName: "Sweden", ibanLength: 24, isSepa: true, isExperimental: false, example: "SE7280000810340009783242" },
  SI: { countryName: "Slovenia", ibanLength: 19, isSepa: true, isExperimental: false, example: "SI56192001234567892" },
  SK: { countryName: "Slovakia", ibanLength: 24, isSepa: true, isExperimental: false, example: "SK8975000000000012345671" },
  SM: { countryName: "San Marino", ibanLength: 27, isSepa: true, isExperimental: false, example: "SM76P0854009812123456789123" },
  VA: { countryName: "Vatican City", ibanLength: 22, isSepa: true, isExperimental: false, example: "VA59001123000012345678" },
  XK: { countryName: "Kosovo", ibanLength: 20, isSepa: false, isExperimental: false, example: "XK051212012345678906" },
  // ── Europe (non-SEPA) ──────────────────────────────────────────────────────
  AL: { countryName: "Albania", ibanLength: 28, isSepa: false, isExperimental: false, example: "AL35202111090000000001234567" },
  BA: { countryName: "Bosnia and Herzegovina", ibanLength: 20, isSepa: false, isExperimental: false, example: "BA393385804800211234" },
  BY: { countryName: "Belarus", ibanLength: 28, isSepa: false, isExperimental: false, example: "BY86AKBB10100000002966000000" },
  FK: { countryName: "Falkland Islands", ibanLength: 18, isSepa: false, isExperimental: false, example: "FK12SC987654321098" },
  RU: { countryName: "Russia", ibanLength: 33, isSepa: false, isExperimental: false, example: "RU0204452560040702810412345678901" },
  UA: { countryName: "Ukraine", ibanLength: 29, isSepa: false, isExperimental: false, example: "UA903052992990004149123456789" },
  // ── Middle East ────────────────────────────────────────────────────────────
  AE: { countryName: "United Arab Emirates", ibanLength: 23, isSepa: false, isExperimental: false, example: "AE460090000000123456789" },
  BH: { countryName: "Bahrain", ibanLength: 22, isSepa: false, isExperimental: false, example: "BH02CITI00001077181611" },
  IQ: { countryName: "Iraq", ibanLength: 23, isSepa: false, isExperimental: false, example: "IQ20CBIQ861800101010500" },
  IL: { countryName: "Israel", ibanLength: 23, isSepa: false, isExperimental: false, example: "IL170108000000012612345" },
  JO: { countryName: "Jordan", ibanLength: 30, isSepa: false, isExperimental: false, example: "JO71CBJO0000000000001234567890" },
  KW: { countryName: "Kuwait", ibanLength: 30, isSepa: false, isExperimental: false, example: "KW81CBKU0000000000001234560101" },
  LB: { countryName: "Lebanon", ibanLength: 28, isSepa: false, isExperimental: false, example: "LB92000700000000123123456123" },
  OM: { countryName: "Oman", ibanLength: 23, isSepa: false, isExperimental: false, example: "OM040280000012345678901" },
  PS: { countryName: "Palestine", ibanLength: 29, isSepa: false, isExperimental: false, example: "PS92PALS000000000400123456702" },
  QA: { countryName: "Qatar", ibanLength: 29, isSepa: false, isExperimental: false, example: "QA54QNBA000000000000693123456" },
  SA: { countryName: "Saudi Arabia", ibanLength: 24, isSepa: false, isExperimental: false, example: "SA4420000001234567891234" },
  YE: { countryName: "Yemen", ibanLength: 30, isSepa: false, isExperimental: false, example: "YE20ALMF0000000000001234560101" },
  // ── Central Asia ───────────────────────────────────────────────────────────
  AM: { countryName: "Armenia", ibanLength: 28, isSepa: false, isExperimental: false, example: "AM65212110090000000012345678" },
  AZ: { countryName: "Azerbaijan", ibanLength: 28, isSepa: false, isExperimental: false, example: "AZ77VTBA00000000001234567890" },
  GE: { countryName: "Georgia", ibanLength: 22, isSepa: false, isExperimental: false, example: "GE60NB0000000123456789" },
  KG: { countryName: "Kyrgyzstan", ibanLength: 26, isSepa: false, isExperimental: false, example: "KG75KIAB210301000100239670" },
  KZ: { countryName: "Kazakhstan", ibanLength: 20, isSepa: false, isExperimental: false, example: "KZ244350000012344567" },
  MN: { countryName: "Mongolia", ibanLength: 20, isSepa: false, isExperimental: false, example: "MN580050099123456789" },
  TJ: { countryName: "Tajikistan", ibanLength: 22, isSepa: false, isExperimental: false, example: "TJ06043502560010650024" },
  TM: { countryName: "Turkmenistan", ibanLength: 26, isSepa: false, isExperimental: false, example: "TM18NK24002205793602006600" },
  UZ: { countryName: "Uzbekistan", ibanLength: 28, isSepa: false, isExperimental: false, example: "UZ83NBU000000001432112640600" },
  // ── Asia Pacific ───────────────────────────────────────────────────────────
  PK: { countryName: "Pakistan", ibanLength: 24, isSepa: false, isExperimental: false, example: "PK36SCBL0000001123456702" },
  TL: { countryName: "Timor-Leste", ibanLength: 23, isSepa: false, isExperimental: false, example: "TL380010012345678910106" },
  // ── Africa (official) ──────────────────────────────────────────────────────
  BI: { countryName: "Burundi", ibanLength: 27, isSepa: false, isExperimental: false, example: "BI1320001100010000123456789" },
  DJ: { countryName: "Djibouti", ibanLength: 27, isSepa: false, isExperimental: false, example: "DJ2110002010010409943020008" },
  EG: { countryName: "Egypt", ibanLength: 29, isSepa: false, isExperimental: false, example: "EG800002000156789012345180002" },
  LY: { countryName: "Libya", ibanLength: 25, isSepa: false, isExperimental: false, example: "LY38021001000000123456789" },
  MR: { countryName: "Mauritania", ibanLength: 27, isSepa: false, isExperimental: false, example: "MR1300020001010000123456753" },
  MU: { countryName: "Mauritius", ibanLength: 30, isSepa: false, isExperimental: false, example: "MU43BOMM0101123456789101000MUR" },
  SC: { countryName: "Seychelles", ibanLength: 31, isSepa: false, isExperimental: false, example: "SC74MCBL01031234567890123456USD" },
  SD: { countryName: "Sudan", ibanLength: 18, isSepa: false, isExperimental: false, example: "SD8811123456789012" },
  SO: { countryName: "Somalia", ibanLength: 23, isSepa: false, isExperimental: false, example: "SO061000001123123456789" },
  ST: { countryName: "Sao Tome and Principe", ibanLength: 25, isSepa: false, isExperimental: false, example: "ST23000200000289355710148" },
  TN: { countryName: "Tunisia", ibanLength: 24, isSepa: false, isExperimental: false, example: "TN5904018104004942712345" },
  // ── Americas ───────────────────────────────────────────────────────────────
  BR: { countryName: "Brazil", ibanLength: 29, isSepa: false, isExperimental: false, example: "BR1500000000000010932840814P2" },
  CR: { countryName: "Costa Rica", ibanLength: 22, isSepa: false, isExperimental: false, example: "CR23015108410026012345" },
  DO: { countryName: "Dominican Republic", ibanLength: 28, isSepa: false, isExperimental: false, example: "DO22ACAU00000000000123456789" },
  GT: { countryName: "Guatemala", ibanLength: 28, isSepa: false, isExperimental: false, example: "GT20AGRO00000000001234567890" },
  HN: { countryName: "Honduras", ibanLength: 28, isSepa: false, isExperimental: false, example: "HN54PISA00000000000000123124" },
  LC: { countryName: "Saint Lucia", ibanLength: 32, isSepa: false, isExperimental: false, example: "LC14BOSL123456789012345678901234" },
  NI: { countryName: "Nicaragua", ibanLength: 28, isSepa: false, isExperimental: false, example: "NI79BAMC00000000000003123123" },
  SV: { countryName: "El Salvador", ibanLength: 28, isSepa: false, isExperimental: false, example: "SV43ACAT00000000000000123123" },
  VG: { countryName: "British Virgin Islands", ibanLength: 24, isSepa: false, isExperimental: false, example: "VG07ABVI0000000123456789" },
  TR: { countryName: "Turkey", ibanLength: 26, isSepa: false, isExperimental: false, example: "TR320010009999901234567890" },
  // ── Experimental / Partial IBAN ────────────────────────────────────────────
  AO: { countryName: "Angola", ibanLength: 25, isSepa: false, isExperimental: true, example: "AO06004400006729503010102" },
  BF: { countryName: "Burkina Faso", ibanLength: 28, isSepa: false, isExperimental: true, example: "BF42BF0840101300463574000390" },
  BJ: { countryName: "Benin", ibanLength: 28, isSepa: false, isExperimental: true, example: "BJ66BJ0610100100144390000769" },
  CF: { countryName: "Central African Republic", ibanLength: 27, isSepa: false, isExperimental: true, example: "CF4220001000010120069700160" },
  CG: { countryName: "Congo", ibanLength: 27, isSepa: false, isExperimental: true, example: "CG3930011000101013451300019" },
  CI: { countryName: "Ivory Coast", ibanLength: 28, isSepa: false, isExperimental: true, example: "CI93CI0080111301134291200589" },
  CM: { countryName: "Cameroon", ibanLength: 27, isSepa: false, isExperimental: true, example: "CM2110002000300277976315008" },
  CV: { countryName: "Cape Verde", ibanLength: 25, isSepa: false, isExperimental: true, example: "CV64000500000020108215144" },
  DZ: { countryName: "Algeria", ibanLength: 24, isSepa: false, isExperimental: true, example: "DZ1400100725020000018457" },
  GA: { countryName: "Gabon", ibanLength: 27, isSepa: false, isExperimental: true, example: "GA2140021010032001890020126" },
  GQ: { countryName: "Equatorial Guinea", ibanLength: 27, isSepa: false, isExperimental: true, example: "GQ7050002001003715228190196" },
  GW: { countryName: "Guinea-Bissau", ibanLength: 25, isSepa: false, isExperimental: true, example: "GW04GW1430010181800637601" },
  IR: { countryName: "Iran", ibanLength: 26, isSepa: false, isExperimental: true, example: "IR710570029971601460641001" },
  KM: { countryName: "Comoros", ibanLength: 27, isSepa: false, isExperimental: true, example: "KM4600005000010010904400137" },
  MA: { countryName: "Morocco", ibanLength: 28, isSepa: false, isExperimental: true, example: "MA64011519000001205000534921" },
  MG: { countryName: "Madagascar", ibanLength: 27, isSepa: false, isExperimental: true, example: "MG4600005030071289421016045" },
  ML: { countryName: "Mali", ibanLength: 28, isSepa: false, isExperimental: true, example: "ML13ML0160120102600100668497" },
  MZ: { countryName: "Mozambique", ibanLength: 25, isSepa: false, isExperimental: true, example: "MZ59000301080016367102371" },
  NE: { countryName: "Niger", ibanLength: 28, isSepa: false, isExperimental: true, example: "NE58NE0380100100130305000268" },
  SN: { countryName: "Senegal", ibanLength: 28, isSepa: false, isExperimental: true, example: "SN08SN0100152000048500003035" },
  TD: { countryName: "Chad", ibanLength: 27, isSepa: false, isExperimental: true, example: "TD8960002000010271091600153" },
  TG: { countryName: "Togo", ibanLength: 28, isSepa: false, isExperimental: true, example: "TG53TG0090604310346500400070" }
};
var IBAN_REGISTRY = Object.fromEntries(
  Object.entries(registry).map(([code, entry]) => [code, { countryCode: code, ...entry }])
);

// src/index.ts
function isValid(iban, options) {
  return validate(iban, options).isValid;
}
function validate(iban, options) {
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
    return fail(clean, "countryMismatch", `Expected country "${options.countryCca2}" but the IBAN starts with "${countryCode}".`, info);
  if (clean.length !== info.ibanLength)
    return fail(clean, "invalidLength", `${info.countryName} IBANs must be exactly ${info.ibanLength} characters long (got ${clean.length}).`, info);
  if (mod97(clean) !== 1)
    return fail(clean, "checksumFailed", "The mod-97 checksum failed. The IBAN contains an error.", info);
  return { isValid: true, cleanedIban: clean, error: void 0, errorMessage: void 0, countryInfo: info };
}
function getSupportedCountries() {
  return Object.keys(IBAN_REGISTRY).sort();
}
function getCountryInfo(countryCode) {
  return IBAN_REGISTRY[countryCode.toUpperCase()];
}
function getSepaCountries() {
  return Object.values(IBAN_REGISTRY).filter((c) => c.isSepa).sort((a, b) => a.countryCode.localeCompare(b.countryCode));
}
function getNonSepaCountries() {
  return Object.values(IBAN_REGISTRY).filter((c) => !c.isSepa).sort((a, b) => a.countryCode.localeCompare(b.countryCode));
}
function getExperimentalCountries() {
  return Object.values(IBAN_REGISTRY).filter((c) => c.isExperimental).sort((a, b) => a.countryCode.localeCompare(b.countryCode));
}
function getExpectedLength(countryCode) {
  return IBAN_REGISTRY[countryCode.toUpperCase()]?.ibanLength;
}
function mod97(iban) {
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
function fail(cleanedIban, error, errorMessage, countryInfo) {
  return { isValid: false, cleanedIban, error, errorMessage, countryInfo };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IBAN_REGISTRY,
  getCountryInfo,
  getExpectedLength,
  getExperimentalCountries,
  getNonSepaCountries,
  getSepaCountries,
  getSupportedCountries,
  isValid,
  validate
});
