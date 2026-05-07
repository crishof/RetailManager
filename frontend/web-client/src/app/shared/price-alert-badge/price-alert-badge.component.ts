import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProductPriceLink } from '../../model/product-price-link.model';

@Component({
  selector: 'app-price-alert-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-alert-badge.component.html',
  styleUrl: './price-alert-badge.component.css'
})
export class PriceAlertBadgeComponent {
  @Input() alerts: IProductPriceLink[] = [];

  getIcon(status: string): string {
    return {
      'UP': 'trending_up',
      'DOWN': 'trending_down',
      'NEW': 'new_releases',
      'SAME': 'check'
    }[status] || 'info';
  }

  getLabel(status: string): string {
    return {
      'UP': 'Subió',
      'DOWN': 'Bajó',
      'NEW': 'Nuevo',
      'SAME': 'Sin cambios'
    }[status] || status;
  }
}
