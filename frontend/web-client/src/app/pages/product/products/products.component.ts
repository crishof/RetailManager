import { Component, HostListener, inject, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { IProduct } from "../../../model/product.model";
import { ProductService } from "../../../services/product.service";
import { ProductNavbarComponent } from "../product-navbar/product-navbar.component";
import { ProductListComponent } from "../product-list/product-list.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";

type ProductColumnKey =
  | "id"
  | "code"
  | "brand"
  | "model"
  | "description"
  | "category"
  | "tax"
  | "price"
  | "stock";

interface ProductColumnOption {
  key: ProductColumnKey;
  label: string;
}

@Component({
  selector: "app-products",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductNavbarComponent,
    ProductListComponent,
    ProductDetailsComponent,
  ],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.css",
})
export class ProductsComponent implements OnDestroy {
  private static readonly COLUMNS_STORAGE_KEY = "products.visible-columns";
  private readonly _productService = inject(ProductService);
  private readonly _router = inject(Router);
  private subscription?: Subscription;

  productList: IProduct[] = [];
  selectedProduct: IProduct | null = null;
  searchTerm = "";
  isFormSubmitted = false;
  loading = false;
  filterStock = false;
  columnPickerOpen = false;
  readonly columnOptions: ProductColumnOption[] = [
    { key: "id", label: "#Id" },
    { key: "code", label: "Código" },
    { key: "brand", label: "Marca" },
    { key: "model", label: "Modelo" },
    { key: "description", label: "Descripción" },
    { key: "category", label: "Categoría" },
    { key: "tax", label: "IVA" },
    { key: "price", label: "Precio" },
    { key: "stock", label: "Stock" },
  ];
  visibleColumns: ProductColumnKey[] = this.loadVisibleColumns();

  // ── Búsqueda ──────────────────────────────────────────
  handleSearch(term: string): void {
    this.isFormSubmitted = true;
    if (term.trim().length >= 3) {
      this.runSearch(term.trim());
    } else {
      this.productList = [];
    }
  }

  onSearchInput(): void {
    if (this.searchTerm.length === 0) {
      this.productList = [];
      this.isFormSubmitted = false;
    }
  }

  clearSearch(): void {
    this.searchTerm = "";
    this.productList = [];
    this.isFormSubmitted = false;
    this.selectedProduct = null;
  }

  toggleStockFilter(): void {
    this.filterStock = !this.filterStock;
    if (this.searchTerm.trim().length >= 3) {
      this.runSearch(this.searchTerm.trim());
    }
  }

  toggleColumnPicker(event: MouseEvent): void {
    event.stopPropagation();
    this.columnPickerOpen = !this.columnPickerOpen;
  }

  closeColumnPicker(): void {
    this.columnPickerOpen = false;
  }

  isColumnVisible(column: ProductColumnKey): boolean {
    return this.visibleColumns.includes(column);
  }

  onColumnVisibilityChange(column: ProductColumnKey, event: Event): void {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    if (checked) {
      if (!this.visibleColumns.includes(column)) {
        this.visibleColumns = [...this.visibleColumns, column];
      }
      this.persistVisibleColumns();
      return;
    }

    if (this.visibleColumns.length <= 1) {
      target.checked = true;
      return;
    }

    this.visibleColumns = this.visibleColumns.filter((c) => c !== column);
    this.persistVisibleColumns();
  }

  showAllColumns(event: MouseEvent): void {
    event.stopPropagation();
    this.visibleColumns = this.columnOptions.map((c) => c.key);
    this.persistVisibleColumns();
  }

  resetColumns(event: MouseEvent): void {
    event.stopPropagation();
    this.visibleColumns = this.columnOptions.map((c) => c.key);
    this.persistVisibleColumns();
  }

  private runSearch(term: string): void {
    this.loading = true;
    this.subscription?.unsubscribe();
    this.subscription = this._productService
      .getProducts({ search: term, inStock: this.filterStock || undefined, page: 0, size: 50 })
      .subscribe({
        next: (page) => { this.productList = page.content; this.loading = false; },
        error: (err) => { console.error(err); this.loading = false; },
      });
  }

  private loadVisibleColumns(): ProductColumnKey[] {
    const allColumns = this.columnOptions.map((c) => c.key);
    try {
      const raw = localStorage.getItem(ProductsComponent.COLUMNS_STORAGE_KEY);
      if (!raw) return allColumns;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return allColumns;

      const valid = parsed.filter((value): value is ProductColumnKey =>
        allColumns.includes(value as ProductColumnKey),
      );

      return valid.length > 0 ? valid : allColumns;
    } catch {
      return allColumns;
    }
  }

  private persistVisibleColumns(): void {
    localStorage.setItem(
      ProductsComponent.COLUMNS_STORAGE_KEY,
      JSON.stringify(this.visibleColumns),
    );
  }

  // ── Selección ─────────────────────────────────────────
  selectProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  // ── Acciones toolbar ──────────────────────────────────
  navigateNew(): void {
    this._router.navigate(["/products/new"]);
  }

  navigateEdit(): void {
    if (this.selectedProduct) {
      this._router.navigate(["/products", this.selectedProduct.id, "edit"]);
    }
  }

  confirmDelete(): void {
    if (!this.selectedProduct) return;
    // Placeholder — integrar con dialog de confirmación
    console.warn("Delete product:", this.selectedProduct.id);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener("document:click")
  onDocumentClick(): void {
    if (this.columnPickerOpen) {
      this.closeColumnPicker();
    }
  }
}
