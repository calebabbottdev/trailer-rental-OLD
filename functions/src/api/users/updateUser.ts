import { Response } from 'express';
import { firestore } from '../../index';
import { User } from '../../models/users/userModel';

type Request = {
  params: { userId: string };
  body: RequestBody;
};

type RequestBody = {
  [key: string]: unknown;
};

const updateUser = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params;
    const updateData: RequestBody = request.body;

    if (!userId) {
      return response.status(400).json({
        message: 'userId is required.',
      });
    }

    await firestore.collection('users').doc(userId).update(updateData);

    const updatedUserDoc = await firestore
      .collection('users')
      .doc(userId)
      .get();
    const updatedUserData = updatedUserDoc.data() as User;

    return response.status(200).json({
      user: updatedUserData,
      message: 'User updated successfully.',
    });
  } catch (error) {
    console.error('Error updating user: ', error);
    return response.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export { updateUser };
