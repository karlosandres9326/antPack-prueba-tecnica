export interface UserI {
  id: string;
  name: string;
  username: string;
  email: string;
  address: AddressI;
  phone: string;
  website: string;
  company: CompanyI;
}

export interface AddressI {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoI;
}

export interface GeoI {
  lat: string;
  lng: string;
}

export interface CompanyI {
  name: string;
  catchPhrase: string;
  bs: string;
}
