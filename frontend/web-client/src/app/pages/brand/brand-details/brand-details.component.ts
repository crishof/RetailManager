import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  inject,
  OnDestroy,
} from "@angular/core";
import { IBrand } from "../../../model/brand.model";
import { BrandService } from "../../../services/brand.service";
import { ProductService } from "../../../services/product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDialogService } from "../../../services/modal-dialog.service";
import { DomSanitizer } from "@angular/platform-browser";
import { BrandEditComponent } from "../brand-edit/brand-edit.component";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-brand-details",
  standalone: true,
  imports: [BrandEditComponent],
  templateUrl: "./brand-details.component.html",
  styleUrl: "./brand-details.component.css",
})
export class BrandDetailsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() brand: IBrand | null = null;

  loading = false;
  editingMode = false;

  successMessage = "";
  errorMessage = "";
  productsQuantity = 0;

  private readonly destroy$ = new Subject<void>();

  private readonly route = inject(ActivatedRoute);
  private readonly brandService = inject(BrandService);
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  private readonly confirmDialogService = inject(ModalDialogService);
  private readonly sanitizer = inject(DomSanitizer);

  // ============================
  // LIFECYCLE
  // ============================
  ngOnInit(): void {
    // 👉 SOLO usar la ruta si NO viene brand por Input
    if (!this.brand) {
      this.listenRoute();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["brand"] && this.brand) {
      this.editingMode = false;
      this.loadProductsQuantity(this.brand.id);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ============================
  // DATA LOADERS
  // ============================
  private listenRoute(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(({ id }) => {
      if (!id) return;

      this.loading = true;

      this.brandService.getBrand(id).subscribe({
        next: (brand) => {
          this.brand = brand;
          this.loadProductsQuantity(brand.id);
          this.loading = false;
        },
        error: (err) => {
          console.error("Error loading brand", err);
          this.loading = false;
        },
      });
    });
  }

  private loadProductsQuantity(brandId: string): void {
    this.productsQuantity = 0; // 👈 reset visual inmediato

    this.productService
      .countProducts({ brandId })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (count) => (this.productsQuantity = count),
        error: (err) => {
          console.error("Error counting products", err);
          this.productsQuantity = 0;
        },
      });
  }

  // ============================
  // UI ACTIONS
  // ============================
  startEditing(): void {
    this.editingMode = true;
    this.successMessage = "";
    this.errorMessage = "";
  }

  cancelEditing(): void {
    this.editingMode = false;
  }

  saveChanges(updatedBrand: IBrand): void {
    this.brand = updatedBrand;
    this.editingMode = false;
    this.successMessage = `Brand "${updatedBrand.name}" saved successfully`;
    this.loadProductsQuantity(updatedBrand.id);
  }

  confirmDelete(): void {
    if (!this.brand?.id) return;

    this.confirmDialogService.openConfirmDialog().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteBrand(this.brand!.id);
      }
    });
  }

  private deleteBrand(id: string): void {
    this.brandService.deleteBrand(id).subscribe({
      next: () => {
        this.successMessage = "Brand deleted successfully";
        this.router.navigate(["/brand"]);
      },
      error: () => {
        this.errorMessage = "Error deleting brand";
      },
    });
  }

  goToList(): void {
    this.router.navigate(["/brand"]);
  }

  // ============================
  // HELPERS
  // ============================
  getImageUrl(image: any): any {
    if (!image?.content) return null;

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/jpeg;base64,${image.content}`,
    );
  }
}
