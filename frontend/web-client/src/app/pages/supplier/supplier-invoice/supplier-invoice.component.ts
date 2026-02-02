import { CommonModule, NgClass } from "@angular/common";
import { Component, Input, OnInit, inject, OnDestroy } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";

import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";

import { InvoiceItemsComponent } from "./invoice-items/invoice-items.component";

import { IProduct } from "../../../model/product.model";
import { ISupplier } from "../../../model/supplier.model";
import { ISupplierInvoice } from "../../../model/supplier-invoice.model";
import { IInvoiceItem } from "../../../model/invoice-item.model";
import { IBranch } from "../../../model/branch.model";
import { ILocation } from "../../../model/location.model";

import { ProductService } from "../../../services/product.service";
import { SupplierService } from "../../../services/supplier.service";
import { SupplierInvoiceService } from "../../../services/supplier-invoice.service";
import { BranchService } from "../../../services/branch.service";

@Component({
  selector: "app-supplier-invoice",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    InvoiceItemsComponent,
  ],
  templateUrl: "./supplier-invoice.component.html",
  styleUrl: "./supplier-invoice.component.css",
})
export class SupplierInvoiceComponent implements OnInit, OnDestroy {
  private readonly productService = inject(ProductService);
  private readonly supplierService = inject(SupplierService);
  private readonly supplierInvoiceService = inject(SupplierInvoiceService);
  private readonly branchService = inject(BranchService);
  private readonly fb = inject(FormBuilder);

  private subscription?: Subscription;

  @Input() invoice?: ISupplierInvoice;

  invoiceForm!: FormGroup;

  selectedComponent: "header" | "items" | "pagos" = "header";

  suppliers: ISupplier[] = [];
  branches: IBranch[] = [];
  locations: ILocation[] = [];

  productList: IProduct[] = [];
  invoiceItems: IInvoiceItem[] = [];

  selectedSupplierId?: string;
  selectedBrandId?: string;

  filterByThisSupplier = false;
  isFormSubmitted = false;

  totalInvoiceUnits = 0;
  totalElements = 0;

  readonly vat21 = 0.21;
  readonly vat105 = 0.105;
  readonly vat27 = 0.27;
  readonly vat0 = 0;

  ngOnInit(): void {
    this.initForm();
    this.loadSuppliers();
    this.loadBranches();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  // ---------------- FORM ----------------

  private initForm(): void {
    this.invoiceForm = this.fb.group({
      supplierId: ["", Validators.required],
      invoiceType: ["", Validators.required],
      invoiceDate: [new Date(), Validators.required],
      receptionDate: new Date(),
      savedDate: new Date(),
      dueDate: new Date(),

      branchId: ["", Validators.required],
      locationId: ["", Validators.required],

      packingListPrefix: 0,
      packingListNumber: 0,
      invoicePrefix: [0, Validators.required],
      invoiceNumber: [0, Validators.required],

      saveStocks: true,
      taxSave: true,
      fixedAsset: false,
      askForPriceUpdate: false,

      observations: "",

      subtotal1: 0,
      discount: 0,
      interest: 0,
      subtotal2: 0,

      netVat21: 0,
      netVat105: 0,
      netVat27: 0,
      netVat0: 0,

      vat21: 0,
      vat105: 0,
      vat27: 0,

      withholdingVat: 0,
      withholdingSuss: 0,
      withholdingGrossReceiptsTax: 0,
      withholdingIncome: 0,
      stateTax: 0,
      localTax: 0,
      rounding: 0,

      totalPrice: 0,
    });

    this.invoiceForm.get("branchId")!.valueChanges.subscribe((branchId) => {
      this.onBranchChange(branchId);
    });
  }

  // ---------------- LOAD DATA ----------------

  private loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (suppliers) => (this.suppliers = suppliers),
      error: (err: HttpErrorResponse) =>
        console.error("Error loading suppliers", err),
    });
  }

  private loadBranches(): void {
    this.branchService.getBranches().subscribe({
      next: (branches) => (this.branches = branches),
      error: (err: HttpErrorResponse) =>
        console.error("Error loading branches", err),
    });
  }

  // ---------------- EVENTS ----------------

  onBranchChange(branchId: string): void {
    const branch = this.branches.find((b) => b.id === branchId);
    this.locations = branch?.locations ?? [];
    this.invoiceForm.get("locationId")!.setValue("");
  }

  onInvoiceItemChange(items: IInvoiceItem[]): void {
    this.invoiceItems = items;
    this.totalInvoiceUnits = items.reduce(
      (acc, item) => acc + item.quantity,
      0,
    );
  }

  selectProduct(product: IProduct): void {
    this.invoiceItems.push({
      id: product.id,
      brandName: product.brandName,
      model: product.model,
      description: product.description,
      price: product.priceResponse.purchasePrice,
      taxRate: product.priceResponse.taxRate,
      discountRate: product.priceResponse.discount,
      quantity: 1,
    });
  }

  // ---------------- PRODUCT SEARCH ----------------

  handleSearch(search: string): void {
    if (search.length < 3) {
      this.productList = [];
      return;
    }

    this.searchProducts({
      search,
      supplierId: this.filterByThisSupplier
        ? this.invoiceForm.get("supplierId")?.value
        : undefined,
    });
  }

  handleSearchWithStock(search: string): void {
    if (search.length < 3) {
      this.productList = [];
      return;
    }

    this.searchProducts({
      search,
      inStock: true,
      supplierId: this.filterByThisSupplier
        ? this.invoiceForm.get("supplierId")?.value
        : undefined,
      brandId: this.selectedBrandId,
    });
  }

  private searchProducts(filters: {
    supplierId?: string;
    brandId?: string;
    search?: string;
    inStock?: boolean;
  }): void {
    this.subscription?.unsubscribe();

    this.subscription = this.productService
      .getProducts({
        ...filters,
        page: 0,
        size: 20,
      })
      .subscribe({
        next: (page) => {
          this.productList = page.content;
          this.totalElements = page.totalElements;
        },
        error: (err) => console.error("Product search failed", err),
      });
  }

  // ---------------- SAVE ----------------

  saveInvoice(): void {
    if (this.invoiceForm.invalid || this.invoiceItems.length === 0) {
      this.invoiceForm.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.invoiceForm.value,
      invoiceItemsRequest: this.invoiceItems,
    };

    this.supplierInvoiceService.saveInvoice(payload).subscribe({
      next: (res) => console.log(res.message),
      error: (err) => console.error("Save invoice failed", err),
    });
  }
}
