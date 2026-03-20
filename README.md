# 🛒 E-Store Mockup

A frontend-only e-commerce mockup built from scratch — product listing, category filtering, and a persistent shopping cart. No backend, no checkout flow, just clean frontend architecture with TypeScript and React Bootstrap.

## 🚀 Live Demo

👉 [karma-store-26.netlify.app](https://karma-store-26.netlify.app/store)

---

## ✨ Features

- **Product listing** — browse all available items in a clean grid layout
- **Category filtering** — narrow down products by category
- **Shopping cart** — add and remove items with live quantity and total tracking
- **Cart persistence** — cart state is saved to `localStorage` and restored on page load via `useEffect`
- **Multi-currency support** — switch currencies and see live-converted prices formatted per locale

---

## 🛠️ Tech Stack

| | |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| UI library | React Bootstrap 5 |
| Routing | React Router v7 |
| Icons | react-icons |
| Currency API | Frankfurter (live exchange rates) |
| Build tool | Vite |

---

## 📦 Getting Started
```bash
git clone https://github.com/karmartir/meta-store-feb-26.git
cd meta-store-feb-26
npm install
npm run dev
```

---

## 🔑 Key Implementation Details

**TypeScript throughout** — components, props, and state are fully typed, keeping the codebase predictable and refactor-friendly.

**Cart persistence** — on mount, a `useEffect` reads the cart from `localStorage` so items survive page reloads without any backend.

**Filtering** — category selection updates the displayed product list without any external state library, keeping logic simple and co-located.

**React Router v7** — page navigation is handled with the latest Router API, with routes split cleanly across pages.

**`useFormatCurrency` — custom hook** — fetches live USD → target currency rates from the [Frankfurter API](https://www.frankfurter.app/) and returns a formatter function that converts any price and displays it with the correct locale (`en-US`, `fr-FR`, `en-GB`, `ja-JP`, etc.). Supports USD, EUR, GBP, JPY, and CAD out of the box.

---

## 📚 What I Practised

- Building a multi-page React app with TypeScript from scratch
- Typing components, props, and state interfaces
- React Router v7 navigation and route structure
- Cart state management without a global state library
- localStorage read/write pattern with `useEffect`
- Writing a custom hook that fetches live data and returns a utility function
- `Intl.NumberFormat` for locale-aware currency formatting
- React Bootstrap layout and component usage

---

## 🙏 Credits

Developed under the mentorship of Julia Frolova.
