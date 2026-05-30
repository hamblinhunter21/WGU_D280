export interface CountryResponse {
  id: string;
  name: string;
  capitalCity: string;
  region: {
    value: string;
  };
  incomeLevel: {
    value: string;
  };
  latitude: string;
  longitude: string;
}
