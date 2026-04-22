import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IProduct } from '../../../model/product.model';
import { IStock } from '../../../model/stock.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnChanges {
  @Input() product: IProduct | null = null;

  activeTab:
    | 'ficha'
    | 'precios'
    | 'stock'
    | 'proveedor'
    | 'codigos'
    | 'varios'
    | 'tarjetas'
    | 'especificaciones' = 'ficha';

  ngOnChanges(): void {
    this.activeTab = 'ficha';
  }

  get imageUrls(): string[] {
    const images = (this.product as { imageId?: unknown } | null)?.imageId;
    return Array.isArray(images) ? images.filter((image): image is string => typeof image === 'string') : [];
  }

  get stocks(): IStock[] {
    const stocks = (this.product as { stockResponses?: unknown } | null)?.stockResponses;
    return Array.isArray(stocks) ? stocks : [];
  }

  get sellingPrice(): number {
    return (this.product as { priceResponse?: { sellingPrice?: number } } | null)?.priceResponse?.sellingPrice ?? 0;
  }

  get taxRate(): number {
    return (this.product as { priceResponse?: { taxRate?: number } } | null)?.priceResponse?.taxRate ?? 0;
  }

  get discount(): number {
    return (this.product as { priceResponse?: { discount?: number } } | null)?.priceResponse?.discount ?? 0;
  }

  get totalStock(): number {
    return this.stocks.reduce((a, s) => a + s.quantity, 0);
  }

  get stockStatus(): 'ok' | 'low' | 'out' {
    if (this.totalStock <= 0) return 'out';
    const min = this.stocks[0]?.min ?? 0;
    return this.totalStock <= min ? 'low' : 'ok';
  }

  get priceWithTax(): number {
    return this.sellingPrice * (1 + this.taxRate);
  }

  get purchasePrice(): number {
    return (this.product as { priceResponse?: { purchasePrice?: number } } | null)?.priceResponse?.purchasePrice ?? 0;
  }

  get margin(): number {
    if (!this.purchasePrice || !this.sellingPrice) return 0;
    return ((this.sellingPrice - this.purchasePrice) / this.purchasePrice) * 100;
  }

  stockBranches(stocks: IStock[]): { branch: string; qty: number; min: number; max: number }[] {
    return (stocks ?? []).map((s, i) => ({
      branch: s.branchId || `Sucursal ${i + 1}`,
      qty: s.quantity,
      min: s.min,
      max: s.max,
    }));
  }
}
