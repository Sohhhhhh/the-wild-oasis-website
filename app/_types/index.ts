export type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
};

export type Country = {
  flag: { emoji: string };
  name: { common: string };
};

export type FixedCountry = {
  emoji: string;
  name: string;
};

export type Settings = {
  minBookingLength: number;
  maxBookingLength: number;
};

export type Guest = {
  id: number;
  fullName: string;
  email: string;
  nationalID: string;
  nationality: string;
  countryFlag: string;
};

export type Booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
  cabins: {
    name: string;
    image: any;
  } | null;
};

export type BookingSumm = Pick<
  Booking,
  | 'id'
  | 'created_at'
  | 'startDate'
  | 'endDate'
  | 'numNights'
  | 'numGuests'
  | 'totalPrice'
  | 'guestId'
  | 'cabinId'
  | 'cabins'
>;
