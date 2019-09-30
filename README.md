# Værsparing

Samler sammen noen mynter når været er dårlig.

## Beskrivelse

Kan kjøres for å spare X antall kroner pr millimeter nedbør som er meldt på ditt valgte sted for dagens dato. Er foreløbig tenkt satt opp med cron for kjøring daglig rett over midnatt.

## Tredjeparter

### Sbanken

Denne programvaren benytter API definert i Sbankens utviklerportal og krever noen verdier derfra i konfigurasjonen for å benytte APIet for overføring mellom egne konti.

Besøk de: [Sbanken utviklerportalen](https://sbanken.no/bruke/utviklerportalen/)

### Yr

Det hentes XML-varsel fra Yr for å finne ut meldt nedbørsmengde.

Besøk de: [Værvarsel fra Yr, levert av NRK og Meteorologisk institutt](https://www.yr.no/)

## Kjøring

Sett først opp verdiene in `config/default.json`. Kan så kjøres med `ts-node app.ts`. Bedre beskrivelse kommer. 

## Lisens

Legges ut under MIT lisensen som kan lese i `LICENSE` filen.
