import { Component, Input, OnChanges, SimpleChanges, inject, OnDestroy } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { SupplierInvoiceService, IAccountMovement, ISupplierPaymentRequest } from '../../../services/supplier-invoice.service';

interface IInvoiceDetail {
  id: string;
  supplierId: string;
  invoiceType: string;
  invoiceDate: string;
  dueDate: string;
  receptionDate: string;
  savedDate: string;
  invoiceNumber: string;
  packingListNumber?: string;
  observations?: string;
  currency: string;
  subtotal1: number;
  discount: number;
  interest: number;
  subtotal2: number;
  netValue21: number;
  vat21: number;
  netValue105: number;
  vat105: number;
  netValue27: number;
  vat27: number;
  netValue0: number;
  internalTax: number;
  rounding: number;
  totalPrice: number;
  invoiceItems: Array<{
    productId: string;
    quantity: number;
    price: number;
    taxRate: number;
    discountRate: number;
  }>;
}

@Component({
  selector: 'app-supplier-account-statement',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './supplier-account-statement.component.html',
  styleUrl: './supplier-account-statement.component.css'
})
export class SupplierAccountStatementComponent implements OnChanges, OnDestroy {
  @Input() supplierId: string | null = null;

  private readonly svc = inject(SupplierInvoiceService);
  private readonly fb = inject(FormBuilder);
  private readonly destroy$ = new Subject<void>();

  movements: IAccountMovement[] = [];
  filtered: IAccountMovement[] = [];
  loading = false;
  errorMessage = '';

  filterType: 'ALL' | 'INVOICE' | 'PAYMENT' = 'ALL';
  filterFrom = '';
  filterTo = '';

  showPaymentForm = false;
  isSaving = false;
  saveError = '';
  paymentForm!: FormGroup;

  invoiceDetail: IInvoiceDetail | null = null;
  showInvoiceModal = false;
  loadingInvoice = false;

  get balance(): number {
    return this.movements.length > 0 ? this.movements[this.movements.length - 1].balance : 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['supplierId'] && this.supplierId) {
      this.initPaymentForm();
      this.load();
    } else if (!this.supplierId) {
      this.movements = [];
      this.filtered = [];
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initPaymentForm(): void {
    this.paymentForm = this.fb.group({
      paymentDate: [new Date().toISOString().substring(0, 10), Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      paymentMethod: ['', Validators.required],
      reference: [''],
      description: [''],
    });
  }

  load(): void {
    if (!this.supplierId) return;
    this.loading = true;
    this.errorMessage = '';
    this.svc.getAccountStatement(this.supplierId).subscribe({
      next: (data) => {
        this.movements = data;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el estado de cuenta.';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filtered = this.movements.filter(m => {
      if (this.filterType !== 'ALL' && m.type !== this.filterType) return false;
      if (this.filterFrom && m.date < this.filterFrom) return false;
      if (this.filterTo && m.date > this.filterTo) return false;
      return true;
    });
  }

  openPaymentForm(): void {
    this.initPaymentForm();
    this.saveError = '';
    this.showPaymentForm = true;
  }

  cancelPayment(): void {
    this.showPaymentForm = false;
    this.saveError = '';
  }

  submitPayment(): void {
    if (this.paymentForm.invalid) { this.paymentForm.markAllAsTouched(); return; }
    if (!this.supplierId) return;
    this.isSaving = true;
    this.saveError = '';
    const payload: ISupplierPaymentRequest = this.paymentForm.value;
    this.svc.savePayment(this.supplierId, payload).subscribe({
      next: () => {
        this.isSaving = false;
        this.showPaymentForm = false;
        this.load();
      },
      error: (err) => {
        this.isSaving = false;
        this.saveError = err?.error?.message ?? 'Error al registrar el pago.';
      }
    });
  }

  openInvoice(invoiceId: string): void {
    this.loadingInvoice = true;
    this.showInvoiceModal = true;
    this.invoiceDetail = null;
    this.svc.getInvoiceById(invoiceId).subscribe({
      next: (data: any) => {
        this.invoiceDetail = data;
        this.loadingInvoice = false;
      },
      error: () => {
        this.loadingInvoice = false;
      }
    });
  }

  closeInvoice(): void {
    this.showInvoiceModal = false;
    this.invoiceDetail = null;
  }

  formatInvoiceNumber(num: string): string {
    if (!num) return '';
    const parts = num.split(' - ');
    return parts.length === 2 ? `00001-${parts[1]}` : num;
  }

  calcLineSubtotal(item: any): number {
    const qty = item.quantity ?? 1;
    const gross = (item.price ?? 0) * qty;
    return gross * (1 - (item.discountRate ?? 0) / 100);
  }

  get invoiceSubtotal(): number {
    if (!this.invoiceDetail) return 0;
    return (this.invoiceDetail.invoiceItems ?? []).reduce((acc, i) => acc + this.calcLineSubtotal(i), 0);
  }

  get invoiceCurrency(): string {
    return this.invoiceDetail?.currency || 'ARS';
  }

  trackByMovementId(_: number, m: IAccountMovement): string {
    return m.id;
  }
}
