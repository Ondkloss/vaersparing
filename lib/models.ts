export interface AccessToken {
    access_token: string;
    expires_in: number;
    token_type: string;
}

export interface Accounts {
  availableItems: number;
  items: Account[];
  errorType: string;
  isError: boolean;
  errorCode: number;
  errorMessage: string;
  traceId: string;
}

export interface Account {
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
  forecast: YrForecast;
}

export interface YrForecast {
  tabular: YrTabular;
}

export interface YrTabular {
  time: YrTime[];
}

export interface YrTime {
  $: YrTimeAttributes,
  precipitation: YrPrecipitation;
}

export interface YrTimeAttributes {
  from: string;
  to: string;
  period: string;
}

export interface YrPrecipitation {
  $: YrPrecipitationAttributes;
}

export interface YrPrecipitationAttributes {
  value: string;
  minvalue: string;
  maxvalue: string;
}