import { CommonModule, NgClass } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { ISupplier } from "../../../model/supplier.model";
import { Router } from "@angular/router";
import { SupplierService } from "../../../services/supplier.service";
import { SupplierNavbarComponent } from "../supplier-navbar/supplier-navbar.component";
import { SupplierDetailsComponent } from "../supplier-details/supplier-details.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Subscription } from "rxjs";

type SupplierTab = "supplier" | "margenes" | "contactos" | "inscripciones";

@Component({
  selector: "app-supplier",
  standalone: true,
  imports: [
    CommonModule,
    SupplierNavbarComponent,
    SupplierDetailsComponent,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: "./supplier.component.html",
  styleUrl: "./supplier.component.css",
})
export class SupplierComponent implements OnInit {
  private readonly supplierService = inject(SupplierService);
  private readonly router = inject(Router);

  supplierList: ISupplier[] = [];
  currentSupplier: ISupplier | null = null;

  searchTerm = "";
  isFormSubmitted = false;

  selectedComponent: SupplierTab = "supplier";

  readonly tabs: SupplierTab[] = [
    "supplier",
    "margenes",
    "contactos",
    "inscripciones",
  ];

  private subscription?: Subscription;

  ngOnInit(): void {
    this.loadAllSuppliers();
  }

  loadAllSuppliers(): void {
    this.subscription?.unsubscribe();
    this.subscription = this.supplierService.getSuppliers().subscribe({
      next: (data) => (this.supplierList = data),
      error: (err) => console.error("Error loading suppliers", err),
    });
  }

  onKeyUp(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.onFormSubmit();
    }
  }

  onFormSubmit(): void {
    this.isFormSubmitted = true;

    if (this.searchTerm.length < 3) {
      this.supplierList = [];
      return;
    }

    this.subscription?.unsubscribe();
    this.subscription = this.supplierService
      .getSuppliers(this.searchTerm)
      .subscribe({
        next: (data) => (this.supplierList = data),
        error: (err) => console.error("Error searching suppliers", err),
      });
  }

  selectSupplier(supplier: ISupplier): void {
    this.supplierService.setSelectedSupplier(supplier);
    this.currentSupplier = supplier;
  }

  navigate(id: string): void {
    this.router.navigate(["/supplier", id]);
  }
}
