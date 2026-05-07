import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProductPriceLink, IProductPriceHistory } from '../../model/product-price-link.model';
import { ProductPriceLinkService } from '../../services/product-price-link.service';

@Component({
  selector: 'app-price-history-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-history-modal.component.html',
  styleUrl: './price-history-modal.component.css'
})
export class PriceHistoryModalComponent implements OnInit {
  @Input() link: IProductPriceLink | null = null;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  
  private readonly priceLinkService = inject(ProductPriceLinkService);
  
  history: IProductPriceHistory[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    if (this.link) {
      this.loadHistory();
    }
  }

  loadHistory(): void {
    if (!this.link) return;
    
    this.loading = true;
    this.error = null;
    
    this.priceLinkService.getPriceHistory(this.link.id).subscribe({
      next: (data) => {
        this.history = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el historial de precios';
        console.error(err);
        this.loading = false;
      }
    });
  }

  onClose(): void {
    this.closeModal.emit();
  }

  getStatusLabel(changeType: string): string {
    return {
      'UP': '📈 Subió',
      'DOWN': '📉 Bajó',
      'NEW': '✨ Nuevo',
      'SAME': '→ Sin cambios'
    }[changeType] || changeType;
  }

  getStatusClass(changeType: string): string {
    return {
      'UP': 'status-up',
      'DOWN': 'status-down',
      'NEW': 'status-new',
      'SAME': 'status-same'
    }[changeType] || '';
  }
}
