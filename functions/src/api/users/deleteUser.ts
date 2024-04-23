import * as functions from 'firebase-functions';
import { firestore } from '../../index';

const deleteUser = functions.auth.user().onDelete(async (user) => {
  try {
    const { uid } = user;
    await firestore.collection('users').doc(uid).delete();
  } catch (error) {
    console.error('Error deleting user: ', error);
  }
});

export { deleteUser };
