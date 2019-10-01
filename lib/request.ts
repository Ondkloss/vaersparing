import { default as r } from 'superagent';
// @ts-ignore
import setup from 'superagent-proxy';

export const request = setup(r);
export const proxy = process.env.https_proxy;
