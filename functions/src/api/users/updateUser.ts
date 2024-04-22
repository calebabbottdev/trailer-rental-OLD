import * as functions from 'firebase-functions';
import { firestore } from '../../index';
import { User } from '../../models/users/userModel';

export const updateUser = functions.https.onRequest(
  async (request, response): Promise<void> => {
    try {
      const { userId, name, email } = request.body;

      if (!userId) {
        response.status(400).json({
          messsage: 'User was not updated.',
        });
        return;
      }

      await firestore.collection('users').doc(userId).update({
        name,
        email,
      });

      const updatedUserDoc = await firestore
        .collection('users')
        .doc(userId)
        .get();
      const updatedUserData = updatedUserDoc.data() as User;

      response.status(200).json({
        user: updatedUserData,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      response.status(500).send('Internal Server Error');
    }
  }
);
