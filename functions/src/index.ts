/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import * as admin from 'firebase-admin';
admin.initializeApp();

export const firestore = admin.firestore();

// import { getAllUsers } from './api/users/getAllUsers';

export { createUser } from './api/users/createUser';
export { getAllUsers } from './api/users/getAllUsers';
export { updateUser } from './api/users/updateUser';
export { deleteUser } from './api/users/deleteUser';

// export { getAllUsers };
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
