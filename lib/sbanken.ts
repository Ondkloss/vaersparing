import request from 'superagent';
import btoa from 'btoa';
import { AccessToken, Accounts } from './models';

export const getAccessToken = (userId: number, clientId: string, clientSecret: string): Promise<AccessToken> => {
  var identityServerUrl = "https://auth.sbanken.no/identityserver/connect/token";
  var basicAuth = btoa(encodeURIComponent(clientId) + ":" + encodeURIComponent(clientSecret));

  var promise = new Promise<AccessToken>(function (resolve, reject) {
    request
      .post(identityServerUrl)
      .send('grant_type=client_credentials')
      .set('Authorization', "Basic " + basicAuth)
      .set('Accept', 'application/json')
      .set('customerId', '' + userId)
      .end(function (err, res) {
        if (err || !res.ok) {
          reject();
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
      .set('Authorization', "Bearer " + accessToken)
      .set('customerId', '' + userId)
      .send({
        fromAccountId,
        toAccountId,
        message,
        amount,
      })
      .end(function (err, res) {
        if (err || !res.ok) {
          reject();
        } else {
          resolve(true);
        }
      });
  });

  return promise;
}

export const getAccountDetails = (userId: number, accessToken: string): Promise<Accounts> => {
  var accountServiceUrl = "https://api.sbanken.no/exec.bank/api/v1/accounts/";

  var promise = new Promise<Accounts>(function (resolve, reject) {
    request
      .get(accountServiceUrl)
      .set('Authorization', "Bearer " + accessToken)
      .set('Accept', 'application/json')
      .set('customerId', '' + userId)
      .end(function (err, res) {
        if (err || !res.ok) {
          reject();
        } else {
          resolve(res.body);
        }
      });
  });

  return promise;
}
