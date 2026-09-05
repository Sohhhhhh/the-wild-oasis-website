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
