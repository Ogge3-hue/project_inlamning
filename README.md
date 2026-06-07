# Project Webshop
En e-handelssida byggd med React och Vite som använder [DummyJSON API](https://dummyjson.com) för produktdata. Projektet innehåller en sökbar produktsida, individuella produktsidor, en global varukorg med Context API, samt en checkout-sida.

---

## Tekniker och verktyg

| Verktyg / Paket | Användning |
|---|---|
| React 19 | UI-ramverk |
| Vite | Byggverktyg och dev-server |
| React Router DOM | Klientsidig routing |
| Bootstrap / React-Bootstrap | Styling och komponenter |
| DummyJSON API | Produktdata |

**React-hooks som används:** `useState`, `useEffect`, `useMemo`, `useContext`

---

## Installation och start

### Förutsättningar

- [Node.js](https://nodejs.org/) version 18 eller senare installerat

### Steg 1 — Klona eller ladda ner projektet

```bash
git clone <repo-url>
cd Project_Webshop
```

### Steg 2 — Installera beroenden

```bash
npm install
```

### Steg 3 — Starta utvecklingsservern

```bash
npm run dev
```

Öppna sedan [http://localhost:5173](http://localhost:5173) i din webbläsare.

### Övriga kommandon

```bash
npm run build    # Bygger projektet för produktion (output i /dist)
npm run preview  # Förhandsgranskar produktionsbygget lokalt
npm run lint     # Kör ESLint för att kontrollera kodkvalitet
```

---

## Debounce-implementering

**Var:** [src/pages/Store.jsx](src/pages/Store.jsx) — `useEffect`-hooken på rad 31–54

**Hur det fungerar:**
Varje gång användaren skriver ett tecken i sökfältet triggas `useEffect` på nytt eftersom `searchTerm` är ett dependency. Inuti effekten startas en timer med `setTimeout` på **1000 millisekunder (1 sekund)**. Om användaren skriver nästa tecken innan timern gått ut, körs cleanup-funktionen (`clearTimeout`) som avbryter den föregående timern. API-anropet skickas alltså aldrig förrän användaren har slutat skriva i minst en sekund.

**Varför:** Utan debounce skulle ett nytt fetch-anrop skickas vid varje knapptryckning, vilket hade resulterat i onödigt många API-anrop och en sämre användarupplevelse.

---

## Felhantering med try/catch
Felhantering är implementerad på två ställen i applikationen:

### 1. Store-sidan — sökning ([src/pages/Store.jsx](src/pages/Store.jsx), rad 36–49)

API-anropet i debounce-effekten är inlindat i ett `try/catch/finally`-block.

- Om servern svarar med en HTTP-felkod (t.ex. 500) kastas ett fel manuellt via `throw new Error(...)`.
- Om nätverket är nere eller fetch misslyckas fångas felet i `catch`.
- `finally` körs alltid och ser till att laddningsspinnern stängs av oavsett resultat.
- Felmeddelandet visas sedan i UI:t via `{error && <div className="errorBox">⚠ {error}</div>}`.

### 2. Produktsidan — enskild produkt ([src/pages/ItemPage.jsx](src/pages/ItemPage.jsx), rad 13–22)

Här används `.catch()` i en promise-kedja istället för async/await, vilket ger samma felskydd

Om produktens ID inte hittas i API:t kastas ett fel och felmeddelandet `"Product not found"` visas direkt i UI:t.
---
## Projektstruktur
```
src/
├── context/
│   └── CartContext.jsx       # Global varukorg med Context API + localStorage
├── pages/
│   ├── Home.jsx              # Startsida
│   ├── Store.jsx             # Sökbar produktsida med debounce
│   ├── ItemPage.jsx          # Enskild produktsida
│   ├── CheckOut.jsx          # Checkout-sida
│   ├── About.jsx             # Om-sida
│   └── Contact.jsx           # Kontaktsida
├── Komponenter/
│   ├── HeroNav/Hero.jsx      # Navigationsbar / hero-sektion
│   ├── AboutSidan/           # Komponenter för About-sidan
│   └── ContactSidan/         # Komponenter för Contact-sidan
└── main.jsx                  # Applikationens ingångspunkt
```

## Övriga funktioner

- **Global varukorg** — `CartContext` delar varukorgsstatus globalt via Context API. Innehållet sparas automatiskt i `localStorage` så att kundvagnen bevaras vid sidomladdning.
- **useMemo** — Används i `CartContext` för att beräkna det totala antalet varor utan att räkna om värdet i onödan vid varje render.
- **React Router** — Klientsidig routing med `<Routes>`, `<Link>` och `<NavLink>` för navigation mellan sidor utan sidomladdning.
