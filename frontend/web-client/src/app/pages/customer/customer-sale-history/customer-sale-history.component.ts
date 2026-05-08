import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICustomerInvoice } from '../../../model/customer-invoice.model';
import { CustomerInvoiceService } from '../../../services/customer-invoice.service';

@Component({
  selector: 'app-customer-sale-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-sale-history.component.html',
  styleUrl: './customer-sale-history.component.css'
})
export class CustomerSaleHistoryComponent implements OnChanges {
  @Input() customerId: string | null = null;

  private readonly saleService = inject(CustomerInvoiceService);

  sales: ICustomerInvoice[] = [];
  loading = false;
  errorMessage = '';
  expandedId: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customerId'] && this.customerId) {
      this.loadSales();
    } else if (!this.customerId) {
      this.sales = [];
    }
  }

  loadSales(): void {
    if (!this.customerId) return;
    this.loading = true;
    this.errorMessage = '';
    this.saleService.getByCustomerId(this.customerId).subscribe({
      next: (data) => { this.sales = data; this.loading = false; },
      error: () => { this.errorMessage = 'No se pudo cargar el historial de ventas.'; this.loading = false; }
    });
  }

  toggle(id: string | undefined): void {
    if (!id) return;
    this.expandedId = this.expandedId === id ? null : id;
  }
}
