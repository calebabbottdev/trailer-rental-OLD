import { Response } from 'express';
import { firestore } from '../../index';
import { Trailer } from '../../models/trailers/trailerModel';

type Request = {
  body: {
    type: Trailer['type'];
    address: Trailer['address'];
    dailyRate: Trailer['dailyRate'];
    userId: Trailer['owner']['ownerId'];
    firstName: Trailer['owner']['ownerName']['firstName'];
    lastName: Trailer['owner']['ownerName']['lastName'];
  };
};

const createTrailer = async (request: Request, response: Response) => {
  try {
    const { type, address, dailyRate, userId, firstName, lastName } =
      request.body;

    const trailerData = {
      type,
      address,
      dailyRate,
      owner: {
        ownerId: userId,
        ownerName: {
          firstName,
          lastName,
        },
      },
      searchableTerms: [address.city.toLowerCase(), type.toLowerCase()],
    };

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
