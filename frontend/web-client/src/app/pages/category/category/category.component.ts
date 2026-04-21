import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { ICategory } from "../../../model/category.model";
import { DomSanitizer } from "@angular/platform-browser";
import { CategoryService } from "../../../services/category.service";
import { ModalDialogService } from "../../../services/modal-dialog.service";
import { PageResponse } from "../../../model/PageResponse";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductService } from "../../../services/product.service";

interface CategoryTreeNode {
  id: string;
  name: string;
  imageUrl?: string;
  children?: CategoryTreeNode[];
}

interface CategoryMoveOption {
  id: string;
  label: string;
}

@Component({
  selector: "app-category",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./category.component.html",
  styleUrl: "./category.component.css",
})
export class CategoryComponent implements OnInit {
  categoryList: ICategory[] = [];
  filteredCategoryList: ICategory[] = [];
  categoryTree: CategoryTreeNode[] = [];
  moveOptions: CategoryMoveOption[] = [];
  invalidMoveTargetIds = new Set<string>();

  selectedCategory: ICategory | null = null;
  selectedCategoryProducts = 0;

  private readonly _categoryService = inject(CategoryService);
  private readonly _productService = inject(ProductService);
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _modalDialogService = inject(ModalDialogService);
  private readonly fb = inject(FormBuilder);

  loading = false;
  detailLoading = false;
  searchTerm = "";
  totalElements = 0;
  successMessage = "";
  errorMessage = "";

  createModalOpen = false;
  editModalOpen = false;
  savingCreate = false;
  savingEdit = false;
  createImageFile: File | null = null;
  editImageFile: File | null = null;

  readonly createForm = this.fb.group({
    name: ["", Validators.required],
    parentId: [""],
    width: [null as number | null],
    height: [null as number | null],
    depth: [null as number | null],
    unit: ["cm"],
  });

  readonly editForm = this.fb.group({
    name: ["", Validators.required],
    width: [null as number | null],
    height: [null as number | null],
    depth: [null as number | null],
    unit: ["cm"],
    newParentId: [""],
  });

  ngOnInit(): void {
    this.loadCategories();
    this.loadTree();
    this.subscribeToCategoryUpdatedEvent();
  }

  loadCategories(page: number = 0, size: number = 50): void {
    this.loading = true;
    this.errorMessage = "";

    this._categoryService.getCategories(page, size).subscribe({
      next: (response: PageResponse<ICategory>) => {
        this.categoryList = response.content || [];
        this.filteredCategoryList = [...this.categoryList];
        this.totalElements = response.totalElements;

        if (this.categoryList.length > 0 && !this.selectedCategory) {
          this.showDetails(this.categoryList[0]);
        }

        this.loading = false;
      },
      error: (err) => {
        console.error("Failed to load categories", err);
        this.errorMessage = "No se pudieron cargar las categorías.";
        this.loading = false;
      },
    });
  }

  loadTree(): void {
    this._categoryService.getTree().subscribe({
      next: (tree) => {
        this.categoryTree = tree ?? [];
        this.moveOptions = this.flattenTree(this.categoryTree);
        this.refreshInvalidMoveTargets();
      },
      error: () => {
        this.categoryTree = [];
        this.moveOptions = [];
      },
    });
  }

  subscribeToCategoryUpdatedEvent(): void {
    this._categoryService.categoryUpdated$.subscribe(() => {
      this.loadCategories();
      this.loadTree();
    });
  }

  searchCategory(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredCategoryList = [...this.categoryList];
      return;
    }

    this.filteredCategoryList = this.categoryList.filter(
      (category) =>
        category.name.toLowerCase().includes(term) ||
        category.id.toLowerCase().includes(term),
    );
  }

  showDetails(category: ICategory): void {
    this.selectedCategory = category;
    this.detailLoading = true;
    this.refreshInvalidMoveTargets();

    this._productService.countProducts({ categoryId: category.id }).subscribe({
      next: (count) => {
        this.selectedCategoryProducts = count;
        this.detailLoading = false;
      },
      error: () => {
        this.selectedCategoryProducts = 0;
        this.detailLoading = false;
      },
    });
  }

  openCreateModal(): void {
    this.createForm.reset({
      name: "",
      parentId: "",
      width: null,
      height: null,
      depth: null,
      unit: "cm",
    });
    this.createImageFile = null;
    this.createModalOpen = true;
    this.errorMessage = "";
    this.successMessage = "";
  }

  closeCreateModal(): void {
    this.createModalOpen = false;
  }

  openEditModal(): void {
    if (!this.selectedCategory) return;

    this.editForm.reset({
      name: this.selectedCategory.name,
      width: this.selectedCategory.width ?? null,
      height: this.selectedCategory.height ?? null,
      depth: this.selectedCategory.depth ?? null,
      unit: this.selectedCategory.unit ?? "cm",
      newParentId: this.selectedCategory.parentId ?? "",
    });

    this.editImageFile = null;
    this.editModalOpen = true;
    this.errorMessage = "";
    this.successMessage = "";
  }

  closeEditModal(): void {
    this.editModalOpen = false;
  }

  onCreateImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.createImageFile = input.files?.[0] ?? null;
  }

  onEditImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.editImageFile = input.files?.[0] ?? null;
  }

  submitCreate(): void {
    this.errorMessage = "";
    this.successMessage = "";

    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const value = this.createForm.getRawValue();
    this.savingCreate = true;

    this._categoryService
      .createCategory(
        value.name?.trim() ?? "",
        value.parentId || undefined,
        this.createImageFile ?? undefined,
        {
          width: value.width,
          height: value.height,
          depth: value.depth,
          unit: value.unit,
        },
      )
      .subscribe({
        next: (category) => {
          this.savingCreate = false;
          this.createModalOpen = false;
          this.successMessage = "Categoría creada correctamente.";
          this.loadCategories();
          this.loadTree();
          this.showDetails(category);
        },
        error: () => {
          this.savingCreate = false;
          this.errorMessage = "No se pudo crear la categoría.";
        },
      });
  }

  submitEdit(): void {
    if (!this.selectedCategory) return;

    this.errorMessage = "";
    this.successMessage = "";

    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const value = this.editForm.getRawValue();
    this.savingEdit = true;

    this._categoryService
      .updateCategory(
        this.selectedCategory.id,
        value.name?.trim() ?? "",
        this.editImageFile ?? undefined,
        {
          width: value.width,
          height: value.height,
          depth: value.depth,
          unit: value.unit,
        },
      )
      .subscribe({
        next: (updatedCategory) => {
          const newParentId = value.newParentId || undefined;
          const previousParentId = this.selectedCategory?.parentId || undefined;
          const parentChanged = newParentId !== previousParentId;

          if (parentChanged) {
            this._categoryService
              .changeParent(updatedCategory.id, newParentId)
              .subscribe({
                next: (movedCategory) => {
                  this.finishEdit(movedCategory);
                },
                error: () => {
                  this.savingEdit = false;
                  this.errorMessage = "Se actualizó la categoría, pero no se pudo mover de nivel.";
                  this.loadCategories();
                  this.loadTree();
                },
              });
            return;
          }

          this.finishEdit(updatedCategory);
        },
        error: () => {
          this.savingEdit = false;
          this.errorMessage = "No se pudo actualizar la categoría.";
        },
      });
  }

  confirmDeleteCategory(): void {
    if (!this.selectedCategory) return;

    this._modalDialogService.openConfirmDialog().subscribe((confirmed) => {
      if (!confirmed || !this.selectedCategory) return;

      this._categoryService.deleteCategory(this.selectedCategory.id).subscribe({
        next: () => {
          this.successMessage = "Categoría eliminada correctamente.";
          this.errorMessage = "";
          this.selectedCategory = null;
          this.loadCategories();
          this.loadTree();
        },
        error: () => {
          this.errorMessage = "No se pudo eliminar la categoría.";
        },
      });
    });
  }

  getImageUrl(category: ICategory | null): any {
    if (!category) return "../../../../assets/images/no-image-100.png";

    if (category.imageUrl) {
      return this._sanitizer.bypassSecurityTrustResourceUrl(category.imageUrl);
    }

    return "../../../../assets/images/no-image-100.png";
  }

  hasError(formType: "create" | "edit", field: "name", error: string): boolean {
    const control =
      formType === "create"
        ? this.createForm.controls.name
        : this.editForm.controls.name;
    return !!(control && control.touched && control.hasError(error));
  }

  canMoveTo(optionId: string): boolean {
    return !this.invalidMoveTargetIds.has(optionId);
  }

  trackByCategoryId(_: number, category: ICategory): string {
    return category.id;
  }

  trackByOptionId(_: number, option: CategoryMoveOption): string {
    return option.id;
  }

  private finishEdit(updatedCategory: ICategory): void {
    this.savingEdit = false;
    this.editModalOpen = false;
    this.successMessage = "Categoría actualizada correctamente.";
    this.loadCategories();
    this.loadTree();
    this.showDetails(updatedCategory);
  }

  private flattenTree(nodes: CategoryTreeNode[], depth = 0): CategoryMoveOption[] {
    return nodes.flatMap((node) => {
      const prefix = "  ".repeat(depth);
      const current: CategoryMoveOption = {
        id: node.id,
        label: `${prefix}${depth > 0 ? "↳ " : ""}${node.name}`,
      };

      const children = this.flattenTree(node.children ?? [], depth + 1);
      return [current, ...children];
    });
  }

  private refreshInvalidMoveTargets(): void {
    this.invalidMoveTargetIds.clear();
    if (!this.selectedCategory) return;

    this.invalidMoveTargetIds.add(this.selectedCategory.id);

    const descendants = this.collectDescendants(this.selectedCategory.id, this.categoryTree);
    descendants.forEach((id) => this.invalidMoveTargetIds.add(id));
  }

  private collectDescendants(categoryId: string, nodes: CategoryTreeNode[]): string[] {
    for (const node of nodes) {
      if (node.id === categoryId) {
        return this.collectAllNodeIds(node.children ?? []);
      }

      const found = this.collectDescendants(categoryId, node.children ?? []);
      if (found.length) return found;
    }

    return [];
  }

  private collectAllNodeIds(nodes: CategoryTreeNode[]): string[] {
    return nodes.flatMap((node) => [node.id, ...this.collectAllNodeIds(node.children ?? [])]);
  }
}
