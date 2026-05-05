export interface IInvoiceItem {
  id: string;
  type?: 'product' | 'concept';
  brandName: string;
  model: string;
  description: string;
  price: number;
  taxRate: number;
  internalTaxRate?: number;
  discountRate: number;
  quantity: number;
  boxes?: number;
  unitsPerBox?: number;
}
