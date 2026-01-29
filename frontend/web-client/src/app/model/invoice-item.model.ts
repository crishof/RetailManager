export interface IInvoiceItem {
  id: string;
  brandName: string;
  model: string;
  description: string;
  price: number;
  taxRate: number;
  discountRate: number;
  quantity: number;
}
