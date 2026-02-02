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
  selectedProducts: ISupplierProduct[] = [];

  suppliers: ISupplier[] = [];
  brands: string[] = [];

  selectedSupplierId = "";
  selectedBrand = "";
  searchTerm = "";

  selectedFile: File | null = null;

  errorMessage = "";
  successMessage = "";
  warningMessage = "";

  fileForm!: FormGroup;

  // ============================
  // INIT
  // ============================
  ngOnInit(): void {
    this.loadSuppliers();
    this.loadBrands();

    this.fileForm = this.fb.group({
      supplierId: ["", Validators.required],
      updateExistingProducts: [false],
    });
  }

  // ============================
  // FILE UPLOAD
  // ============================
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile(event: Event): void {
    event.preventDefault();

    if (!this.fileForm.valid || !this.selectedFile) {
      this.warningMessage = "Supplier and file are required";
      return;
    }

    const { supplierId, updateExistingProducts } = this.fileForm.value;

    this.priceListService
      .uploadFile(this.selectedFile, supplierId, updateExistingProducts)
      .subscribe({
        next: (response) => {
          this.successMessage =
            response.message ?? "File imported successfully";
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error.error?.message || "Error importing file";
        },
      });
  }

  // ============================
  // SEARCH & FILTER
  // ============================
  searchProducts(): void {
    this.selectedProducts = [];

    this.priceListService
      .getAllByFilter(
        this.selectedSupplierId,
        this.selectedBrand,
        this.searchTerm,
      )
      .subscribe({
        next: (data) => (this.productList = data),
        error: () => (this.errorMessage = "Error loading products"),
      });
  }

  onSupplierChange(supplierId: string): void {
    this.selectedSupplierId = supplierId;
    this.loadBrands();
  }

  loadBrands(): void {
    const obs = this.selectedSupplierId
      ? this.priceListService.getBrands(this.selectedSupplierId)
      : this.priceListService.getBrands();

    obs.subscribe({
      next: (brands) => (this.brands = brands),
      error: () => (this.errorMessage = "Error loading brands"),
    });
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
    this.selectedProducts = checked ? [...this.productList] : [];
  }

  // ============================
  // IMPORT PRODUCTS
  // ============================
  importSelectedProducts(): void {
    if (!this.selectedProducts.length) {
      this.warningMessage = "No products selected";
      return;
    }

    this.priceListService
      .importProductsFromSupplier(this.selectedProducts)
      .subscribe({
        next: (response) => {
          this.successMessage =
            response.message ?? "Products imported successfully";
          this.selectedProducts = [];
        },
        error: () => {
          this.errorMessage = "Error importing products";
        },
      });
  }

  // ============================
  // SUPPLIERS
  // ============================
  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (suppliers) => (this.suppliers = suppliers),
      error: () => (this.errorMessage = "Error loading suppliers"),
    });
  }
}
