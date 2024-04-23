import { Response } from 'express';
import { firestore } from '../../index';
import { Trailer } from '../../models/trailers/trailerModel';

type Request = {
  body: Trailer;
};

const createTrailer = async (request: Request, response: Response) => {
  try {
    const trailerData = request.body;

    const newTrailerRef = await firestore
      .collection('trailers')
      .add(trailerData);
    const newTrailerId = newTrailerRef.id;

    await newTrailerRef.update({ trailerId: newTrailerId });

    const updatedTrailerDoc = await newTrailerRef.get();
    const updatedTrailerData = updatedTrailerDoc.data() as Trailer;

    return response.status(201).json({
      trailer: updatedTrailerData,
      message: 'Trailer created successfully.',
    });
  } catch (error) {
    console.error('Error creating trailer: ', error);
    return response.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export { createTrailer };
