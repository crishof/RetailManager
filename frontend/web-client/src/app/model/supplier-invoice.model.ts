import { IInvoiceItem } from './invoice-item.model';

export interface ISupplierInvoice {
  supplierId: string;
  invoiceType: string;
  invoiceDate: string;
  receptionDate: string;
  dueDate: string;
  savedDate: string;
  location: string;
  packingListNumber: string;
  invoiceNumber: number;
  saveStocks: boolean;
  taxSave: boolean;
  fixedAsset: boolean;
  askForPriceChange: boolean;
  observations: string;
  invoiceItems: IInvoiceItem[];
  discount: number;
  totalPrice: number;
  interest: number;
}
