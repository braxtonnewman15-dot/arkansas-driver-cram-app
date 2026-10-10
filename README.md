# Arkansas Driver Exam Prep — Free iPhone Web App

This package turns the 2026 Arkansas Driver Knowledge Exam interactive cram course into an installable Progressive Web App (PWA). It does **not** require the Apple App Store or a paid Apple Developer membership. You can host it free with GitHub Pages and add it to an iPhone Home Screen from Safari.

## Files included

- `index.html` — the full interactive study course, quizzes, flashcards, lesson checklist, and audio links
- `manifest.webmanifest` — app name, colors, display mode, and icon definitions
- `sw.js` — service worker that caches the core course for offline use after first loading online
- `icons/` — app icons for browsers and iOS Home Screen

## Publish it for free with GitHub Pages

A local HTML file cannot be installed to the iPhone Home Screen as a web app directly. It needs to be served from an HTTPS website. GitHub Pages can host static HTML sites free from a public repository on GitHub Free.

1. Sign in or create a GitHub account at <https://github.com/>.
2. Select **New repository**. Name it `arkansas-driver-prep` and set it to **Public** (GitHub Pages on the free plan is available for public repositories). Do not upload personal or private information to this repository.
3. Open the new repository and choose **Add file → Upload files**.
4. Upload the contents of this folder so the repository root contains `index.html`, `manifest.webmanifest`, `sw.js`, and the `icons` folder. Do not upload the ZIP alone.
5. Commit the uploaded files to the `main` branch.
6. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select branch `main` and folder `/(root)`, then save.
7. Once GitHub Pages publishes the site, the address will look like `https://YOUR-USERNAME.github.io/arkansas-driver-prep/`. Use the exact URL shown on the repository's Pages settings screen.

## Add it to your iPhone Home Screen

1. On the iPhone, open **Safari** (not an in-app browser) and visit your published HTTPS URL.
2. Tap **Share**.
3. Scroll and tap **Add to Home Screen**. If the option is missing, scroll to **Edit Actions** and add it.
4. Turn on **Open as Web App** if that option appears.
5. Tap **Add**. Use the new icon on your Home Screen to launch the course like an app.

Official Apple instructions: <https://support.apple.com/en-jo/guide/iphone/iphea86e5236/ios>

## Offline behavior and limitations

- After the first successful online load, the app shell and study course are cached by the service worker. Visit the app once while connected before relying on offline use.
- Audio MP3s and external state resources (official manual and practice test) are hosted by other websites and require internet access.
- Lesson progress uses browser local storage. It is saved on the device/browser where you use the app; it does not automatically sync to other devices.
- Updates to this website may take a refresh or two to appear after a service-worker update.
- This is a Home Screen web app, not a native App Store app. App Store distribution through Apple's Developer Program has an annual membership fee; this free option avoids that requirement.

## Important study note

This is a condensed study aid, not an official Arkansas State Police product and not a word-for-word replacement for the state's study guide. Use the current official manual and official practice test to confirm legal details.
