import { ILocation } from './location.model';

export interface IBranch {
  id: string;
  code: string;
  name: string;
  address?: string;
  active: boolean;
  locations: ILocation[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IBranchRequest {
  code: string;
  name: string;
  address?: string;
  active: boolean;
}
