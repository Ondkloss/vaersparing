import { performApp, performAccounts, performForecast } from './lib/vaersparing';
import { ArgumentParser } from 'argparse';
import pckg from './package.json';

const parser = new ArgumentParser({
    version: pckg.version,
    description: 'Værsparing'
});

const group = parser.addMutuallyExclusiveGroup({ required: true });

group.addArgument(['-a', '--accounts'], {
    help: 'List opp kontoer.',
    action: 'storeTrue'
});

group.addArgument(['-f', '--forecast'], {
    help: 'Vis værmelding for i dag på ditt sted.',
    action: 'storeTrue'
});

group.addArgument(['-s', '--save'], {
    help: 'Utfør sparing basert på værmelding.',
    action: 'storeTrue'
});

const args = parser.parseArgs();

if (args.save) {
    performApp();
}
else if (args.forecast) {
    performForecast();
}
else if (args.accounts) {
    performAccounts();
}
else {
    console.log('Hyggelig at du stakk innom!');
}
