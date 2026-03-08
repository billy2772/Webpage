# Symbol Fest Webpage

This project provides a basic event website built with **HTML, CSS, JavaScript, and SQL**.

## Pages
- `index.html`
  - Event instructions and overview
  - 3-step registration form with payment QR section
  - Payment options: `₹250 - Technical only` or `₹300 - Both Technical & Non-Technical`
  - Auto-generated participant ID with prefix `ITDE00`
- `organizer.html`
  - Organizer-only dashboard idea
  - Shows only technical participants from browser storage

## Files
- `styles.css` - shared page styles (including payment QR card)
- `payment-qr.svg` - QR image placeholder used in payment section
- `app.js` - multi-step form logic and registration ID generation
- `organizer.js` - technical participant filtering and table rendering
- `schema.sql` - SQL schema for participants and organizer access

## Run locally
Use any static server (example):

```bash
python3 -m http.server 8000
```

Then open:
- `http://localhost:8000/index.html`
- `http://localhost:8000/organizer.html`
