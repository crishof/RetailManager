import { Component, inject } from "@angular/core";
import { ProductService } from "../../../services/product.service";
import { CommonModule } from "@angular/common";
import { IProduct } from "../../../model/product.model";
import { Router } from "@angular/router";
import { BrandService } from "../../../services/brand.service";
import { Observable, Subscription, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ProductNavbarComponent } from "../product-navbar/product-navbar.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { FormsModule } from "@angular/forms";
import { IStock } from "../../../model/stock.model";
import { SupplierPriceListService } from "../../../services/supplier-price-list.service";
import { ProductListComponent } from "../product-list/product-list.component";
import { ProductSearchComponent } from "../product-search/product-search.component";

@Component({
  selector: "app-products",
  imports: [
    CommonModule,
    ProductNavbarComponent,
    ProductListComponent,
    ProductSearchComponent,
    ProductDetailsComponent,
    FormsModule,
  ],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.css",
})
export class ProductsComponent {
  private readonly _productService = inject(ProductService);
  private readonly _brandService = inject(BrandService);
  private readonly _supplierPriceListService = inject(SupplierPriceListService);
  private readonly _router = inject(Router);

  private subscription?: Subscription;

  productList: IProduct[] = [];
  brandName: string = "";
  searchTerm: string = "";
  isFormSubmitted: boolean = false;

  selectedComponent: string = "product";
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

  private loadProducts(params: { search?: string; inStock?: boolean }): void {
    this.subscription?.unsubscribe();

    this.subscription = this._productService
      .getProducts({ ...params, page: 0, size: 20 })
      .subscribe({
        next: (page) => (this.productList = page.content),
        error: (err) => console.error(err),
      });
  }

  searchProducts(term: string) {
    this.loadProducts({ search: term });
  }

  searchProductsWithStock(term: string) {
    this.loadProducts({ search: term, inStock: true });
  }

  selectProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  navegate(id: string): void {
    this._router.navigate(["/products", id]);
  }

  getTotalStockQuantity(stocks: IStock[]): number {
    this.loading = true;
    const totalQuantity = stocks.reduce(
      (acc, stock) => acc + stock.quantity,
      0,
    );
    this.loading = false;
    return totalQuantity;
  }

  isPriceUpToDate(
    supplierProductId: string,
    purchasePrice: number,
  ): Observable<boolean> {
    return this._supplierPriceListService.getById(supplierProductId).pipe(
      map((supplierProduct) => supplierProduct.price === purchasePrice),
      catchError((err) => {
        console.error("Error fetching supplier product", err);
        return of(false); // Retorna false en caso de error
      }),
    );
  }
}
