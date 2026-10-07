# UCLA Mobile Order

A front-end prototype of a mobile food-ordering app for UCLA campus dining. It explores how a student might find nearby dining halls, track an active order, and reorder a favorite meal, all in a phone-sized interface.

Built with plain HTML, CSS, and JavaScript. There is no framework, no dependencies, and no build step.

> **Disclaimer:** This is an unofficial design prototype and is not affiliated with or endorsed by UCLA. All locations, meals, prices, orders, and profile details are mock data.

## Features

**Home**
- Active order card with a progress bar, pickup location, walking directions, and a pickup details panel with a scannable code
- Nearby dining shown as a list or an interactive map with location pins
- Quick reorder shortcuts for favorite meals
- Live search across dining locations and meals

**Dining**
- Search by meal or location name
- Filter chips: Vegetarian, No nuts, and Under 10 min
- Location detail panel with walking time, pickup estimate, and hours

**Cart**
- Adjustable quantity with an updating subtotal, tax, and total
- Mock payment method and order confirmation screen

**Profile**
- Account summary, dining stats, and notification toggle

## Getting started

No installation is required. Download or clone this repository, then either open `index.html` directly in your browser or serve the folder with a local static server:

```bash
python3 -m http.server 8000
```

and visit `http://localhost:8000`.

The page is designed for a phone-width screen. On larger screens it renders inside a centered phone frame. For the best view, use your browser's device toolbar (mobile view).

Fonts (Outfit and Figtree) load from Google Fonts. Without an internet connection, the page falls back to system fonts.

## Project structure

```text
ucla-mobile-order/
├── index.html      # Markup for all screens and slide-up panels
├── styles.css      # Styling, theme colors, and layout
├── script.js       # Mock data, navigation, search, filters, and cart logic
└── assets/
    └── food.jpg    # Photo used in Quick reorder
```

## Customizing

- **Data:** Dining locations (`LOCATIONS`) and meals (`MEALS`) are defined at the top of `script.js`. Add or edit entries there and the Dining screen and search results update automatically.
- **Theme:** Colors and corner radius are CSS variables in the `:root` block at the top of `styles.css`.
- **Prices:** The item price and tax used by the cart are constants (`ITEM_PRICE`, `TAX`) at the top of `script.js`.

## Limitations

This is a prototype, so some things are intentionally simplified:

- No backend, accounts, or real payments
- The cart holds a single sample item, and the cart badge count is static
- Map pins are placed on a decorative grid, not a real map
- Order progress, pickup times, and the pickup code are for illustration only
