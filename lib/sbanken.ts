import { request, proxy } from './request';
import btoa from 'btoa';
import { SbankenAccessToken, SbankenAccounts } from './models';

export const getAccessToken = (userId: number, clientId: string, clientSecret: string): Promise<SbankenAccessToken> => {
  var identityServerUrl = "https://auth.sbanken.no/identityserver/connect/token";
  var basicAuth = btoa(encodeURIComponent(clientId) + ":" + encodeURIComponent(clientSecret));

  var promise = new Promise<SbankenAccessToken>(function (resolve, reject) {
    request
      .post(identityServerUrl)
      .proxy(proxy)
      .send('grant_type=client_credentials')
      .set('Authorization', "Basic " + basicAuth)
      .set('Accept', 'application/json')
      .set('customerId', '' + userId)
      .end(function (err: any, res: any) {
        if (err || !res.ok) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  });

  return promise;
}

export const performTransaction = (userId: number, accessToken: string, fromAccountId: string, toAccountId: string, message: string, amount: number): Promise<boolean> => {
  var identityServerUrl = "https://api.sbanken.no/exec.bank/api/v1/transfers/";

  var promise = new Promise<boolean>(function (resolve, reject) {
    request
      .post(identityServerUrl)
      .proxy(proxy)
      .set('Authorization', "Bearer " + accessToken)
      .set('customerId', '' + userId)
      .send({
        fromAccountId,
        toAccountId,
        message,
        amount,
      })
      .end(function (err: any, res: any) {
        if (err || !res.ok) {
          reject(err);
        } else {
          resolve(true);
        }
      });
  });

  return promise;
}

export const getAccountDetails = (userId: number, accessToken: string): Promise<SbankenAccounts> => {
  var accountServiceUrl = "https://api.sbanken.no/exec.bank/api/v1/accounts/";

  var promise = new Promise<SbankenAccounts>(function (resolve, reject) {
    request
      .get(accountServiceUrl)
      .proxy(proxy)
      .set('Authorization', "Bearer " + accessToken)
      .set('Accept', 'application/json')
      .set('customerId', '' + userId)
      .end(function (err: any, res: any) {
        if (err || !res.ok) {
          console.log(err, res);
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  });

  return promise;
}
