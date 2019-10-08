import { request, proxy } from './request';
import { Parser } from 'xml2js';
import { Yr } from './models';

export const getForecast = async (placeUrl: string): Promise<Yr> => {
    return request.get(`${placeUrl}/varsel.xml`)
        .proxy(proxy)
        .then((result: any) => {
            const parser = new Parser({ explicitArray: false });
            return parser.parseStringPromise(result.text);
        });
}

export const getTodaysPrecipitation = async (placeUrl: string): Promise<number> => {
    const yr = await getForecast(placeUrl);
    let sum: number = 0;
    for (const time of yr.weatherdata.forecast.tabular.time) {
        if (new Date(Date.parse(time.$.from)).toDateString() == new Date().toDateString()) {
            const { value } = time.precipitation.$;
            sum += Math.round(parseFloat(value) * 10) / 10;
        }
    }
    return sum;
}
