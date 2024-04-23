import { Response } from 'express';
import { firestore } from '../../index';
import { Trailer } from '../../models/trailers/trailerModel';

type Request = {
  params: { trailerId: string };
  body: RequestBody;
};

type RequestBody = {
  [key: string]: unknown;
  type: string;
  searchableTerms: string[];
};

const updateTrailer = async (request: Request, response: Response) => {
  try {
    const { trailerId } = request.params;
    const updateData: RequestBody = request.body;

    if (!trailerId) {
      return response.status(400).json({
        message: 'trailerId is required.',
      });
    }

    // TODO: Finish code for retrieving result for single
    // trailer, and store searchableTerms to attach to
    // updateData if type or city is in request body

    // const searchableTerms = [];
    // if (updateData.type) {
    //   searchableTerms.push(updateData.type.toLowerCase());
    // }

    await firestore.collection('trailers').doc(trailerId).update(updateData);

    const updatedTrailerDoc = await firestore
      .collection('trailers')
      .doc(trailerId)
      .get();
    const updatedTrailerData = updatedTrailerDoc.data() as Trailer;

    return response.status(200).json({
      user: updatedTrailerData,
      message: 'Trailer updated successfully.',
    });
  } catch (error) {
    console.error('Error updating trailer: ', error);
    return response.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export { updateTrailer };
