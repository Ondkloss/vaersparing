# Værsparing

Kan kjøres for å spare X kroner pr millimeter nedbør som er meldt på ditt valgte sted for dagens dato. Foreløbig er programmet tenkt satt opp med en scheduler (cron eller lignende) for kjøring daglig rett over midnatt.

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
  - Denne IDen kan skaffes ved å kjøre `accounts.ts`
- `config.toAccountId` (tekst): IDen til en konto du vil overføre penger til
  - Denne IDen kan skaffes ved å kjøre `accounts.ts`
- `config.kronerPrMillimeter` (tall): Antall kroner du vil spare pr millimeter nedbør
- `config.yrLocation` (tekst): Link til ditt sted på Yr
  - Bla deg frem til ditt sted på Yr og kopier linken

## Kjøring

Filene av interesse er `app.ts`, `accounts.ts` og `forecast.ts`. Filene transpiles til JavaScript og kjøres så med `node`:

     npx tsc
     node dist/filnavn.js

Til utvikling kan det kjøres direkte med `ts-node`:

    npx ts-node filnavn.ts

Du kan droppe `npx` over hvis du har pakken det gjelder globalt installert.

### Applikasjonen

Filen `app.ts` overfører X kroner pr millimeter nedbør meldt inneværende døgn på ditt valgte sted. Eksempel output:

    11.3mm gir 113kr spart!

#### Planlegg kjøring (TODO)

- Eksempel på bruk av cron daglig:

      1 0 * * * <command>

- Eksempel på bruk av scheduled task daglig:

      schtasks /create /tn Vaersparing /tr "<command>" /sc DAILY /st 00:01

- Alternativt kan det lages en ny modul som kontinuerlig kjører og bruker NPM pakken `node-schedule` eller `cron` til å kjøre `app.ts`-funksjonaliteten daglig.

### Kontoer

Filen `accounts.ts` lister opp dine kontoer med blant annet ID, kontonummer og balanse. Eksempel output:

    <Account (ID: 123456789ABCDEFGHIJKLMNOPQRSTUVX) (number: 99991122222) (name: Brukskonto) (balance: 500.0)>
    <Account (ID: 987654321ABCDEFGHIJKLMNOPQRSTUVX) (number: 99991133333) (name: Sparekonto) (balance: 1000.0)>

### Værvarsel

Filen `forecast.ts` lister opp værmeldingen for inneværende døgn på ditt valgte sted. Eksempel output:

    <Location (country: Norge) (name: Bergen) (latitude: 60.3932308) (longitude: 5.3244951)>
    <Forecast (from: 2019-10-01T00:00:00) (to: 2019-10-01T06:00:00) (mm precipitation: 1)>
    <Forecast (from: 2019-10-01T06:00:00) (to: 2019-10-01T12:00:00) (mm precipitation: 3.3)>
    <Forecast (from: 2019-10-01T12:00:00) (to: 2019-10-01T18:00:00) (mm precipitation: 7)>
    <Forecast (from: 2019-10-01T18:00:00) (to: 2019-10-01T00:00:00) (mm precipitation: 0)>

## Tredjeparter

### Sbanken

Denne programvaren benytter API definert i Sbankens utviklerportal og krever noen verdier derfra i konfigurasjonen for å benytte APIet for overføring mellom egne konti.

Besøk de: [Sbanken utviklerportalen](https://sbanken.no/bruke/utviklerportalen/)

### Yr

Det hentes XML-varsel fra Yr for å finne ut meldt nedbørsmengde.

Besøk de: [Værvarsel fra Yr, levert av NRK og Meteorologisk institutt](https://www.yr.no/)

## Lisens

Legges ut under MIT lisensen som kan lese i `LICENSE` filen.
