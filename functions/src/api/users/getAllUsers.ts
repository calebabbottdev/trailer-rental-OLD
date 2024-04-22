import * as functions from 'firebase-functions';
import { firestore } from '../../index';
import { User } from '../../models/users/userModel';

export const getAllUsers = functions.https.onRequest(
  async (request, response): Promise<void> => {
    try {
      const querySnapshot = await firestore.collection('users').get();
      const users: User[] = [];

      querySnapshot.forEach((doc) => {
        const userData = doc.data() as User;
        users.push(userData);
      });

      response.status(200).json({
        users,
        length: users.length,
      });
    } catch (error) {
      console.error('Error fetching users: ', error);
      response.status(500).send('Internal Server Error');
    }
  }
);