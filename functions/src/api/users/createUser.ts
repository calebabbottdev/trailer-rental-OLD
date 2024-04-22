import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

const firestore = admin.firestore();

export const createUser = functions.auth.user().onCreate(async (user) => {
  try {
    // Extract user data from the Authentication user object
    const { uid, displayName, email } = user;

    // Create a new user document in Firestore
    await firestore
      .collection('users')
      .doc(uid)
      .set({
        userId: uid,
        name: displayName || '',
        email: email || '',
        // Add any additional fields here
      });

    console.log('User created:', user.uid);
  } catch (error) {
    console.error('Error creating user:', error);
  }
});
