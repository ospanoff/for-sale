# Platform for selling old items

"For sale" is a frontend app, that uses Firebase as a backend, for selling/giving away old items.
It's based on the auction system, where people can bid their best prices.

# Development

This project was created using `create-react-app`. For more info go to [their website](https://create-react-app.dev/).

## Config file

Put your config file to `src/config.ts` with the next template:

```typescript
// You can get this in your firebase project
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  databaseUrl: "https://PROJECT_ID-default-rtdb.REGION.firebasedatabase.app/",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

export default firebaseConfig;

export const EMAIL_DOMAIN = "DOMAIN_TO_RESTRICT_LOG_INS";
export const ADMIN_EMAIL = "EMAIL_OF_ADMIN";
```
