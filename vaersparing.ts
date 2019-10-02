import schedule from 'node-schedule';
import { performApp } from './lib/vaersparing';

console.log(`Starter daglig planlagt kjøring fra ${process.cwd()} av Værsparing`);

schedule.scheduleJob('1 0 * * *', function () {
    performApp();
});
