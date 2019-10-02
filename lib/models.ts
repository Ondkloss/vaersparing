export interface SbankenAccessToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface SbankenAccounts {
  availableItems: number;
  items: SbankenAccount[];
  errorType: string;
  isError: boolean;
  errorCode: number;
  errorMessage: string;
  traceId: string;
}

export interface SbankenAccount {
  accountId: string;
  accountNumber: string;
  ownerCustomerId: string;
  name: string;
  accountType: string;
  available: number;
  balance: number;
  creditLimit: number;
}

export interface Yr {
  weatherdata: YrWeatherdata;
}

export interface YrWeatherdata {
  location: YrLocation;
  forecast: YrForecast;
}

export interface YrLocation {
  name: string;
  country: string;
  location: YrGeoLocation;
}

export interface YrGeoLocation {
  $: YrGeoLocationAttributes;
}

export interface YrGeoLocationAttributes {
  altitude: string;
  latitude: string;
  longitude: string;
}

export interface YrForecast {
  tabular: YrTabular;
}

export interface YrTabular {
  time: YrTime[];
}

export interface YrTime {
  $: YrTimeAttributes,
  symbol: YrSymbol;
  precipitation: YrPrecipitation;
}

export interface YrTimeAttributes {
  from: string;
  to: string;
  period: string;
}

export interface YrSymbol {
  $: YrSymbolAttributes;
}

export interface YrSymbolAttributes {
  number: string;
  numberEx: string;
  name: string;
  var: string;
}

export interface YrPrecipitation {
  $: YrPrecipitationAttributes;
}

export interface YrPrecipitationAttributes {
  value: string;
  minvalue: string;
  maxvalue: string;
}
