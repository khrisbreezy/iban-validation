interface IbanCountryInfo {
    readonly countryCode: string;
    readonly countryName: string;
    readonly ibanLength: number;
    readonly isSepa: boolean;
    readonly isExperimental: boolean;
    readonly example: string;
}
declare const IBAN_REGISTRY: Readonly<Record<string, IbanCountryInfo>>;

type IbanValidationError = "emptyInput" | "tooShort" | "invalidCharacters" | "unknownCountry" | "countryMismatch" | "invalidLength" | "checksumFailed";
type IbanValidationResult = {
    isValid: true;
    cleanedIban: string;
    error: undefined;
    errorMessage: undefined;
    countryInfo: IbanCountryInfo;
} | {
    isValid: false;
    cleanedIban: string;
    error: IbanValidationError;
    errorMessage: string;
    countryInfo: IbanCountryInfo | undefined;
};
declare function isValid(iban: string, options?: {
    countryCca2?: string;
}): boolean;
declare function validate(iban: string, options?: {
    countryCca2?: string;
}): IbanValidationResult;
declare function getSupportedCountries(): string[];
declare function getCountryInfo(countryCode: string): IbanCountryInfo | undefined;
declare function getSepaCountries(): IbanCountryInfo[];
declare function getNonSepaCountries(): IbanCountryInfo[];
declare function getExperimentalCountries(): IbanCountryInfo[];
declare function getExpectedLength(countryCode: string): number | undefined;

export { IBAN_REGISTRY, type IbanCountryInfo, type IbanValidationError, type IbanValidationResult, getCountryInfo, getExpectedLength, getExperimentalCountries, getNonSepaCountries, getSepaCountries, getSupportedCountries, isValid, validate };
