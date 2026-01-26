export interface ISupplierProduct {
  id: string;
  supplierId: string;
  brand: string;
  code: string;
  model: string;
  description: string;
  category: string;
  lastUpdate: Date;
  price: number;
  suggestedPrice: number;
  suggestedWebPrice: number;
  stockAvailable: string;
  barcode: string;
  currency: string;
  taxRate: number;
}
