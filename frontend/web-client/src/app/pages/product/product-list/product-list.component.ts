import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { IProduct } from '../../../model/product.model';
import { IStock } from '../../../model/stock.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-product-list',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  selectedProduct: IProduct | null = null;
  loading: boolean = false;
  @Input() productList: IProduct[] = [];
  @Input() selectionMode: 'click' | 'dblclick' = 'click';
  @Output() selectProduct = new EventEmitter<IProduct>();

  trackByProductId(index: number, product: IProduct): string {
  return product.id;
}
  onProductInteract(product: IProduct): void {
    this.selectProduct.emit(product);
  }

  getTotalStockQuantity(stocks: IStock[]): number {
    this.loading = true;
    const totalQuantity = stocks.reduce(
      (acc, stock) => acc + stock.quantity,
      0
    );
    this.loading = false;
    return totalQuantity;
  }

  onProductClick(product: IProduct): void {
    this.selectProduct.emit(product);
  }
  onProductDblClick(product: IProduct): void {
    this.selectProduct.emit(product);
  }
}
