import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ISupplier } from '../../../model/supplier.model';
import { Router } from '@angular/router';
import { SupplierService } from '../../../services/supplier.service';
import { SupplierNavbarComponent } from '../supplier-navbar/supplier-navbar.component';
import { SupplierDetailsComponent } from '../supplier-details/supplier-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-supplier',
    imports: [
        CommonModule,
        SupplierNavbarComponent,
        SupplierDetailsComponent,
        FormsModule,
        ReactiveFormsModule,
        NgClass,
    ],
    templateUrl: './supplier.component.html',
    styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit {
  supplierList: ISupplier[] = [];
  readonly _supplierService = inject(SupplierService);
  readonly _router = inject(Router);

  private subscription?: Subscription;

  ngOnInit(): void {
  this._supplierService.getAllSuppliers().subscribe({
    next: (data: ISupplier[]) => {
      this.supplierList = data;
    },
    error: (err) => {
      console.error('Error loading suppliers', err);
    }
  });
}

  searchTerm: string = '';
  isFormSubmitted: boolean = false;
  selectedComponent: string = 'supplier';
  selectedSupplier: ISupplier | null = null;
  currentSupplier: ISupplier | null = null;

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onFormSubmit();
    }
  }

  onFormSubmit() {
    this.searchSuppliers();
  }

  searchSuppliers(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this._supplierService
      .getAllByFilter(this.searchTerm)
      .subscribe((data: ISupplier[]) => {
        this.supplierList = data;
      });
  }

  selectSupplier(supplier: ISupplier) {
    this._supplierService.setSelectedSupplier(supplier);
    this.currentSupplier = supplier;
  }

  navegate(id: string): void {
    this._router.navigate(['/supplier/' + id]);
  }
}
