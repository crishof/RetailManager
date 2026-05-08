import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAccountMovement, ISupplierPaymentRequest, SupplierInvoiceService } from '../../../services/supplier-invoice.service';

@Component({
  selector: 'app-supplier-account-statement',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './supplier-account-statement.component.html',
  styleUrl: './supplier-account-statement.component.css'
})
export class SupplierAccountStatementComponent implements OnChanges {
  @Input() supplierId: string | null = null;

  private readonly svc = inject(SupplierInvoiceService);
  private readonly fb = inject(FormBuilder);

  movements: IAccountMovement[] = [];
  filtered: IAccountMovement[] = [];
  loading = false;
  errorMessage = '';

  // Filters
  filterType: 'ALL' | 'INVOICE' | 'PAYMENT' = 'ALL';
  filterFrom = '';
  filterTo = '';

  // Payment form
  showPaymentForm = false;
  isSaving = false;
  saveError = '';
  paymentForm!: FormGroup;

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
}
