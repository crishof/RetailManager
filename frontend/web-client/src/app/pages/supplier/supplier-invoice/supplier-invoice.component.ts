import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Subject } from "rxjs";

import { IProduct } from "../../../model/product.model";
import { ISupplier } from "../../../model/supplier.model";
import { ISupplierInvoice, IOtherConcept } from "../../../model/supplier-invoice.model";
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
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./supplier-invoice.component.html",
  styleUrl: "./supplier-invoice.component.css",
})
export class SupplierInvoiceComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly supplierService = inject(SupplierService);
  private readonly supplierInvoiceService = inject(SupplierInvoiceService);
  private readonly branchService = inject(BranchService);

  private readonly destroy$ = new Subject<void>();

  suppliers: ISupplier[] = [];
  branches: IBranch[] = [];
  locations: ILocation[] = [];

  productList: IProduct[] = [];
  showProductDropdown = false;
  productSearchQuery = '';

  isFormSubmitted = false;
  isSaving = false;
  saveSuccess = false;
  saveError = '';

  readonly vatOptions = [
    { label: '0%', value: 0 },
    { label: '10.5%', value: 0.105 },
    { label: '21%', value: 0.21 },
    { label: '27%', value: 0.27 },
  ];

  readonly invoiceTypes = ['A', 'B', 'C', 'M', 'X'];

  invoiceForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.loadSuppliers();
    this.loadBranches();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ─── FORM ──────────────────────────────────────────────────────────

  private initForm(): void {
    const today = new Date().toISOString().substring(0, 10);
    this.invoiceForm = this.fb.group({
      supplierId: ['', Validators.required],
      invoiceType: ['A', Validators.required],
      dueDate: [today, Validators.required],
      receptionDate: [today],
      savedDate: [today],
      invoiceDate: [today, Validators.required],
      invoicePrefix: ['00001', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      invoiceNumber: ['00000001', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      packingListNumbers: this.fb.array([]),
      branchId: ['', Validators.required],
      locationId: ['', Validators.required],
      lineItems: this.fb.array([]),
      discount: [0],
      interest: [0],
      rounding: [0],
      observations: [''],
      saveStocks: [true],
      taxSave: [true],
      fixedAsset: [true],
      askForPriceUpdate: [true],
    });

    this.invoiceForm.get('branchId')!.valueChanges.subscribe((id) =>
      this.onBranchChange(id)
    );
  }

  // ─── ARRAY GETTERS ─────────────────────────────────────────────────

  get lineItemsArray(): FormArray {
    return this.invoiceForm.get('lineItems') as FormArray;
  }

  get remitosArray(): FormArray {
    return this.invoiceForm.get('packingListNumbers') as FormArray;
  }

  private normalizeNumberSegment(value: string | number | null | undefined, length: number): string {
    return String(value ?? '')
      .replaceAll(/\D/g, '')
      .slice(-length)
      .padStart(length, '0');
  }

  formatInvoicePrefix(): void {
    const control = this.invoiceForm.get('invoicePrefix');
    control?.setValue(this.normalizeNumberSegment(control.value, 5));
  }

  formatInvoiceNumber(): void {
    const control = this.invoiceForm.get('invoiceNumber');
    control?.setValue(this.normalizeNumberSegment(control.value, 8));
  }

  private normalizeDocumentNumber(value: string | null | undefined): string {
    const raw = String(value ?? '').trim();
    if (!raw) {
      return '';
    }

    const parts = raw.split('-').map((part) => part.replaceAll(/\D/g, ''));
    const normalizedPrefix = this.normalizeNumberSegment(parts[0], 5);

    const numericTail = raw.replaceAll(/\D/g, '');
    const rawNumber = parts.length > 1 ? parts[1] : numericTail.slice(5);
    const normalizedNumber = this.normalizeNumberSegment(rawNumber, 8);

    return `${normalizedPrefix} - ${normalizedNumber}`;
  }

  onRemitoBlur(index: number): void {
    const control = this.remitosArray.at(index);
    const normalizedValue = this.normalizeDocumentNumber(control.value);
    control.setValue(normalizedValue);
  }

  // ─── TOTALS ────────────────────────────────────────────────────────

  private lineNetAmount(item: any): number {
    const qty = Math.max(1, (item.boxes ?? 1) * (item.unitsPerBox ?? 1));
    const gross = (item.price ?? 0) * qty;
    return gross * (1 - (item.discountRate ?? 0) / 100);
  }

  lineQuantity(item: any): number {
    return Math.max(1, (item.boxes ?? 1) * (item.unitsPerBox ?? 1));
  }

  lineSubtotal(item: any): number {
    return this.lineNetAmount(item);
  }

  get lineItemValues(): any[] {
    return this.lineItemsArray.controls.map((c) => c.value);
  }

  get subtotal1(): number {
    return this.lineItemValues.reduce((acc, i) => acc + this.lineNetAmount(i), 0);
  }

  get discountValue(): number {
    return +(this.invoiceForm.get('discount')?.value ?? 0);
  }

  get interestValue(): number {
    return +(this.invoiceForm.get('interest')?.value ?? 0);
  }

  get subtotal2(): number {
    return this.subtotal1 - this.discountValue + this.interestValue;
  }

  get vat21Total(): number {
    return this.lineItemValues
      .filter((i) => +i.taxRate === 0.21)
      .reduce((acc, i) => acc + this.lineNetAmount(i) * 0.21, 0);
  }

  get vat105Total(): number {
    return this.lineItemValues
      .filter((i) => +i.taxRate === 0.105)
      .reduce((acc, i) => acc + this.lineNetAmount(i) * 0.105, 0);
  }

  get vat27Total(): number {
    return this.lineItemValues
      .filter((i) => +i.taxRate === 0.27)
      .reduce((acc, i) => acc + this.lineNetAmount(i) * 0.27, 0);
  }

  get vatTotal(): number {
    return this.vat21Total + this.vat105Total + this.vat27Total;
  }

  get netValue21(): number {
    return this.lineItemValues
      .filter((i) => +i.taxRate === 0.21)
      .reduce((acc, i) => acc + this.lineNetAmount(i), 0);
  }

  get netValue105(): number {
    return this.lineItemValues
      .filter((i) => +i.taxRate === 0.105)
      .reduce((acc, i) => acc + this.lineNetAmount(i), 0);
  }

  get netValue27(): number {
    return this.lineItemValues
      .filter((i) => +i.taxRate === 0.27)
      .reduce((acc, i) => acc + this.lineNetAmount(i), 0);
  }

  get netValue0(): number {
    return this.lineItemValues
      .filter((i) => +i.taxRate === 0)
      .reduce((acc, i) => acc + this.lineNetAmount(i), 0);
  }

  get internalTaxTotal(): number {
    return this.lineItemValues.reduce(
      (acc, i) => acc + this.lineNetAmount(i) * ((i.internalTaxRate ?? 0) / 100),
      0
    );
  }

  get roundingValue(): number {
    return +(this.invoiceForm.get('rounding')?.value ?? 0);
  }

  get total(): number {
    return this.subtotal2 + this.vatTotal + this.internalTaxTotal + this.roundingValue;
  }

  get totalUnits(): number {
    return this.lineItemValues.reduce((acc, i) => acc + this.lineQuantity(i), 0);
  }

  // ─── LOAD DATA ─────────────────────────────────────────────────────

  private loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (s) => (this.suppliers = s),
      error: (err: HttpErrorResponse) =>
        console.error('Error loading suppliers', err),
    });
  }

  private loadBranches(): void {
    this.branchService.getBranches().subscribe({
      next: (b) => (this.branches = b),
      error: (err: HttpErrorResponse) =>
        console.error('Error loading branches', err),
    });
  }

  // ─── EVENTS ────────────────────────────────────────────────────────

  onBranchChange(branchId: string): void {
    const branch = this.branches.find((b) => b.id === branchId);
    this.locations = branch?.locations ?? [];
    this.invoiceForm.get('locationId')!.setValue('');
  }

  // ─── PRODUCT SEARCH ────────────────────────────────────────────────

  onSearchInput(query: string): void {
    this.productSearchQuery = query;
    if (query.length < 2) {
      this.productList = [];
      this.showProductDropdown = false;
      return;
    }
    this.productService
      .getProducts({
        search: query,
        supplierId:
          this.invoiceForm.get('supplierId')?.value || undefined,
        page: 0,
        size: 15,
      })
      .subscribe({
        next: (page) => {
          this.productList = page.content;
          this.showProductDropdown = this.productList.length > 0;
        },
        error: (err) => console.error('Product search failed', err),
      });
  }

  hideDropdown(): void {
    setTimeout(() => (this.showProductDropdown = false), 200);
  }

  // ─── LINE ITEMS ────────────────────────────────────────────────────

  private buildItemGroup(opts: Partial<IInvoiceItem & { type: string }>): FormGroup {
    return this.fb.group({
      id: [opts.id ?? ''],
      type: [opts.type ?? 'product'],
      brandName: [opts.brandName ?? ''],
      model: [opts.model ?? ''],
      description: [opts.description ?? ''],
      price: [opts.price ?? 0],
      taxRate: [opts.taxRate ?? 0.21],
      internalTaxRate: [opts.internalTaxRate ?? 0],
      discountRate: [opts.discountRate ?? 0],
      boxes: [opts.boxes ?? 1],
      unitsPerBox: [opts.unitsPerBox ?? 1],
    });
  }

  addProduct(product: IProduct): void {
    this.lineItemsArray.push(
      this.buildItemGroup({
        id: product.id,
        type: 'product',
        brandName: product.brandName,
        model: product.model,
        description: product.description,
        price: product.priceResponse?.purchasePrice ?? 0,
        taxRate: product.priceResponse?.taxRate ?? 0.21,
        internalTaxRate: 0,
        discountRate: 0,
        boxes: 1,
        unitsPerBox: 1,
      })
    );
    this.productSearchQuery = '';
    this.productList = [];
    this.showProductDropdown = false;
  }

  addOtherConcept(): void {
    this.lineItemsArray.push(
      this.buildItemGroup({
        id: '',
        type: 'concept',
        brandName: '',
        model: '',
        description: '',
        price: 0,
        taxRate: 0,
        internalTaxRate: 0,
        discountRate: 0,
        boxes: 1,
        unitsPerBox: 1,
      })
    );
  }

  removeLineItem(i: number): void {
    this.lineItemsArray.removeAt(i);
  }

  // ─── REMITOS ───────────────────────────────────────────────────────

  addRemito(): void {
    this.remitosArray.push(this.fb.control('', Validators.pattern(/^\d{5}\s-\s\d{8}$/)));
  }

  removeRemito(i: number): void {
    this.remitosArray.removeAt(i);
  }

  // ─── SAVE ──────────────────────────────────────────────────────────

  saveInvoice(): void {
    this.isFormSubmitted = true;
    if (this.invoiceForm.invalid || this.lineItemsArray.length === 0) {
      this.invoiceForm.markAllAsTouched();
      return;
    }

    const fv = this.invoiceForm.value;
    const allItems: any[] = this.lineItemValues;
    const locationName =
      this.locations.find((loc) => loc.id === fv.locationId)?.name?.trim() ?? '';

    const packingListNumbers = ((fv.packingListNumbers as string[]) ?? [])
      .map((remito) => this.normalizeDocumentNumber(remito))
      .filter((remito) => remito.length > 0);

    const [packingListPrefix, packingListNumber] =
      packingListNumbers.length > 0 ? packingListNumbers[0].split(' - ') : ['', ''];

    const payload: ISupplierInvoice = {
      supplierId: fv.supplierId,
      location: locationName,
      invoiceType: fv.invoiceType,
      dueDate: fv.dueDate,
      receptionDate: fv.receptionDate,
      savedDate: fv.savedDate,
      invoiceDate: fv.invoiceDate,
      invoicePrefix: this.normalizeNumberSegment(fv.invoicePrefix, 5),
      invoiceNumber: this.normalizeNumberSegment(fv.invoiceNumber, 8),
      packingListPrefix: packingListPrefix || undefined,
      packingListNumber: packingListNumber || undefined,
      packingListNumbers,
      branchId: fv.branchId,
      locationId: fv.locationId,
      observations: fv.observations,
      saveStocks: fv.saveStocks ?? true,
      taxSave: fv.taxSave ?? true,
      fixedAsset: fv.fixedAsset ?? true,
      askForPriceUpdate: fv.askForPriceUpdate ?? true,
      invoiceItemsRequest: allItems
        .filter((i) => i.type === 'product')
        .map<IInvoiceItem>((i) => ({
          id: i.id,
          type: 'product',
          brandName: i.brandName,
          model: i.model,
          description: i.description,
          price: i.price,
          taxRate: i.taxRate,
          internalTaxRate: i.internalTaxRate,
          discountRate: i.discountRate,
          boxes: i.boxes,
          unitsPerBox: i.unitsPerBox,
          quantity: i.boxes * i.unitsPerBox,
        })),
      otherConcepts: allItems
        .filter((i) => i.type === 'concept')
        .map<IOtherConcept>((i) => ({
          description: i.description,
          price: i.price,
          taxRate: i.taxRate,
          internalTaxRate: i.internalTaxRate,
          discountRate: i.discountRate,
        })),
      discount: fv.discount,
      interest: fv.interest,
      subtotal1: this.subtotal1,
      subtotal2: this.subtotal2,
      netValue21: this.netValue21,
      vat21: this.vat21Total,
      netValue105: this.netValue105,
      vat105: this.vat105Total,
      netValue27: this.netValue27,
      vat27: this.vat27Total,
      netValue0: this.netValue0,
      internalTax: this.internalTaxTotal,
      withholdingVat: 0,
      withholdingSuss: 0,
      withholdingGrossReceiptsTax: 0,
      withholdingIncome: 0,
      stateTax: 0,
      localTax: 0,
      rounding: fv.rounding,
      totalPrice: this.total,
    };

    this.isSaving = true;
    this.saveSuccess = false;
    this.saveError = '';

    this.supplierInvoiceService.saveInvoice(payload).subscribe({
      next: () => {
        const today = new Date().toISOString().substring(0, 10);
        this.isSaving = false;
        this.saveSuccess = true;
        this.lineItemsArray.clear();
        this.remitosArray.clear();
        this.locations = [];
        this.invoiceForm.reset({
          supplierId: '',
          invoiceType: 'A',
          dueDate: today,
          receptionDate: today,
          savedDate: today,
          invoiceDate: today,
          invoicePrefix: '00001',
          invoiceNumber: '00000001',
          branchId: '',
          locationId: '',
          discount: 0,
          interest: 0,
          rounding: 0,
          observations: '',
          saveStocks: true,
          taxSave: true,
          fixedAsset: true,
          askForPriceUpdate: true,
        });
        this.isFormSubmitted = false;
        setTimeout(() => (this.saveSuccess = false), 4000);
      },
      error: (err) => {
        this.isSaving = false;
        this.saveError = err?.error?.message ?? 'Error al guardar la factura.';
        console.error('Save invoice failed', err);
      },
    });
  }
}
