
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ISupplier } from '../../../model/supplier.model';
import { SupplierService } from '../../../services/supplier.service';

@Component({
    selector: 'app-supplier-navbar',
    imports: [RouterLink],
    templateUrl: './supplier-navbar.component.html',
    styleUrl: './supplier-navbar.component.css'
})
export class SupplierNavbarComponent implements OnInit {
  selectedSupplier: ISupplier | null = null;
  readonly _router = inject(Router);
  readonly _supplierService = inject(SupplierService);

  ngOnInit(): void {
    this._supplierService.selectedSupplier$.subscribe((supplier) => {
      this.selectedSupplier = supplier;
    });
  }

  toStatementAccount(supplierId: string | null): void {
    if (supplierId) {
      this._router.navigate(['/statementAccount', supplierId]);
    } else {
      // Manejar el caso cuando no haya un proveedor seleccionado
      console.warn('No supplier selected');
    }
  }
}
