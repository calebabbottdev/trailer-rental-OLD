import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as express from 'express';

import { createUser, getAllUsers, updateUser, deleteUser } from './api';

admin.initializeApp();
export const firestore = admin.firestore();

const app = express();

// Users
app.get('/users/get-all-users', getAllUsers);
app.patch('/users/update-user/:userId', updateUser);
export { createUser, deleteUser };

// Trailers

// Products

exports.api = functions.https.onRequest(app);
