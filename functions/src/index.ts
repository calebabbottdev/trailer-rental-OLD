import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as express from 'express';

import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  createTrailer,
  getAllTrailers,
} from './api';

admin.initializeApp();
export const firestore = admin.firestore();

const app = express();

// Users
app.get('/users/get-all-users', getAllUsers);
app.patch('/users/update-user/:userId', updateUser);
export { createUser, deleteUser };

// Trailers
app.post('/trailers/create-trailer', createTrailer);
app.get('/trailers/get-all-trailers', getAllTrailers);

// Products

exports.api = functions.https.onRequest(app);
