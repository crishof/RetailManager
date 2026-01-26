import { ILocation } from './location.model';

export interface IBranch {
  id: string;
  name: string;
  locations: ILocation[];
}
