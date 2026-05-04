import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { SupplierPriceListService, ImportResult } from "../../services/supplier-price-list.service";
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

// ─── Tipos ────────────────────────────────────────────────────────────────────

type SortColumn =
  | "brand"
  | "code"
  | "model"
  | "category"
  | "price"
  | "suggestedPrice"
  | "lastUpdate";

type SortDirection = "asc" | "desc";

// ─── Interfaces auxiliares ─────────────────────────────────────────────────────

export interface ImportSummary {
  total: number;
  imported: number;
  skipped: number;
  failed: number;
  errorDetails: { code: string; reason: string }[];
}

export interface ColumnMapping {
  excelHeader: string;
  mappedAttribute: string;
}

export interface AttributeOption {
  value: string;
  label: string;
}

// ─── Componente ───────────────────────────────────────────────────────────────

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

  // ── Lista de productos y selección ─────────────────────────────────────────
  productList: ISupplierProduct[] = [];
  selectedProduct: ISupplierProduct | null = null;
  selectedProducts: ISupplierProduct[] = [];

  // ── Filtros ────────────────────────────────────────────────────────────────
  suppliers: ISupplier[] = [];
  brands: string[] = [];
  selectedSupplierId = "";
  selectedBrand = "";
  searchTerm = "";

  // ── Archivo Excel ──────────────────────────────────────────────────────────
  selectedFile: File | null = null;
  selectedFileName = "";

  // ── Estados de carga ───────────────────────────────────────────────────────
  loadingSearch = false;
  loadingImportSelection = false;
  loadingUpload = false;

  // ── Ordenamiento y paginación ──────────────────────────────────────────────
  sortColumn: SortColumn = "brand";
  sortDirection: SortDirection = "asc";
  pageIndex = 0;
  pageSize = 20;
  readonly pageSizeOptions = [10, 20, 50, 100];

  // ── Feedback ───────────────────────────────────────────────────────────────
  errorMessage = "";
  successMessage = "";
  warningMessage = "";

  // ── Resumen de importación Excel ───────────────────────────────────────────
  excelImportSummary: ImportSummary | null = null;

  // ── Resumen de importación por selección ─────────────────────────────────
  selectionImportSummary: ImportSummary | null = null;

  // ── Mapeo dinámico de columnas Excel ──────────────────────────────────────
  showColumnMapping = false;
  detectedColumns: ColumnMapping[] = [];

  /** Atributos del sistema disponibles para mapear desde columnas Excel */
  readonly supplierProductAttributes: AttributeOption[] = [
    { value: "code", label: "Código propio" },
    { value: "supplierCode", label: "Código del proveedor" },
    { value: "barcode", label: "Código de barras" },
    { value: "brand", label: "Marca" },
    { value: "model", label: "Modelo" },
    { value: "description", label: "Descripción" },
    { value: "supplierId", label: "ID Proveedor" },
    { value: "taxRate", label: "IVA" },
    { value: "internalTax", label: "Impuesto interno" },
    { value: "discountPercentage", label: "Porcentaje descuento" },
    { value: "lastUpdate", label: "Fecha costo" },
    { value: "longDescription", label: "Descripción larga" },
    { value: "currency", label: "Moneda" },
    { value: "category", label: "ID Rubro" },
    { value: "color", label: "Color" },
    { value: "size", label: "Talle" },
    { value: "fobPrice", label: "Precio FOB" },
    { value: "price", label: "Precio proveedor" },
    { value: "wholesalePrice", label: "Precio mayorista" },
    { value: "tradePrice", label: "Precio comercio" },
    { value: "suggestedPrice", label: "Precio lista" },
    { value: "offerPrice", label: "Precio oferta" },
    { value: "altPrice1", label: "Precio alternativo 1" },
    { value: "altPrice2", label: "Precio alternativo 2" },
    { value: "altPrice3", label: "Precio alternativo 3" },
    { value: "altPrice4", label: "Precio alternativo 4" },
    { value: "altPrice5", label: "Precio alternativo 5" },
    { value: "altPrice6", label: "Precio alternativo 6" },
    { value: "altPrice7", label: "Precio alternativo 7" },
    { value: "altPrice8", label: "Precio alternativo 8" },
    { value: "altPrice9", label: "Precio alternativo 9" },
    { value: "unitsPerBox", label: "Unidades por caja" },
    { value: "minWholesale", label: "Venta mínima por mayor" },
    { value: "minPurchase", label: "Compra mínima por mayor" },
    { value: "vehicle", label: "Vehículo" },
    { value: "height", label: "Alto" },
    { value: "width", label: "Ancho" },
    { value: "depth", label: "Profundidad" },
    { value: "weight", label: "Peso" },
    { value: "stockAvailable", label: "Stock disponible" },
  ];

  // ── Formulario de carga ────────────────────────────────────────────────────
  fileForm: FormGroup = this.fb.group({
    supplierId: ["", Validators.required],
    updateExistingProducts: [false],
    dividePriceByUnitsPerBox: [false],
    copyToRelatedProducts: [false],
    truncateLongFields: [false],
    multipleSuppliers: [false],
  });

  // ============================================================
  // INIT
  // ============================================================
  ngOnInit(): void {
    this.loadSuppliers();
    this.loadBrands();
    this.searchProducts();
  }

  // ============================================================
  // FILTROS / BÚSQUEDA
  // ============================================================
  searchProducts(): void {
    this.clearFeedback();
    this.loadingSearch = true;
    this.selectedProducts = [];

    this.priceListService
      .getAllByFilter(this.selectedSupplierId, this.selectedBrand, this.searchTerm)
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

  handleRowClick(product: ISupplierProduct): void {
    this.selectProduct(product);
    this.toggleSelection(null, product);
  }

  // ============================================================
  // SELECCIÓN DE FILAS
  // ============================================================
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

  // ============================================================
  // ACCIONES DE IMPORTACIÓN
  // ============================================================
  importSelectedProducts(): void {
    this.clearFeedback();
    this.selectionImportSummary = null;
    if (!this.selectedProducts.length) {
      this.warningMessage = "Seleccioná al menos un producto para importar.";
      return;
    }

    this.loadingImportSelection = true;
    const count = this.selectedProducts.length;

    this.priceListService
      .importProductsFromSupplier(this.selectedProducts)
      .subscribe({
        next: (response: ImportResult) => {
          this.selectionImportSummary = {
            total: response.total,
            imported: response.imported,
            skipped: response.skipped,
            failed: response.failed,
            errorDetails: (response.errors ?? []).map(e => ({ code: e.code, reason: e.reason })),
          };
          this.selectedProducts = [];
          this.loadingImportSelection = false;
          this.searchProducts();
        },
        error: (err) => {
          this.selectionImportSummary = {
            total: count,
            imported: 0,
            skipped: 0,
            failed: count,
            errorDetails: [],
          };
          this.errorMessage =
            err?.error?.message ?? "No se pudieron importar los productos seleccionados.";
          this.loadingImportSelection = false;
        },
      });
  }

  clearSelectionImportSummary(): void {
    this.selectionImportSummary = null;
  }

  clearExcelImportSummary(): void {
    this.excelImportSummary = null;
  }

  // ============================================================
  // ACCIONES (Nuevas — solo UI/stub)
  // ============================================================

  /** (Nuevo) Abre vista de comparación de precios. Pendiente de implementar. */
  openComparePrices(): void {
    this.warningMessage = "Comparar precios: funcionalidad próximamente disponible.";
  }

  /** (Nuevo) Abre flujo de facturación. Pendiente de implementar. */
  openInvoice(): void {
    this.warningMessage = "Facturar: funcionalidad próximamente disponible.";
  }

  /** Relacionar artículos seleccionados con productos del sistema. */
  relateProducts(): void {
    this.warningMessage = "Relacionar artículos: funcionalidad próximamente disponible.";
  }

  /** Relacionar un artículo individual. */
  relateProduct(_product: ISupplierProduct): void {
    this.warningMessage = "Relacionar artículo: funcionalidad próximamente disponible.";
  }

  // ============================================================
  // CARGA DE ARCHIVO EXCEL
  // ============================================================
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
      this.showColumnMapping = false;
      this.detectedColumns = [];
    }
  }

  private uploadSelectedExcelFile(): void {
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

          this.excelImportSummary = {
            total: response.total ?? 0,
            imported: response.imported ?? 0,
            skipped: response.skipped ?? 0,
            failed: response.failed ?? 0,
            errorDetails: (response.errors ?? []).map((e: any) => ({ code: e.code, reason: e.reason })),
          };

          this.selectedFile = null;
          this.selectedFileName = "";
          this.showColumnMapping = false;
          this.detectedColumns = [];
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

  // ============================================================
  // MAPEO DINÁMICO DE COLUMNAS
  // ============================================================

  processExcelFile(): void {
    this.clearFeedback();

    if (!this.fileForm.valid || !this.selectedFile) {
      this.warningMessage = "Proveedor y archivo Excel son obligatorios.";
      return;
    }

    this.previewColumnMapping();
  }

  /** Muestra el panel de mapeo (stub: genera columnas de ejemplo basadas en atributos). */
  previewColumnMapping(): void {
    // En una implementación real se llamaría al backend para parsear el Excel
    // y obtener los encabezados detectados automáticamente.
    // Por ahora se simulan columnas basadas en los atributos del sistema.
    if (!this.detectedColumns.length) {
      this.detectedColumns = this.supplierProductAttributes.map((attr) => ({
        excelHeader: attr.label.toUpperCase(),
        mappedAttribute: attr.value,
      }));
    }
    this.showColumnMapping = true;
  }

  updateColumnMapping(excelHeader: string, attribute: string): void {
    const col = this.detectedColumns.find((c) => c.excelHeader === excelHeader);
    if (col) {
      col.mappedAttribute = attribute;
    }
  }

  cancelColumnMapping(): void {
    this.showColumnMapping = false;
  }

  /** Confirma el mapeo y ejecuta la importación real. */
  confirmAndUpload(): void {
    this.uploadSelectedExcelFile();
  }

  // ============================================================
  // PROVEEDORES
  // ============================================================
  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (suppliers) => (this.suppliers = suppliers),
      error: () => (this.errorMessage = "No se pudieron cargar los proveedores."),
    });
  }

  supplierNameById(id: string): string {
    return this.suppliers.find((s) => s.id === id)?.name ?? "Proveedor no identificado";
  }

  // ============================================================
  // ORDENAMIENTO Y PAGINACIÓN
  // ============================================================
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

  trackByProductId(_: number, product: ISupplierProduct): string {
    return product.id;
  }

  // ============================================================
  // HELPERS PRIVADOS
  // ============================================================
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
      case "brand":        return product.brand?.toLowerCase() ?? "";
      case "code":         return product.code?.toLowerCase() ?? "";
      case "model":        return product.model?.toLowerCase() ?? "";
      case "category":     return product.category?.toLowerCase() ?? "";
      case "price":        return product.price ?? 0;
      case "suggestedPrice": return product.suggestedPrice ?? 0;
      case "lastUpdate":   return new Date(product.lastUpdate).getTime() || 0;
      default:             return "";
    }
  }
}
