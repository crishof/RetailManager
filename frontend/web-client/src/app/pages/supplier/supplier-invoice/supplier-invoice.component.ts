import { CommonModule, NgClass } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductSearchComponent } from '../../product/product-search/product-search.component';
import { ProductListComponent } from '../../product/product-list/product-list.component';
import { IProduct } from '../../../model/product.model';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { InvoiceItemsComponent } from './invoice-items/invoice-items.component';
import { ISupplier } from '../../../model/supplier.model';
import { SupplierService } from '../../../services/supplier.service';
import { ISupplierInvoice } from '../../../model/supplier-invoice.model';
import { IInvoiceItem } from '../../../model/invoice-item.model';
import { SupplierInvoiceService } from '../../../services/supplier-invoice.service';
import { BranchService } from '../../../services/branch.service';
import { ILocation } from '../../../model/location.model';
import { IBranch } from '../../../model/branch.model';

@Component({
    selector: 'app-supplier-invoice',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        ProductSearchComponent,
        ProductListComponent,
        InvoiceItemsComponent,
        NgClass,
    ],
    templateUrl: './supplier-invoice.component.html',
    styleUrl: './supplier-invoice.component.css'
})
export class SupplierInvoiceComponent implements OnInit {
  private subscription?: Subscription;
  readonly _productService = inject(ProductService);
  readonly _supplierService = inject(SupplierService);
  dateControl = new FormControl(new Date());

  @Input() invoice: ISupplierInvoice | undefined;

  invoiceForm!: FormGroup;
  formBuilder = inject(FormBuilder);

  selectedComponent: string = 'header';

  suppliers: any[] = [];
  branches: IBranch[] = [];
  locations: ILocation[] = [];
  supplierList: ISupplier[] = [];
  selectedSupplierId: string = '';
  selectedBranchId: string = '';

  filterByThisSupplier: boolean = false;

  _supplierInvoice?: ISupplierInvoice;
  _supplierInvoiceService = inject(SupplierInvoiceService);
  _branchService = inject(BranchService);

  productList: IProduct[] = [];
  invoiceItems: IInvoiceItem[] = [];

  selectedProduct: IProduct | null = null;
  isFormSubmitted: boolean = false;
  searchTerm: string = '';

  totalInvoiceUnits: number = 0;

  invoiceItemsFormArray: FormArray<FormGroup> = new FormArray<FormGroup>([]);

  vat21: number = 0.21;
  vat105: number = 0.105;
  vat27: number = 0.27;
  vat0: number = 0;

  ngOnInit(): void {
    this.loadSuppliers();
    this.loadBranches();
    this.dateControl.setValue(new Date());

    this.initForm();
  }

  initForm(): void {
    this.invoiceForm = this.formBuilder.group({
      supplierId: ['', Validators.required],
      invoiceType: ['', Validators.required],
      invoiceDate: [new Date(), Validators.required],
      receptionDate: new Date(),
      dueDate: new Date(),
      savedDate: new Date(),
      branchId: ['', Validators.required],
      locationId: ['', Validators.required],
      packingListPrefix: 0,
      packingListNumber: 0,
      invoicePrefix: [0, Validators.required],
      invoiceNumber: [0, Validators.required],
      saveStocks: true,
      taxSave: true,
      fixedAsset: false,
      askForPriceUpdate: false,
      observations: '',

      subtotal1: 0,
      discount: 0,
      interest: 0,
      subtotal2: 0,

      netValue21: 0,
      netValue105: 0,
      netValue27: 0,
      netValue0: 0,

      vat21: 0,
      vat105: 0,
      vat27: 0,
      internalTax: 0,

      withholdingVat: 0,
      withholdingSuss: 0,
      withholdingGrossReceiptsTax: 0,
      withholdingIncome: 0,
      stateTax: 0,
      localTax: 0,
      rounding: 0,
      totalPrice: 0,
    });

    // Suscribirse a los cambios en el control branchId
    this.invoiceForm.get('branchId')!.valueChanges.subscribe((branchId) => {
      this.onBranchChange(branchId);
    });
  }

  onInvoiceItemChange(updatedItems: IInvoiceItem[]): void {
    this.invoiceItems = updatedItems;
    this.getTotalInvoiceUnits();
  }

  getTotalInvoiceUnits(): void {
    this.totalInvoiceUnits = Number(
      this.invoiceItems.reduce((total, item) => total + item.quantity, 0)
    );
  }

  getSubtotal1(): number {
    const subtotal1 = this.invoiceItems.reduce((total, item) => {
      const discount = item.discountRate ?? 0;
      const discountedPrice = item.price * ((100 - discount) / 100);
      return total + discountedPrice * item.quantity;
    }, 0);

    this.invoiceForm.patchValue({
      subtotal1: subtotal1,
    });

    return subtotal1;
  }

  getSubtotal2(): number {
    const subtotal1 = this.invoiceForm.get('subtotal1')?.value;
    const discount = this.invoiceForm.get('discount')?.value;
    const interest = this.invoiceForm.get('interest')?.value;

    let subtotal2 = subtotal1;

    if (discount !== 0) {
      const discountPercentage = Math.min(Math.max(discount, 0), 100) / 100;
      subtotal2 *= 1 - discountPercentage;
    }

    if (interest !== 0) {
      const interestPercentage = Math.min(Math.max(interest, 0), 100) / 100;
      subtotal2 *= 1 + interestPercentage;
    }

    this.invoiceForm.patchValue({
      subtotal2: subtotal2,
    });

    return subtotal2;
  }

  getNetVat(vat: number): number {
    return this.calculateNetVat(vat);
  }

  calculateNetVat(vat: number): number {
    const discount = Number.parseFloat(this.invoiceForm.get('discount')?.value || '0');
    const interest = Number.parseFloat(this.invoiceForm.get('interest')?.value || '0');

    const total = this.invoiceItems.reduce((acc, item) => {
      if (item.taxRate == vat) {
        const itemDiscount = item.discountRate ?? 0;
        return acc + item.price * ((100 - itemDiscount) / 100);
      } else {
        return acc;
      }
    }, 0);

    const netVat = total * ((100 - discount) / 100) * ((100 + interest) / 100);

    switch (vat) {
      case this.vat21:
        this.invoiceForm.patchValue({
          netVat21: netVat,
        });
        break;
      case this.vat105:
        this.invoiceForm.patchValue({
          netVat105: netVat,
        });
        break;
      case this.vat27:
        this.invoiceForm.patchValue({
          netVat27: netVat,
        });
        break;
      case this.vat0:
        this.invoiceForm.patchValue({
          netVat0: netVat,
        });
        break;
    }

    return netVat;
  }

  getVatAmount(vat: number): number {
    return this.calculateVat(vat);
  }

  calculateVat(vat: number): number {
    const netVat: number = this.getNetVat(vat);
    const calculatedVat: number = (netVat * ((100 + vat) / 100) - netVat) * 100;

    switch (vat) {
      case this.vat21:
        this.invoiceForm.patchValue({
          vat21: calculatedVat,
        });
        break;
      case this.vat105:
        this.invoiceForm.patchValue({
          vat105: calculatedVat,
        });
        break;
      case this.vat27:
        this.invoiceForm.patchValue({
          vat27: calculatedVat,
        });
        break;
    }

    return calculatedVat;
  }

  getInternalTax() {
    //TODO Implement internal tax calculation
  }

  getInvoiceTotal() {
    const total: number =
      Number.parseFloat(this.invoiceForm.get('subtotal2')?.value || '0') +
      Number.parseFloat(this.invoiceForm.get('vat21')?.value || '0') +
      Number.parseFloat(this.invoiceForm.get('vat105')?.value || '0') +
      Number.parseFloat(this.invoiceForm.get('vat27')?.value || '0') +
      Number.parseFloat(this.invoiceForm.get('withholdingVat')?.value || '0') +
      Number.parseFloat(this.invoiceForm.get('withholdingSuss')?.value || '0') +
      Number.parseFloat(
        this.invoiceForm.get('withholdingGrossReceiptsTax')?.value || '0'
      ) +
      Number.parseFloat(this.invoiceForm.get('withholdingIncome')?.value || '0') +
      Number.parseFloat(this.invoiceForm.get('stateTax')?.value || '0') +
      Number.parseFloat(this.invoiceForm.get('localTax')?.value || '0') +
      Number.parseFloat(this.invoiceForm.get('rounding')?.value || '0');

    this.invoiceForm.patchValue({
      totalPrice: total,
    });
    return total;
  }

  saveInvoice() {
    const formData = this.invoiceForm.value;
    formData.invoiceItemsRequest = this.invoiceItems;
    if (this.invoiceForm.valid && this.invoiceItems.length > 0) {
      this._supplierInvoiceService.saveInvoice(formData).subscribe({
  next: (response) => {
    console.log(response.message);
  },
  error: (error: any) => {
    console.error(error.message);
  },
  complete: () => {
    console.log('Invoice request completed');
  }
});
    } else {
      // El formulario no es válido, imprime los campos inválidos y sus errores
      console.log('El formulario no es válido. Campos inválidos:');
      Object.keys(this.invoiceForm.controls).forEach((key) => {
        const control = this.invoiceForm.get(key);
        if (control?.errors) {
          console.log(key + ':', control.errors);
        }
      });

      // Marca los campos inválidos como tocados para mostrar mensajes de error en el HTML
      Object.values(this.invoiceForm.controls).forEach((control) => {
        if (control instanceof FormControl) {
          control.markAsTouched();
        }
      });
    }
  }

  selectProduct(product: IProduct): void {
    const invoiceItem: IInvoiceItem = {
      id: product.id,
      brandName: product.brandName,
      model: product.model,
      description: product.description,
      price: product.priceResponse.purchasePrice,
      taxRate: product.priceResponse.taxRate,
      discountRate: product.priceResponse.discount,
      quantity: 1,
    };
    this.invoiceItems.push(invoiceItem);
  }

  loadSuppliers() {
  this._supplierService.getAllSuppliers().subscribe({
    next: (suppliers) => {
      this.suppliers = suppliers;
    },
    error: (error: HttpErrorResponse) => {
      console.error('Error loading supplier list', error);
    }
  });
}

  onSupplierChange(supplierId: any) {
    this.selectedSupplierId = supplierId;
  }

  loadBranches() {
  this._branchService.getBranches().subscribe({
    next: (branches: IBranch[]) => {
      this.branches = branches;
    },
    error: (error: HttpErrorResponse) => {
      console.error('Error loading branches list', error.message);
    },
    complete: () => {
      console.log('Branches loaded');
    }
  });
}

  onBranchChange(branchId: string) {
    this.selectedBranchId = branchId;
    this.getLocations(branchId);
    this.invoiceForm.get('locationId')!.setValue('');
  }

  getLocations(branchId: string) {
    const branch = this.branches.find((branch) => branch.id == branchId);
    this.locations = branch ? branch.locations : [];
  }

  onThisSupplierChange(): void {
    if (this.filterByThisSupplier) {
      this.filterByThisSupplier = false;
      this.selectedSupplierId = '';
    } else {
      this.filterByThisSupplier = true;
      this.selectedSupplierId = this.invoiceForm.get('supplierId')?.value;
    }
  }

  handleSearch(searchTerm: string): void {
    this.isFormSubmitted = true;
    if (searchTerm.length >= 3) {
      if (this.filterByThisSupplier && this.selectedSupplierId) {
        this.searchProducts(searchTerm, this.selectedSupplierId);
      } else {
        this.searchProducts(searchTerm);
      }
    } else {
      this.productList = [];
    }
  }

  handleSearchWithStock(searchTerm: string): void {
    this.isFormSubmitted = true;
    if (searchTerm.length >= 3) {
      if (this.filterByThisSupplier && this.selectedSupplierId) {
        this.searchProductsWithStock(searchTerm, this.selectedSupplierId);
      } else {
        this.searchProductsWithStock(searchTerm);
      }
    } else {
      this.productList = [];
    }
  }

  searchProducts(searchTerm: string, supplierId?: string): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this._productService
      .getAllByFilter(searchTerm, supplierId)
      .subscribe({
        next: (data: IProduct[]) => {
          this.productList = data;
        },
        error: (err) => {
          console.error('Failed to load products', err);
        },
      });
  }

  searchProductsWithStock(searchTerm: string, supplierId?: string): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this._productService
      .getAllByFilterAndStock(searchTerm, supplierId)
      .subscribe({
        next: (data: IProduct[]) => {
          this.productList = data;
        },
        error: (err) => {
          console.error('Failed to load products', err);
        },
      });
  }
}
