import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierInvoiceService } from '../../../services/supplier-invoice.service';
import { ISupplierInvoice } from '../../../model/supplier-invoice.model';

@Component({
  selector: 'app-supplier-purchase-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-purchase-history.component.html',
  styleUrl: './supplier-purchase-history.component.css'
})
export class SupplierPurchaseHistoryComponent implements OnChanges {
  @Input() supplierId: string | null = null;

  private readonly invoiceService = inject(SupplierInvoiceService);

  invoices: ISupplierInvoice[] = [];
  loading = false;
  errorMessage = '';
  expandedInvoiceId: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['supplierId'] && this.supplierId) {
      this.loadInvoices();
    }
  }

  loadInvoices(): void {
    if (!this.supplierId) return;
    this.loading = true;
    this.errorMessage = '';
    this.invoiceService.getBySupplierId(this.supplierId).subscribe({
      next: (data) => {
        this.invoices = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las facturas.';
        this.loading = false;
      }
    });
  }

  toggleExpand(invoiceId: string): void {
    this.expandedInvoiceId = this.expandedInvoiceId === invoiceId ? null : invoiceId;
  }

  trackByInvoiceId(_: number, inv: ISupplierInvoice): string {
    return inv.id ?? '';
  }
}
