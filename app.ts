import { getAccessToken, performTransaction } from './lib/sbanken';
import { getTodaysPrecipitation } from './lib/yr';
import config from 'config';

getAccessToken(config.get('credentials.userId'), config.get('credentials.clientId'), config.get('credentials.clientSecret')).then((tokenResponse) => {
    getTodaysPrecipitation(config.get('config.yrLocation')).then((precipitationResponse) => {
        if (precipitationResponse > 0) {
            const kronerPrMillimeter: number = config.get('config.kronerPrMillimeter');
            const kroner = kronerPrMillimeter * precipitationResponse;
            const message = `${precipitationResponse}mm gir ${kroner}kr ferie!`; // Max 30 characters

            performTransaction(config.get('credentials.userId'), tokenResponse.access_token, config.get('config.fromAccountId'), config.get('config.toAccountId'),
                message, kroner).then((response) => {
                    console.log(message);
                }).catch((reason: string) => console.error(reason));
        }
    }).catch((reason: string) => console.error(reason));
}).catch((reason: string) => console.error(reason));
