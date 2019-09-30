import { getForecast } from './lib/yr';
import config from 'config';

// Gets and prints todays forecast
getForecast(config.get('config.yrLocation')).then((response) => {
    for (const time of response.weatherdata.forecast.tabular.time) {
        if (new Date(Date.parse(time.$.from)).toDateString() == new Date().toDateString()) {
            const { from, to } = time.$;
            const { value } = time.precipitation.$;
            console.log(`<Forecast (From: ${from}) (To: ${to}) (Mm precipitation: ${value})>`);
        }
    }
});