import { Component, Input, OnInit, inject } from "@angular/core";
import { IBrand } from "../../../model/brand.model";
import { BrandService } from "../../../services/brand.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrandDetailsComponent } from "../brand-details/brand-details.component";
import { BrandCreateComponent } from "../brand-create/brand-create.component";

@Component({
  selector: "app-brand",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrandDetailsComponent,
    BrandCreateComponent,
  ],
  templateUrl: "./brand.component.html",
  styleUrl: "./brand.component.css",
})
export class BrandComponent implements OnInit {
  private readonly brandService = inject(BrandService);

  @Input() selectionMode: "click" | "dblclick" = "click";

  brandList: IBrand[] = [];
  filteredBrandList: IBrand[] = [];

  searchTerm = "";

  sortedColumn?: keyof IBrand;
  isAscendingOrder = true;

  selectedBrand: IBrand | null = null;
  createBrand = false;

  totalElements = 0;

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.brandService.getBrands({ page: 0, size: 50 }).subscribe({
      next: (page) => {
        this.brandList = page.content;
        this.filteredBrandList = [...page.content];
        this.totalElements = page.totalElements;
      },
      error: (err) => console.error("Error loading brands", err),
    });
  }

  searchBrand(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredBrandList = [...this.brandList];
      return;
    }

    this.filteredBrandList = this.brandList.filter(
      (brand) =>
        brand.name.toLowerCase().includes(term) ||
        brand.id.toString().includes(term),
    );
  }

  sortColumn(column: keyof IBrand): void {
    this.isAscendingOrder =
      this.sortedColumn === column ? !this.isAscendingOrder : true;
    this.sortedColumn = column;

    const factor = this.isAscendingOrder ? 1 : -1;

    this.filteredBrandList.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue == null || bValue == null) return 0;
      return aValue > bValue ? factor : -factor;
    });
  }

  onBrandSelect(brand: IBrand): void {
  this.selectedBrand = brand;
  this.createBrand = false;
}

  toNewBrand(): void {
    this.createBrand = true;
    this.selectedBrand = null;
  }

  onBrandUpdated(updated: IBrand): void {
  // actualizar lista
  this.brandList = this.brandList.map((b) =>
    b.id === updated.id ? updated : b,
  );

  this.filteredBrandList = this.filteredBrandList.map((b) =>
    b.id === updated.id ? updated : b,
  );

  // actualizar seleccionado
  this.selectedBrand = updated;
}
}
