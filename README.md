# Webpage

## Run
Open `index.html` in your browser.

## Event tracker usage
- Enter an **Event ID** and **Call Time**.
- Add one or more people with **Person Name** and **Add Person**.
- Click **Save Event** to store the event as `{ id, callTime, persons: [...] }`.
- Saved events persist in browser `localStorage` under the `events` key and are reloaded automatically on page load.
- You can remove people from the current list before saving, and delete saved events from the table.
