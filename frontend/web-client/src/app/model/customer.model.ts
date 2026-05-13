export interface ICustomer {
  id?: string;
  name: string;
  lastname: string;
  dni: string;
  taxId: string;
  email: string;
  phone: string;
  deleted?: boolean;
}
