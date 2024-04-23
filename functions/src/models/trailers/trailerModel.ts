export type Trailer = {
  trailerId?: string;
  type: 'landscaping' | 'dump' | 'enclosed';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  dailyRate: number;
  owner: {
    ownerId: string;
    ownerName: {
      firstName: string;
      lastName: string;
    };
  };
  searchableTerms: [];
  createdAt: string;
};
