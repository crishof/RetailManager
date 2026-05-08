import { IInvoiceItem } from './invoice-item.model';

export interface ICustomerInvoice {
  id?: string;
  customerId?: string;
  branchId: string;
  locationId: string;
  invoiceDate: string;
  invoiceType: string;
  invoicePrefix: number | string;
  invoiceNumber: number | string;
  observations?: string;
  invoiceItemsRequest: IInvoiceItem[];
  subtotal1: number;
  discount: number;
  interest: number;
  subtotal2: number;
  netValue0: number;
  netValue105: number;
  netValue21: number;
  netValue27: number;
  vat105: number;
  vat21: number;
  vat27: number;
  internalTax: number;
  withholdingVat: number;
  withholdingSuss: number;
  withholdingGrossReceiptsTax: number;
  withholdingIncome: number;
  stateTax: number;
  localTax: number;
  rounding: number;
  totalPrice: number;
  saleDate?: string;
  saleType?: string;
  saleNumber?: string;
  items?: IInvoiceItem[];
}
