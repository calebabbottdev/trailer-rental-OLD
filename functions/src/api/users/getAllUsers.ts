import { Response } from 'express';
import { firestore } from '../../index';
import { User } from '../../models/users/userModel';

const getAllUsers = async (request: unknown, response: Response) => {
  try {
    const querySnapshot = await firestore.collection('users').get();
    const users: User[] = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data() as User;
      users.push(userData);
    });

    return response.status(200).json({
      users,
      length: users.length,
    });
  } catch (error) {
    console.error('Error fetching users: ', error);
    return response.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export { getAllUsers };
