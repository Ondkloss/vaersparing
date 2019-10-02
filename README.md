# Værsparing

Kan kjøres for å spare X kroner pr millimeter nedbør som er meldt på ditt valgte sted for dagens dato.

Programmet kan enten kjøres enkeltvis (`dist/app.js`) eller som en kontinuerlig kjørende process (`dist/vaersparing.js`).

## Oppsett

Det kreves Node, og nødvendige pakker kan installeres slik:

    npm install

Det må settes opp `config/default.json` for å kunne kjøre programmet. Her er en oppsummering av feltene:

- `credentials.userId` (tall): Ditt fødselsnummer
  - Denne kan alternativt settes i en `SBANKEN_USERID` miljøvariabel
- `credentials.clientId` (tekst): Finner du i Sbanken utviklerportal som "Applikasjonsnøkkel" og "ClientId"
  - Denne kan alternativt settes i en `SBANKEN_CLIENTID` miljøvariabel
- `credentials.clientSecret` (tekst): Passord bestilt i Sbanken utviklerportal
  - Denne kan alternativt settes i en `SBANKEN_CLIENTSECRET` miljøvariabel
- `config.fromAccountId` (tekst): IDen til en konto du vil overføre penger fra
  - Denne IDen kan skaffes ved å kjøre `node dist/app.js --accounts`
- `config.toAccountId` (tekst): IDen til en konto du vil overføre penger til
  - Denne IDen kan skaffes ved å kjøre `node dist/app.js --accounts`
- `config.kronerPrMillimeter` (tall): Antall kroner du vil spare pr millimeter nedbør
- `config.yrLocation` (tekst): Link til ditt sted på Yr
  - Bla deg frem til ditt sted på Yr og kopier linken

## Kjøring

Filene av interesse er `app.ts` og `vaersparing.ts`. Filene transpiles til JavaScript og kjøres så med `node`:

     npx tsc
     node dist/filnavn.js

Til utvikling kan det kjøres direkte med `ts-node`:

    npx ts-node filnavn.ts

Du kan droppe `npx` over hvis du har pakken det gjelder globalt installert.

### Enkelt kjøring

Filen `dist/app.js` kan brukes til en enkelt kjøring med tre ulike argumenter. For detaljer kjør `node dist/app.js --help`.

- For sparing kjøres `node dist/app.js --save` som overfører X kroner pr millimeter nedbør meldt inneværende døgn på ditt valgte sted. Eksempel output:

      11.3mm gir 113kr spart!

- For kontooversikt kjøres `node dist/app.js --accounts` som viser blant annet ID, kontonummer og saldo. Eksempel output:

      <Konto (ID: 123456789ABCDEFGHIJKLMNOPQRSTUVX) (nummer: 99991122222) (navn: Brukskonto) (saldo: 500.0)>
      <Konto (ID: 987654321ABCDEFGHIJKLMNOPQRSTUVX) (nummer: 99991133333) (navn: Sparekonto) (saldo: 1000.0)>

- For værvarsel kjøres `node dist/app.js --forecast` som viser inneværende døgn på ditt valgte sted. Eksempel output:

      <Sted (land: Norge) (navn: Bergen) (latitude: 60.3932308) (longitude: 5.3244951)>
      <Værmelding (fra: 2019-10-01T00:00:00) (til: 2019-10-01T06:00:00) (mm nedbør: 1)>
      <Værmelding (fra: 2019-10-01T06:00:00) (til: 2019-10-01T12:00:00) (mm nedbør: 3.3)>
      <Værmelding (fra: 2019-10-01T12:00:00) (til: 2019-10-01T18:00:00) (mm nedbør: 7)>
      <Værmelding (fra: 2019-10-01T18:00:00) (til: 2019-10-01T00:00:00) (mm nedbør: 0)>

### Planlagt kjøring

Filen `dist/vaersparing.js` utfører det samme som `dist/app.js --save`, bare satt til å kjøre rett over midnatt hver dag. Hvis man ønsker jevnlig sparing er det tenkt å kjøre en av disse to variantene. Nedenfor er noen eksempel på måter å sette dette i gang.

#### PM2 eksempel

Komme i gang:

    node install -g pm2
    pm2 start dist/vaersparing.js --log-date-format 'YYYY-MM-DD HH:mm:ss.SSS'
    pm2 save

For automatisk oppstart kjør følgende kommando og følg instruksen (ikke Windows):

    pm2 startup

For automatisk oppstart kjør (Windows):

    npm install -g pm2-windows-startup
    pm2-startup install

Diverse nyttige kommandoer etter første oppstart:

    pm2 start vaersparing
    pm2 stop vaersparing
    pm2 delete vaersparing
    pm2 logs vaersparing
    pm2 flush vaersparing

#### Cron eksempel

    1 0 * * * <dist/app.js command>

#### Scheduled task eksempel

    schtasks /create /tn Vaersparing /tr "<dist/app.js command>" /sc DAILY /st 00:01

## Tredjeparter

### Sbanken

Denne programvaren benytter API definert i Sbankens utviklerportal og krever noen verdier derfra i konfigurasjonen for å benytte APIet for overføring mellom egne konti.

Besøk de: [Sbanken utviklerportalen](https://sbanken.no/bruke/utviklerportalen/)

### Yr

Det hentes XML-varsel fra Yr for å finne ut meldt nedbørsmengde.

Besøk de: [Værvarsel fra Yr, levert av NRK og Meteorologisk institutt](https://www.yr.no/)

## Lisens

Legges ut under MIT lisensen som kan lese i `LICENSE` filen.
