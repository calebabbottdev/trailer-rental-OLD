import { Response } from 'express';
import { firestore } from '../../index';
import { Trailer } from '../../models/trailers/trailerModel';

const getAllTrailers = async (request: unknown, response: Response) => {
  try {
    const querySnapshot = await firestore.collection('trailers').get();
    const trailers: Trailer[] = [];

    querySnapshot.forEach((doc) => {
      const trailerData = doc.data() as Trailer;
      trailers.push(trailerData);
    });

    return response.status(200).json({
      trailers,
      length: trailers.length,
    });
  } catch (error) {
    console.error('Error fetching trailers: ', error);
    return response.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export { getAllTrailers };
