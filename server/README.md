# Server README

This folder contains the backend server for Al Noor Academy.

OAuth setup
---------

Required environment variables for Google and Apple OAuth:

- `GOOGLE_CLIENT_ID` - Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth Client Secret
- `APPLE_CLIENT_ID` - Apple Service ID (Client ID)
- `APPLE_TEAM_ID` - Apple Developer Team ID
- `APPLE_KEY_ID` - Apple Key ID
- `APPLE_PRIVATE_KEY_PATH` - Path to the Apple private key (`.p8`) file
- `SERVER_URL` - Public server URL (e.g., `https://your-domain.com`) used for callback URLs

Notes:
- Install new dependencies in `server` folder: `npm install` or `npm install passport-google-oauth20 passport-apple`
- Apple sign-in requires configuring keys and service IDs in Apple Developer portal.
