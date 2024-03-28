# Projekto pavadinimas

Šiame `README.md` faile pateikiama informacija, kaip pasileisti React projektą ir JSON serverį.

## Pradinių paketų įdiegimas

Projekte naudojami šie npm paketai:

- `uuid` generuoti unikaliems identifikatoriams.
- `styled-components` stiliams aprašyti.
- `react-router-dom` maršrutizacijai tarp komponentų.
- `formik` formų valdymui.
- `yup` formų validacijai.

Norėdami įdiegti šiuos paketus, atidarykite terminalą ir įvykdykite šias komandas:

```bash
npm install uuid
npm install styled-components
npm install react-router-dom
npm install formik
npm install yup

```

JSON Serverio paleidimas

Norėdami paleisti JSON serverį, atlikite šiuos veiksmus:

Įsitikinkite, kad turite json-server įdiegtą globaliai. Jei dar neturite, galite jį įdiegti naudodami šią komandą:

```bash
npm install -g json-server

```

Paleiskite serverį naudodami šią komandą:

```bash
json-server --watch db.json --port 8080
```

Serveris turėtų pradėti veikti ant http://localhost:8080.

React projekto paleidimas.
Norėdami paleisti React projektą, atlikite šiuos veiksmus:

Atidarykite terminalą projekto šakniniame kataloge.
Įvykdykite šią komandą:

```bash
npm start
```
