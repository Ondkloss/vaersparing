import { getAccessToken, getAccountDetails, performTransaction } from './sbanken';
import { getForecast, getTodaysPrecipitation } from './yr';
import { SbankenAccounts } from './models';
import config from 'config';


export const performApp = () => {
    // Transfers X kroner per millimeter precipitation
    getAccessToken(config.get('credentials.userId'), config.get('credentials.clientId'), config.get('credentials.clientSecret')).then((tokenResponse) => {
        getTodaysPrecipitation(config.get('config.yrLocation')).then((precipitationResponse) => {
            if (precipitationResponse > 0) {
                const kronerPrMillimeter: number = config.get('config.kronerPrMillimeter');
                const kroner = kronerPrMillimeter * precipitationResponse;
                const message = `${precipitationResponse}mm gir ${kroner}kr spart!`; // Max 30 characters

                performTransaction(config.get('credentials.userId'), tokenResponse.access_token, config.get('config.fromAccountId'), config.get('config.toAccountId'),
                    message, kroner).then((response) => {
                        console.log(message);
                    }).catch((reason: any) => console.error(reason));
            }
            else {
                console.log('Ingen nedbør i sikte. Nyt finværet!');
            }
        }).catch((reason: any) => console.error(reason));
    }).catch((reason: any) => console.error(reason));
}

export const performAccounts = () => {
    // Gets and prints your account details
    getAccessToken(config.get('credentials.userId'), config.get('credentials.clientId'), config.get('credentials.clientSecret')).then((response) => {
        getAccountDetails(config.get('credentials.userId'), response.access_token).then((response: SbankenAccounts) => {
            for (const account of response.items) {
                const { accountId, accountNumber, name, balance } = account;
                console.log(`<Konto (ID: ${accountId}) (nummer: ${accountNumber}) (navn: ${name}) (saldo: ${balance})>`);
            }
        }).catch((reason: any) => console.error(reason));
    }).catch((reason: any) => console.error(reason));
}

export const performForecast = () => {
    // Gets and prints todays forecast
    getForecast(config.get('config.yrLocation')).then((response) => {
        const { country, name } = response.weatherdata.location;
        const { latitude, longitude } = response.weatherdata.location.location.$;
        console.log(`<Sted (land: ${country}) (navn: ${name}) (latitude: ${latitude}) (longitude: ${longitude})>`);
        for (const time of response.weatherdata.forecast.tabular.time) {
            if (new Date(Date.parse(time.$.from)).toDateString() == new Date().toDateString()) {
                const { from, to } = time.$;
                const { value } = time.precipitation.$;
                console.log(`<Værmelding (fra: ${from}) (til: ${to}) (mm nedbør: ${value})>`);
            }
        }
    }).catch((reason: any) => console.error(reason));
}