import { Response } from 'express';
import { firestore } from '../../index';
import { Trailer } from '../../models/trailers/trailerModel';

type Request = {
  params: { trailerId: string };
};

const getTrailerById = async (request: Request, response: Response) => {
  try {
    const { trailerId } = request.params;

    const documentSnapshot = await firestore
      .collection('trailers')
      .doc(trailerId)
      .get();

    if (!documentSnapshot.exists) {
      return response.status(404).json({
        message: 'Trailer not found.',
      });
    }

    const trailer = documentSnapshot.data() as Trailer;

    return response.status(200).json({
      trailer,
      message: 'Trailer found.',
    });
  } catch (error) {
    console.error('Error fetching trailers: ', error);
    return response.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export { getTrailerById };
