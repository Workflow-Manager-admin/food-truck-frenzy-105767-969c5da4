# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

**API Integrations:**

- **Pixabay (food images)** and **Freepik (illustrations)** APIs are integrated via:
  - `src/api/pixabay.js` for food-related image search (see `fetchPixabayImages(query)`).
  - `src/api/freepik.js` for illustration search (see `fetchFreepikIllustrations(query)`).
  - Configure API keys via environment in `.env` (see `.env.example` or below).

- **Firebase** powers authentication (Google Sign-In) & storage via:
  - `src/services/firebase.js` (see `signInWithGoogle`, `auth`, `storage`, etc.)
  - Configure your Firebase credentials via `.env`.

**Environment Variables:**

Copy `.env` as template and set your keys:
```
REACT_APP_PIXABAY_API_KEY=your-key
REACT_APP_FREEPIK_API_KEY=your-key

REACT_APP_FIREBASE_API_KEY=your-firebase-key
REACT_APP_FIREBASE_AUTH_DOMAIN=yourapp.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-id
REACT_APP_FIREBASE_STORAGE_BUCKET=yourapp.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123
REACT_APP_FIREBASE_APP_ID=1:xxx
REACT_APP_FIREBASE_MEASUREMENT_ID=G-xxxxxx
```
**Never commit secrets to source control!**

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
