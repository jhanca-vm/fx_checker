# FX_CHECKER

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Built with Rspack](https://img.shields.io/badge/Bundler-Rspack-yellow)](https://rspack.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

Web app for checking currency exchange rates, viewing historical quotes, and
comparing a base amount against multiple currency pairs.

## Features

- Query the current exchange rate between two currencies.
- Swap base and quote currencies instantly.
- View historical exchange rate data with selectable timeframes.
- Compare a fixed amount against several currency pairs.

## Tech Stack

- **Framework:** React 19
- **Bundler:** Rspack
- **Styling:** Tailwind CSS
- **State & Data:** Zustand & TanStack Query
- **Data Visualization:** Recharts
- **API:** [Frankfurter API](https://frankfurter.dev)

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get started

Start the dev server, and the app will be available at <http://localhost:8080>.

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```
