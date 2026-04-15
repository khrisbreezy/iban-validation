# Changelog

## 1.0.0

- Initial release.
- Full ISO 13616 / SWIFT IBAN registry support (89 official countries).
- Experimental support for 22 partial-IBAN countries (Africa + Iran).
- `isValid()` with optional country constraint.
- `validate()` — discriminated union result with typed error enum.
- `getSupportedCountries()`, `getCountryInfo()`, `getSepaCountries()`, `getNonSepaCountries()`, `getExperimentalCountries()`, `getExpectedLength()`.
- Dual CJS + ESM build via tsup.
- Full TypeScript types shipped.
