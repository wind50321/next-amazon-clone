import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

const app = !getApps().length
  ? initializeApp({ credential: cert(serviceAccount) })
  : getApp();

const db = getFirestore(app);

export default db;
