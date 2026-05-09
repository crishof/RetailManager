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
  location: string;
  invoiceType: string;
  invoiceDate: string;
  dueDate: string;
  receptionDate: string;
  savedDate: string;
  invoicePrefix: string;
  invoiceNumber: string;
  packingListPrefix?: string;
  packingListNumber?: string;
  packingListNumbers?: string[];
  branchId: string;
  locationId: string;
  observations: string;
  invoiceItemsRequest: IInvoiceItem[];
  otherConcepts: IOtherConcept[];
  saveStocks: boolean;
  taxSave: boolean;
  fixedAsset: boolean;
  askForPriceUpdate: boolean;
  discount: number;
  interest: number;
  subtotal1: number;
  subtotal2: number;
  netValue21: number;
  vat21: number;
  netValue105: number;
  vat105: number;
  netValue27: number;
  vat27: number;
  netValue0: number;
  internalTax: number;
  withholdingVat: number;
  withholdingSuss: number;
  withholdingGrossReceiptsTax: number;
  withholdingIncome: number;
  stateTax: number;
  localTax: number;
  rounding: number;
  totalPrice: number;
}
