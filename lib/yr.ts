import { request, proxy } from './request';
import { Parser } from 'xml2js';
import { Yr } from './models';

export const getForecast = (placeUrl: string): Promise<Yr> => {
    var promise = new Promise<Yr>(function (resolve, reject) {
        request.get(`${placeUrl}/varsel.xml`)
            .proxy(proxy)
            .end(function (err: any, res: any) {
                if (err || !res.ok) {
                    reject(err);
                } else {
                    const parser = new Parser({ explicitArray: false });
                    parser.parseStringPromise(res.text).then((response) => {
                        resolve(response);
                    });
                }
            });
    });

    return promise;
}

export const getTodaysPrecipitation = (placeUrl: string): Promise<number> => {
    return getForecast(placeUrl).then((response) => {
        let sum: number = 0;
        for (const time of response.weatherdata.forecast.tabular.time) {
            if (new Date(Date.parse(time.$.from)).toDateString() == new Date().toDateString()) {
                const { value } = time.precipitation.$;
                sum += parseFloat(value);
            }
        }
        return sum;
    }).catch((reason: string) => {
        console.error(reason);
        return -1;
    });
}
