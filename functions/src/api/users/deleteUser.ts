import * as functions from 'firebase-functions';
import { firestore } from '../../index';

export const deleteUser = functions.auth.user().onDelete(async (user) => {
  try {
    const { uid } = user;
    await firestore.collection('users').doc(uid).delete();

    console.log('User deleted: ', uid);

    // return {
    //   message: 'User was deleted.',
    // };
  } catch (error) {
    console.error('Error deleting user: ', error);
  }
});
