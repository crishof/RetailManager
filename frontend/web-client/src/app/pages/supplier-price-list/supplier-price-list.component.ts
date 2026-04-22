import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { SupplierPriceListService } from "../../services/supplier-price-list.service";
import { HttpErrorResponse } from "@angular/common/http";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ISupplierProduct } from "../../model/supplierProduct";
import { SupplierService } from "../../services/supplier.service";
import { ISupplier } from "../../model/supplier.model";

type SortColumn =
  | "brand"
  | "code"
  | "model"
  | "category"
  | "price"
  | "suggestedPrice"
  | "lastUpdate";

type SortDirection = "asc" | "desc";

@Component({
  selector: "app-supplier-price-list",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./supplier-price-list.component.html",
  styleUrl: "./supplier-price-list.component.css",
})
export class SupplierPriceListComponent implements OnInit {
  private readonly priceListService = inject(SupplierPriceListService);
  private readonly supplierService = inject(SupplierService);
  private readonly fb = inject(FormBuilder);

  productList: ISupplierProduct[] = [];
  selectedProduct: ISupplierProduct | null = null;
  selectedProducts: ISupplierProduct[] = [];

  suppliers: ISupplier[] = [];
  brands: string[] = [];

  selectedSupplierId = "";
  selectedBrand = "";
  searchTerm = "";

  selectedFile: File | null = null;
  selectedFileName = "";
  loadingSearch = false;
  loadingImportSelection = false;
  loadingUpload = false;
  sortColumn: SortColumn = "brand";
  sortDirection: SortDirection = "asc";
  pageIndex = 0;
  pageSize = 20;
  readonly pageSizeOptions = [10, 20, 50, 100];

  errorMessage = "";
  successMessage = "";
  warningMessage = "";

  fileForm: FormGroup = this.fb.group({
    supplierId: ["", Validators.required],
    updateExistingProducts: [false],
  });

  // ============================
  // INIT
  // ============================
  ngOnInit(): void {
    this.loadSuppliers();
    this.loadBrands();
    this.searchProducts();
  }

  // ============================
  // FILE UPLOAD
  // ============================
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const lowerName = file.name.toLowerCase();
      const isExcel = lowerName.endsWith(".xlsx") || lowerName.endsWith(".xls");

      if (!isExcel) {
        this.selectedFile = null;
        this.selectedFileName = "";
        this.warningMessage = "El archivo debe ser Excel (.xlsx o .xls).";
        this.successMessage = "";
        this.errorMessage = "";
        return;
      }

      this.selectedFile = file;
      this.selectedFileName = file.name;
      this.warningMessage = "";
    }
  }

  uploadFile(event: Event): void {
    event.preventDefault();
    this.clearFeedback();

    if (!this.fileForm.valid || !this.selectedFile) {
      this.warningMessage = "Proveedor y archivo Excel son obligatorios.";
      return;
    }

    const { supplierId, updateExistingProducts } = this.fileForm.value;
    this.loadingUpload = true;

    this.priceListService
      .uploadFile(this.selectedFile, supplierId, updateExistingProducts)
      .subscribe({
        next: (response) => {
          this.successMessage =
            response.message ?? "Lista de precios importada correctamente.";
          this.selectedFile = null;
          this.selectedFileName = "";
          this.fileForm.patchValue({ updateExistingProducts: false });
          this.loadingUpload = false;
          this.searchProducts();
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage =
            error.error?.message || "No se pudo importar el archivo.";
          this.loadingUpload = false;
        },
      });
  }

  // ============================
  // SEARCH & FILTER
  // ============================
  searchProducts(): void {
    this.clearFeedback();
    this.loadingSearch = true;
    this.selectedProducts = [];

    this.priceListService
      .getAllByFilter(
        this.selectedSupplierId,
        this.selectedBrand,
        this.searchTerm,
      )
      .subscribe({
        next: (data) => {
          this.productList = data;
          this.selectedProduct = data[0] ?? null;
          this.pageIndex = 0;
          this.loadingSearch = false;
        },
        error: () => {
          this.errorMessage = "No se pudo cargar la lista de precios.";
          this.loadingSearch = false;
        },
      });
  }

  onSupplierChange(supplierId: string): void {
    this.selectedSupplierId = supplierId;
    this.selectedBrand = "";
    this.loadBrands();
    this.searchProducts();
  }

  onBrandChange(brand: string): void {
    this.selectedBrand = brand;
    this.searchProducts();
  }

  loadBrands(): void {
    const obs = this.selectedSupplierId
      ? this.priceListService.getBrands(this.selectedSupplierId)
      : this.priceListService.getBrands();

    obs.subscribe({
      next: (brands) => (this.brands = brands),
      error: () => (this.errorMessage = "No se pudieron cargar las marcas."),
    });
  }

  selectProduct(product: ISupplierProduct): void {
    this.selectedProduct = product;
  }

  // ============================
  // SELECTION
  // ============================
  toggleSelection(event: Event | null, product: ISupplierProduct): void {
    event?.stopPropagation();

    const index = this.selectedProducts.indexOf(product);
    index >= 0
      ? this.selectedProducts.splice(index, 1)
      : this.selectedProducts.push(product);
  }

  isSelected(product: ISupplierProduct): boolean {
    return this.selectedProducts.includes(product);
  }

  selectAllProducts(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (!checked) {
      this.selectedProducts = this.selectedProducts.filter(
        (selected) => !this.pagedProducts.some((visible) => visible.id === selected.id),
      );
      return;
    }

    const selectedIds = new Set(this.selectedProducts.map((p) => p.id));
    this.pagedProducts.forEach((product) => {
      if (!selectedIds.has(product.id)) {
        this.selectedProducts.push(product);
      }
    });
  }

  get allSelected(): boolean {
    return (
      this.pagedProducts.length > 0 &&
      this.pagedProducts.every((product) => this.isSelected(product))
    );
  }

  get sortedProducts(): ISupplierProduct[] {
    const sorted = [...this.productList];
    sorted.sort((a, b) => this.compareProducts(a, b));
    return sorted;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.productList.length / this.pageSize));
  }

  get pagedProducts(): ISupplierProduct[] {
    const start = this.pageIndex * this.pageSize;
    return this.sortedProducts.slice(start, start + this.pageSize);
  }

  get pageStart(): number {
    if (this.productList.length === 0) return 0;
    return this.pageIndex * this.pageSize + 1;
  }

  get pageEnd(): number {
    return Math.min((this.pageIndex + 1) * this.pageSize, this.productList.length);
  }

  sortBy(column: SortColumn): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      return;
    }

    this.sortColumn = column;
    this.sortDirection = "asc";
  }

  sortIcon(column: SortColumn): string {
    if (this.sortColumn !== column) return "unfold_more";
    return this.sortDirection === "asc" ? "north" : "south";
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = Number(pageSize);
    this.pageIndex = 0;
  }

  previousPage(): void {
    if (this.pageIndex === 0) return;
    this.pageIndex -= 1;
  }

  nextPage(): void {
    if (this.pageIndex >= this.totalPages - 1) return;
    this.pageIndex += 1;
  }

  // ============================
  // IMPORT PRODUCTS
  // ============================
  importSelectedProducts(): void {
    this.clearFeedback();
    if (!this.selectedProducts.length) {
      this.warningMessage = "Seleccioná al menos un producto para importar.";
      return;
    }

    this.loadingImportSelection = true;

    this.priceListService
      .importProductsFromSupplier(this.selectedProducts)
      .subscribe({
        next: (response) => {
          this.successMessage =
            response.message ?? "Productos importados correctamente.";
          this.selectedProducts = [];
          this.loadingImportSelection = false;
        },
        error: () => {
          this.errorMessage = "No se pudieron importar los productos seleccionados.";
          this.loadingImportSelection = false;
        },
      });
  }

  // ============================
  // SUPPLIERS
  // ============================
  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
      },
      error: () => (this.errorMessage = "No se pudieron cargar los proveedores."),
    });
  }

  trackByProductId(_: number, product: ISupplierProduct): string {
    return product.id;
  }

  supplierNameById(id: string): string {
    return this.suppliers.find((s) => s.id === id)?.name ?? "Proveedor no identificado";
  }

  private clearFeedback(): void {
    this.errorMessage = "";
    this.warningMessage = "";
    this.successMessage = "";
  }

  private compareProducts(a: ISupplierProduct, b: ISupplierProduct): number {
    const direction = this.sortDirection === "asc" ? 1 : -1;

    const aValue = this.extractSortValue(a, this.sortColumn);
    const bValue = this.extractSortValue(b, this.sortColumn);

    if (aValue < bValue) return -1 * direction;
    if (aValue > bValue) return 1 * direction;
    return 0;
  }

  private extractSortValue(product: ISupplierProduct, column: SortColumn): number | string {
    switch (column) {
      case "brand":
        return product.brand?.toLowerCase() ?? "";
      case "code":
        return product.code?.toLowerCase() ?? "";
      case "model":
        return product.model?.toLowerCase() ?? "";
      case "category":
        return product.category?.toLowerCase() ?? "";
      case "price":
        return product.price ?? 0;
      case "suggestedPrice":
        return product.suggestedPrice ?? 0;
      case "lastUpdate":
        return new Date(product.lastUpdate).getTime() || 0;
      default:
        return "";
    }
  }
}
