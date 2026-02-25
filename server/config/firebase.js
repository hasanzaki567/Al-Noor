const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

let initialized = false;
try {
  // Try service account from env JSON string
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    initialized = true;
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS && fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    // Path to JSON credentials
    const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const serviceAccount = require(keyPath);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    initialized = true;
  } else {
    // Check for local service account file in project config
    const possible = path.join(__dirname, 'serviceAccountKey.json');
    if (fs.existsSync(possible)) {
      const serviceAccount = require(possible);
      admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
      initialized = true;
    }
  }

  if (!initialized) {
    // Initialize without explicit credentials (use ADC or emulator if available)
    admin.initializeApp();
  }

} catch (err) {
  // If initialization fails, log and still export admin to avoid crashes.
  // Firestore calls will fail later with a clearer error about credentials.
  // eslint-disable-next-line no-console
  console.error('Firebase admin init error:', err.message || err);
  try { admin.initializeApp(); } catch (e) { /* ignore */ }
}

const db = admin.firestore();

module.exports = { admin, db };
