import { IInvoiceItem } from './invoice-item.model';

export interface IOtherConcept {
  description: string;
  price: number;
  taxRate: number;
  internalTaxRate: number;
  discountRate: number;
}

export interface ISupplierInvoice {
  id?: string;
  supplierId: string;
  invoiceType: string;
  invoiceDate: string;
  receptionDate: string;
  savedDate: string;
  invoicePrefix: number;
  invoiceNumber: number;
  packingListPrefix?: number;
  packingListNumber?: number;
  packingListNumbers?: string[];
  branchId: string;
  locationId: string;
  observations: string;
  invoiceItemsRequest: IInvoiceItem[];
  otherConcepts: IOtherConcept[];
  saveStocks: boolean;
  discount: number;
  interest: number;
  subtotal1: number;
  subtotal2: number;
  vat21: number;
  vat105: number;
  vat27: number;
  internalTax: number;
  rounding: number;
  totalPrice: number;
}
