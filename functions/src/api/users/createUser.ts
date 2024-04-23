import * as functions from 'firebase-functions';
import { firestore } from '../../index';
import { User } from '../../models/users/userModel';

const createUser = functions.auth.user().onCreate(async (user) => {
  try {
    const {
      uid,
      email,
      metadata: { creationTime },
    } = user;

    const userData: User = {
      userId: uid,
      email,
      createdAt: creationTime,
    };

    await firestore.collection('users').doc(uid).set(userData);

    return {
      user: userData,
    };
  } catch (error) {
    console.error('Error creating user: ', error);
    throw error;
  }
});

export { createUser };
