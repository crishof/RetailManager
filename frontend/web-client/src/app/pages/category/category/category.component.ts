import { Component, OnInit, inject } from "@angular/core";
import { ICategory } from "../../../model/category.model";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { CategoryService } from "../../../services/category.service";
import { ModalDialogService } from "../../../services/modal-dialog.service";
import { CategoryDetailsComponent } from "../category-details/category-details.component";
import { PageResponse } from "../../../model/PageResponse";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-category",
  imports: [CategoryDetailsComponent, CommonModule],
  templateUrl: "./category.component.html",
  styleUrl: "./category.component.css",
})
export class CategoryComponent implements OnInit {
  categoryList: ICategory[] = [];
  selectedCategory: ICategory | null = null;

  private readonly _categoryService = inject(CategoryService);
  private readonly _router = inject(Router);
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _modalDialogService = inject(ModalDialogService);

  ngOnInit(): void {
    this.loadCategories();
    this.subscribeToCategoryUpdatedEvent();
  }

  loadCategories(page: number = 0, size: number = 50): void {
    this._categoryService.getCategories(page, size).subscribe({
      next: (response: PageResponse<ICategory>) => {
        this.categoryList = response.content || [];
        if (this.categoryList.length > 0 && !this.selectedCategory) {
          this.selectedCategory = this.categoryList[0];
        }
      },
      error: (err) => console.error("Failed to load categories", err),
    });
  }

  subscribeToCategoryUpdatedEvent(): void {
    this._categoryService.categoryUpdated$.subscribe(() => {
      this.loadCategories();
    });
  }

  showDetails(category: ICategory): void {
    this.selectedCategory = category;
  }

  openCategoryEditDialog(): void {
    this._modalDialogService.openCategoryEditDialog().subscribe({
      next: (result) => {
        // Opcional: manejar resultado si es necesario
      },
      error: (err) => console.error("Dialog error", err),
    });
  }

  getImageUrl(category: ICategory): any {
    if (category.imageUrl) {
      return this._sanitizer.bypassSecurityTrustResourceUrl(category.imageUrl);
    }
    return "../../../../assets/images/no-image-100.png";
  }

  navigateToDetails(id: string): void {
    this._router.navigate(["/category", id]);
  }
}
