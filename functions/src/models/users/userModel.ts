export type User = {
  userId: string;
  email?: string;
  fullName?: {
    firstName: string;
    lastName: string;
  };
  phoneNumber?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  dateOfBirth?: {
    day: number;
    month: number;
    year: number;
  };
  userType?: 'renter' | 'host';
  createdAt: string;
};
