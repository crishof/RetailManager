import { IPrice } from './price.model';
import { IStock } from './stock.model';

export interface IProduct {
  id: string;
  brandName: string;
  code: string;
  model: string;
  description: string;
  categoryName: string;
  supplierId: string;
  supplierProductId: string;
  hidden: boolean;
  imageId: string[];
  priceResponse: IPrice;
  dimensionId: string;
  stockResponses: IStock[];
  invoiceQuantity: number;
}
