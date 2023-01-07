export interface CountrySmall {
    name:         Name;
    cca3:         string;
    capital:      string[];
    altSpellings: string[];
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: { [key: string]: NativeName };
}

export interface NativeName {
    official: string;
    common:   string;
}
