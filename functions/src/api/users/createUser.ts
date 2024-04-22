import * as functions from 'firebase-functions';
import { firestore } from '../../index';
import { User } from '../../models/users/userModel';

export const createUser = functions.auth.user().onCreate(async (user) => {
  try {
    const {
      uid,
      displayName,
      email,
      metadata: { creationTime },
    } = user;

    const userData: User = {
      userId: uid,
      name: displayName || '',
      email: email || '',
      createdAt: creationTime,
    };

    await firestore.collection('users').doc(uid).set(userData);

    console.log('User created: ', userData);
    return {
      user: userData,
    };
  } catch (error) {
    console.error('Error creating user: ', error);
    throw error;
  }
});
