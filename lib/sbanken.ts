import { request, proxy } from './request';
import btoa from 'btoa';
import { SbankenAccessToken, SbankenAccounts } from './models';

export const getAccessToken = async (userId: number, clientId: string, clientSecret: string): Promise<SbankenAccessToken> => {
  var identityServerUrl = "https://auth.sbanken.no/identityserver/connect/token";
  var basicAuth = btoa(encodeURIComponent(clientId) + ":" + encodeURIComponent(clientSecret));

  return request
    .post(identityServerUrl)
    .proxy(proxy)
    .send('grant_type=client_credentials')
    .set('Authorization', "Basic " + basicAuth)
    .set('Accept', 'application/json')
    .set('customerId', '' + userId)
    .then((result: any) => result.body);
}

export const performTransaction = async (userId: number, accessToken: string, fromAccountId: string, toAccountId: string, message: string, amount: number): Promise<boolean> => {
  var identityServerUrl = "https://api.sbanken.no/exec.bank/api/v1/transfers/";

  return request
    .post(identityServerUrl)
    .proxy(proxy)
    .set('Authorization', "Bearer " + accessToken)
    .set('customerId', '' + userId)
    .send({
      fromAccountId,
      toAccountId,
      message,
      amount,
    }).then((result: any) => true);
}

export const getAccountDetails = async (userId: number, accessToken: string): Promise<SbankenAccounts> => {
  var accountServiceUrl = "https://api.sbanken.no/exec.bank/api/v1/accounts/";

  return request
    .get(accountServiceUrl)
    .proxy(proxy)
    .set('Authorization', "Bearer " + accessToken)
    .set('Accept', 'application/json')
    .set('customerId', '' + userId)
    .then((result: any) => result.body);
}
