import { getAccessToken, getAccountDetails } from './lib/sbanken';
import { Accounts } from './lib/models';
import config from 'config';

getAccessToken(config.get('credentials.userId'), config.get('credentials.clientId'), config.get('credentials.clientSecret')).then((response) => {
    getAccountDetails(config.get('credentials.userId'), response.access_token).then((response: Accounts) => {
        for (const account of response.items) {
            const { accountId, accountNumber, name, balance } = account;
            console.log(`<Account (ID: ${accountId}) (Number: ${accountNumber}) (Name: ${name}) (Balance: ${balance})>`);
        }
    }).catch((reason: string) => console.error(reason));
}).catch((reason: string) => console.error(reason));