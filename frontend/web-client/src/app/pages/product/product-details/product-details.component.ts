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

  get totalStock(): number {
    return this.product?.stockResponses?.reduce((a, s) => a + s.quantity, 0) ?? 0;
  }

  get stockStatus(): 'ok' | 'low' | 'out' {
    if (this.totalStock <= 0) return 'out';
    const min = this.product?.stockResponses?.[0]?.min ?? 0;
    return this.totalStock <= min ? 'low' : 'ok';
  }

  get priceWithTax(): number {
    const p = this.product?.priceResponse;
    if (!p) return 0;
    return p.sellingPrice * (1 + p.taxRate);
  }

  get purchasePrice(): number {
    return this.product?.priceResponse?.purchasePrice ?? 0;
  }

  get margin(): number {
    if (!this.purchasePrice || !this.product?.priceResponse?.sellingPrice) return 0;
    return ((this.product.priceResponse.sellingPrice - this.purchasePrice) / this.purchasePrice) * 100;
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
