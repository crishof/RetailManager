import { Component, Input } from '@angular/core';
import { ISupplier } from '../../../model/supplier.model';

@Component({
    selector: 'app-supplier-details',
    imports: [],
    templateUrl: './supplier-details.component.html',
    styleUrl: './supplier-details.component.css'
})
export class SupplierDetailsComponent {
  @Input() supplier: ISupplier | null = null;
}
