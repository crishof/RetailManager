import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { SupplierPriceListService, ImportResult, ColumnHeaderSuggestion, ImportJobRecord } from "../../services/supplier-price-list.service";
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
type ViewMode = "catalog" | "import";

// ─── Interfaces auxiliares ─────────────────────────────────────────────────────

export interface ImportSummary {
  total: number;
  imported: number;
  updated: number;
  skipped: number;
  failed: number;
  errorDetails: { code: string; reason: string }[];
}

export interface ColumnMapping {
  excelHeader: string;
  mappedAttributes: string[];
}

export interface AttributeOption {
  value: string;
  label: string;
  helperText?: string;
  required?: boolean;
}

export interface MappingRelation {
  attribute: AttributeOption;
  excelHeaders: string[];
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

  // ── Modo de vista ─────────────────────────────────────────────────────────
  viewMode: ViewMode = "catalog";

  // ── Historial de importaciones ─────────────────────────────────────────────
  importHistory: ImportJobRecord[] = [];
  loadingHistory = false;
  showHistory = false;

  // ── Resumen de importación Excel ───────────────────────────────────────────
  excelImportSummary: ImportSummary | null = null;

  // ── Resumen de importación por selección ─────────────────────────────────
  selectionImportSummary: ImportSummary | null = null;

  // ── Mapeo dinámico de columnas Excel ──────────────────────────────────────
  showColumnMapping = false;
  detectedColumns: ColumnMapping[] = [];
  selectedMappingAttribute = "";
  private readonly mappingStorageKeyPrefix = "supplier-price-list:mapping:";
  readonly requiredImportFields = ["brand", "model", "code"];

  /** Atributos del sistema disponibles para mapear desde columnas Excel */
  readonly supplierProductAttributes: AttributeOption[] = [
    { value: "code", label: "Código del proveedor", helperText: "Identificador del proveedor en origen.", required: true },
    { value: "brand", label: "Marca", helperText: "Marca o fabricante del producto.", required: true },
    { value: "model", label: "Modelo", helperText: "Modelo, referencia o variante.", required: true },
    { value: "barcode", label: "Código de barras", helperText: "EAN, UPC o código de barras." },
    { value: "description", label: "Descripción", helperText: "Texto descriptivo corto del artículo." },
    { value: "category", label: "Categoría", helperText: "Rubro o agrupación comercial." },
    { value: "price", label: "Precio", helperText: "Costo o precio informado por el proveedor." },
    { value: "suggested-price", label: "Precio sugerido", helperText: "Precio de lista o sugerido." },
    { value: "suggested-web-price", label: "Precio sugerido web", helperText: "Precio sugerido para canal online." },
    { value: "currency", label: "Moneda", helperText: "Símbolo o código monetario." },
    { value: "tax-rate", label: "IVA", helperText: "Alícuota o porcentaje de impuesto." },
    { value: "internal-tax", label: "Impuesto interno", helperText: "Percepción o impuesto interno aplicado al producto." },
    { value: "stock", label: "Stock", helperText: "Disponibilidad o stock informado." },
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
    this.syncSupplierValidationWithMode();
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
            imported: response.inserted ?? response.imported,
            updated: response.updated ?? 0,
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
            updated: 0,
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

  openImportWorkspace(): void {
    this.clearFeedback();
    this.viewMode = "import";
    this.showHistory = false;
    this.loadImportHistory();
  }

  backToCatalog(): void {
    this.clearFeedback();
    this.viewMode = "catalog";
    this.showColumnMapping = false;
    this.showHistory = false;
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
  // HISTORIAL DE IMPORTACIONES
  // ============================================================
  loadImportHistory(): void {
    this.loadingHistory = true;
    const supplierId = this.fileForm.get('supplierId')?.value || undefined;
    this.priceListService.getImportHistory(supplierId).subscribe({
      next: (jobs: ImportJobRecord[]) => {
        const sorted = [...jobs].sort((a: ImportJobRecord, b: ImportJobRecord) =>
          new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
        );
        this.importHistory = sorted;
        this.loadingHistory = false;
      },
      error: () => { this.loadingHistory = false; },
    });
  }

  toggleHistory(): void {
    this.showHistory = !this.showHistory;
    if (this.showHistory && this.importHistory.length === 0) {
      this.loadImportHistory();
    }
  }

  jobStatusLabel(status: string): string {
    switch (status) {
      case 'COMPLETED': return 'Completado';
      case 'RUNNING':   return 'En curso';
      case 'PENDING':   return 'Pendiente';
      case 'FAILED':    return 'Fallido';
      default:          return status;
    }
  }

  jobStatusClass(status: string): string {
    switch (status) {
      case 'COMPLETED': return 'status-active';
      case 'RUNNING':   return 'status-running';
      case 'PENDING':   return 'status-pending';
      case 'FAILED':    return 'status-inactive';
      default:          return '';
    }
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

  private uploadSelectedExcelFile(columnMapping?: Record<string, string>): void {
    this.clearFeedback();

    if (!this.selectedFile) {
      this.warningMessage = "Seleccioná un archivo Excel.";
      return;
    }

    if (!this.isImportFormValid()) {
      return;
    }

    const { supplierId, updateExistingProducts } = this.fileForm.getRawValue();
    this.loadingUpload = true;

    this.priceListService
      .uploadFile(this.selectedFile, supplierId ?? "", updateExistingProducts, columnMapping)
      .subscribe({
        next: (response) => {
          this.successMessage =
            response.message ?? "Lista de precios importada correctamente.";

          this.excelImportSummary = {
            total: response.total ?? 0,
            imported: response.inserted ?? response.imported ?? 0,
            updated: response.updated ?? 0,
            skipped: response.skipped ?? 0,
            failed: response.failed ?? 0,
            errorDetails: (response.errors ?? []).map((e: any) =>
              typeof e === 'string'
                ? { code: '', reason: e }
                : { code: e.code ?? '', reason: e.reason ?? String(e) }
            ),
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

    if (!this.selectedFile) {
      this.warningMessage = "Seleccioná un archivo Excel.";
      return;
    }

    if (!this.isImportFormValid()) {
      return;
    }

    this.loadingUpload = true;
    this.priceListService.parseExcelHeaders(this.selectedFile).subscribe({
      next: (suggestions: ColumnHeaderSuggestion[]) => {
        this.detectedColumns = suggestions.map((s) => ({
          excelHeader: s.rawHeader,
          mappedAttributes: s.suggestedAttribute ? [s.suggestedAttribute] : [],
        }));

        this.applySavedMappingSelection();
        this.normalizeSingleMapping();
        this.ensureSelectedMappingAttribute();
        this.showColumnMapping = true;
        this.loadingUpload = false;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage =
          err.error?.message ?? 'No se pudo leer el archivo Excel.';
        this.loadingUpload = false;
      },
    });
  }

  cancelColumnMapping(): void {
    this.selectedMappingAttribute = "";
    this.showColumnMapping = false;
  }

  /** Confirma el mapeo y ejecuta la importación real. */
  confirmAndUpload(): void {
    if (!this.selectedFile) {
      this.warningMessage = "Seleccioná un archivo Excel.";
      return;
    }

    if (!this.isImportFormValid()) {
      return;
    }

    if (!this.hasRequiredFieldMappings()) {
      return;
    }

    const columnMapping = this.buildColumnMapping();

    this.saveMappingSelection(columnMapping);

    this.uploadSelectedExcelFile(columnMapping);
  }

  onMultipleSuppliersToggle(): void {
    this.syncSupplierValidationWithMode();
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

  private isImportFormValid(): boolean {
    const multipleSuppliers = this.fileForm.get("multipleSuppliers")?.value === true;
    const supplierId = this.fileForm.get("supplierId")?.value;

    if (!multipleSuppliers && !supplierId) {
      this.warningMessage = "Seleccioná un proveedor o activá 'varios proveedores'.";
      this.fileForm.get("supplierId")?.markAsTouched();
      return false;
    }

    return true;
  }

  private syncSupplierValidationWithMode(): void {
    const supplierControl = this.fileForm.get("supplierId");
    const multipleSuppliers = this.fileForm.get("multipleSuppliers")?.value === true;

    if (!supplierControl) return;

    if (multipleSuppliers) {
      supplierControl.setValue("");
      supplierControl.clearValidators();
      supplierControl.disable({ emitEvent: false });
    } else {
      supplierControl.enable({ emitEvent: false });
      supplierControl.setValidators([Validators.required]);
    }

    supplierControl.updateValueAndValidity({ emitEvent: false });
  }

  private hasRequiredFieldMappings(): boolean {
    const mapped = new Set<string>();
    this.detectedColumns.forEach((col) => {
      col.mappedAttributes.forEach((attr) => mapped.add(attr));
    });

    const missing = this.requiredImportFields.filter((required) => !mapped.has(required));
    if (missing.length > 0) {
      const labels = missing.map((f) => this.labelForAttribute(f));
      this.warningMessage = `Faltan campos requeridos en el mapeo: ${labels.join(", ")}.`;
      return false;
    }

    return true;
  }

  private labelForAttribute(value: string): string {
    return this.supplierProductAttributes.find((a) => a.value === value)?.label ?? value;
  }

  get availableMappingAttributes(): AttributeOption[] {
    return this.supplierProductAttributes.filter((attribute) => this.getAssignedColumns(attribute.value).length === 0);
  }

  get mappingRelations(): MappingRelation[] {
    return this.supplierProductAttributes
      .map((attribute) => ({
        attribute,
        excelHeaders: this.getAssignedColumns(attribute.value),
      }))
      .filter((relation) => relation.excelHeaders.length > 0);
  }

  get selectedMappingAttributeOption(): AttributeOption | null {
    return this.supplierProductAttributes.find((attribute) => attribute.value === this.selectedMappingAttribute) ?? null;
  }

  selectMappingAttribute(attribute: string): void {
    this.selectedMappingAttribute = attribute;
  }

  getAssignedColumns(attribute: string): string[] {
    return this.detectedColumns
      .filter((column) => column.mappedAttributes.includes(attribute))
      .map((column) => column.excelHeader);
  }

  isColumnAssigned(attribute: string, excelHeader: string): boolean {
    return this.detectedColumns.some(
      (column) => column.excelHeader === excelHeader && column.mappedAttributes.includes(attribute),
    );
  }

  assignExcelColumn(attribute: string, excelHeader: string): void {
    const column = this.detectedColumns.find((item) => item.excelHeader === excelHeader);
    if (!column) {
      return;
    }

    const alreadyAssigned = this.isColumnAssigned(attribute, excelHeader);
    if (alreadyAssigned) {
      return;
    }

    // Regla: un campo del sistema solo puede tener una columna de Excel.
    this.detectedColumns.forEach((item) => {
      item.mappedAttributes = item.mappedAttributes.filter((mapped) => mapped !== attribute);
    });

    // Una columna puede mapearse a múltiples campos del sistema.
    column.mappedAttributes = [...column.mappedAttributes, attribute];
    this.selectedMappingAttribute = attribute;
    this.saveMappingSelection(this.buildColumnMapping());
  }

  removeExcelColumn(attribute: string, excelHeader: string): void {
    const column = this.detectedColumns.find((item) => item.excelHeader === excelHeader);
    if (!column) {
      return;
    }

    column.mappedAttributes = column.mappedAttributes.filter((mapped) => mapped !== attribute);
    this.saveMappingSelection(this.buildColumnMapping());
    this.ensureSelectedMappingAttribute();
  }

  clearAttributeAssignments(attribute: string): void {
    this.detectedColumns.forEach((column) => {
      column.mappedAttributes = column.mappedAttributes.filter((mapped) => mapped !== attribute);
    });
    this.saveMappingSelection(this.buildColumnMapping());
    this.ensureSelectedMappingAttribute();
  }

  get mappedAttributeCount(): number {
    return this.supplierProductAttributes.filter((attribute) => this.getAssignedColumns(attribute.value).length > 0).length;
  }

  get requiredMappedCount(): number {
    return this.requiredImportFields.filter((attribute) => this.getAssignedColumns(attribute).length > 0).length;
  }

  get excelColumnCount(): number {
    return this.detectedColumns.length;
  }

  get isSelectedAttributeAssigned(): boolean {
    return this.selectedMappingAttribute
      ? this.getAssignedColumns(this.selectedMappingAttribute).length > 0
      : false;
  }

  private ensureSelectedMappingAttribute(): void {
    const currentIsValid = this.selectedMappingAttribute
      && this.supplierProductAttributes.some((attribute) => attribute.value === this.selectedMappingAttribute)
      && this.getAssignedColumns(this.selectedMappingAttribute).length === 0;

    if (currentIsValid) {
      return;
    }

    const preferredRequired = this.availableMappingAttributes.find((attribute) => attribute.required);
    this.selectedMappingAttribute = preferredRequired?.value
      ?? this.availableMappingAttributes[0]?.value
      ?? "";
  }

  private mappingStorageKey(): string {
    const { supplierId, multipleSuppliers } = this.fileForm.getRawValue();
    const scope = multipleSuppliers ? "__MULTI__" : (supplierId || "__NO_SUPPLIER__");
    return `${this.mappingStorageKeyPrefix}${scope}`;
  }

  private saveMappingSelection(mapping: Record<string, string>): void {
    try {
      localStorage.setItem(this.mappingStorageKey(), JSON.stringify(mapping));
    } catch {
      // noop: no bloquear importación por storage
    }
  }

  private applySavedMappingSelection(): void {
    try {
      const raw = localStorage.getItem(this.mappingStorageKey());
      if (!raw) return;

      const saved = JSON.parse(raw) as Record<string, string>;
      this.detectedColumns = this.detectedColumns.map((col) => {
        const value = saved[col.excelHeader];
        if (!value) return col;

        // Soporta múltiples atributos por columna separados por coma.
        const mappedAttributes = value
          .split(/[|,]/)
          .map((v) => v.trim())
          .filter(Boolean);

        return {
          ...col,
          mappedAttributes,
        };
      });

      // Normaliza duplicados legacy (ej. STK y STOCK en el mismo atributo).
      this.normalizeSingleMapping();
      this.saveMappingSelection(this.buildColumnMapping());
    } catch {
      // noop
    }
  }

  private normalizeSingleMapping(): void {
    const selectedByAttribute = new Map<string, string>();

    // Conserva solo una columna por atributo, con preferencia por STK para stock.
    // Una columna puede tener múltiples atributos.
    this.detectedColumns.forEach((column) => {
      const attributesToKeep: string[] = [];
      for (const attribute of column.mappedAttributes) {
        const currentHeader = selectedByAttribute.get(attribute);
        if (!currentHeader) {
          selectedByAttribute.set(attribute, column.excelHeader);
          attributesToKeep.push(attribute);
        } else if (attribute === "stock" && !this.isPreferredStockHeader(currentHeader) && this.isPreferredStockHeader(column.excelHeader)) {
          const previous = this.detectedColumns.find((item) => item.excelHeader === currentHeader);
          if (previous) previous.mappedAttributes = previous.mappedAttributes.filter((a) => a !== attribute);
          selectedByAttribute.set(attribute, column.excelHeader);
          attributesToKeep.push(attribute);
        }
        // else: ya hay otra columna asignada a este atributo, descartar
      }
      column.mappedAttributes = attributesToKeep;
    });

  }

  private isPreferredStockHeader(header: string): boolean {
    return /^stk$/i.test(header.trim());
  }

  private buildColumnMapping(): Record<string, string> {
    const columnMapping: Record<string, string> = {};
    for (const col of this.detectedColumns) {
      if (col.mappedAttributes.length > 0) {
        columnMapping[col.excelHeader] = col.mappedAttributes.join(",");
      }
    }
    return columnMapping;
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
