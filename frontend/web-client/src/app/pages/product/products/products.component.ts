import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../model/product.model';
import { Router } from '@angular/router';
import { BrandService } from '../../../services/brand.service';
import { Observable, Subscription, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductNavbarComponent } from '../product-navbar/product-navbar.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { IStock } from '../../../model/stock.model';
import { SupplierPriceListService } from '../../../services/supplier-price-list.service';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductSearchComponent } from '../product-search/product-search.component';

@Component({
    selector: 'app-products',
    imports: [
        CommonModule,
        ProductNavbarComponent,
        ProductListComponent,
        ProductSearchComponent,
        ProductDetailsComponent,
        FormsModule,
    ],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private _productService = inject(ProductService);
  private _brandService = inject(BrandService);
  private _supplierPriceListService = inject(SupplierPriceListService);
  private _router = inject(Router);

  private subscription?: Subscription;

  ngOnInit(): void {}

  productList: IProduct[] = [];
  brandName: string = '';
  searchTerm: string = '';
  isFormSubmitted: boolean = false;

  selectedComponent: string = 'product';
  selectedProduct: IProduct | null = null;

  totalQuantity: number = 0;
  loading: boolean = false;

  handleSearch(searchTerm: string): void {
    this.isFormSubmitted = true;
    if (searchTerm.length >= 3) {
      this.searchProducts(searchTerm);
    } else {
      this.productList = [];
    }
  }

  handleSearchWithStock(searchTerm: string): void {
    this.isFormSubmitted = true;
    if (searchTerm.length >= 3) {
      this.searchProductsWithStock(searchTerm);
    } else {
      this.productList = [];
    }
  }

  getBrandName(brandId: string): Observable<string> {
    return this._brandService
      .getBrand(brandId)
      .pipe(map((brand) => brand.name));
  }

  searchProducts(searchTerm: string): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this._productService
      .getAllByFilter(searchTerm)
      .subscribe({
        next: (data: IProduct[]) => {
          this.productList = data;
        },
        error: (err) => {
          console.error('Failed to load products', err);
        },
      });
  }

  searchProductsWithStock(searchTerm: string): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this._productService
      .getAllByFilterAndStock(searchTerm)
      .subscribe({
        next: (data: IProduct[]) => {
          this.productList = data;
        },
        error: (err) => {
          console.error('Failed to load products', err);
        },
      });
  }

  selectProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  navegate(id: string): void {
    this._router.navigate(['/products', id]);
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

  isPriceUpToDate(
    supplierProductId: string,
    purchasePrice: number
  ): Observable<boolean> {
    return this._supplierPriceListService
      .getSupplierProductById(supplierProductId)
      .pipe(
        map((supplierProduct) => supplierProduct.price === purchasePrice),
        catchError((err) => {
          console.error('Error fetching supplier product', err);
          return of(false); // Retorna false en caso de error
        })
      );
  }
}
