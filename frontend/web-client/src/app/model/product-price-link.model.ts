export type PriceChangeStatus = 'NEW' | 'SAME' | 'UP' | 'DOWN';

export interface IProductPriceLink {
  id: string;
  supplierProductId: string;
  productId: string;
  productName: string;
  supplierCode?: string;
  lastImportedPrice?: number;
  priceChangeStatus: PriceChangeStatus;
  previousImportedPrice?: number;
  lastPriceChangeAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProductPriceHistory {
  id: string;
  linkId: string;
  priceFrom?: number;
  priceTo?: number;
  changePercent?: number;
  changeType: PriceChangeStatus;
  importedAt?: string;
  recordedAt?: string;
}
