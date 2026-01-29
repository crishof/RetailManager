import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ICategory } from '../../../model/category.model';
import { Subject } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ModalDialogService } from '../../../services/modal-dialog.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryEditComponent } from '../category-edit/category-edit.component';

@Component({
    selector: 'app-category-details',
    imports: [FormsModule, CategoryEditComponent],
    templateUrl: './category-details.component.html',
    styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent implements OnChanges {
  loading: boolean = true;
  public category?: ICategory;
  editingMode: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  @Input() selectedCategory: { [key: string]: any } | null = null;

  private brandUpdatedSubject: Subject<ICategory> = new Subject<ICategory>();

  constructor(
    private _categoryService: CategoryService,
    private _confirmDialogService: ModalDialogService,
    private _sanitizer: DomSanitizer,
    private _router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategory'] && this.selectedCategory) {
      this.loadCategoryData();
    }
  }

  loadCategoryData(): void {
    if (this.selectedCategory && this.selectedCategory['id']) {
      this.loading = true;
      this._categoryService
        .getCategory(this.selectedCategory['id'])
        .subscribe((data: ICategory) => {
          this.category = data;
          this.loading = false;
        });
    }
  }

  ngOnInit() {
    this.subscribeToCategoryUpdatedEvent();
  }

  private subscribeToCategoryUpdatedEvent(): void {
    this._categoryService.getCategoryUpdatedObservable().subscribe(() => {
      this.loadCategoryData();
    });
  }

  startEditing(): void {
    this.editingMode = true;
  }

  cancelEditing(): void {
    this.editingMode = false;
  }

  goToList(): void {
    this._router.navigate(['/category']);
  }

  getImageUrl(image: any): any {
    const base64Image = image.content;
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpeg;base64,' + base64Image
    );
  }

  saveChanges(updatedBrand: ICategory): void {
    this.editingMode = false;
    this.brandUpdatedSubject.next(updatedBrand);
  }

  confirmDelete(id: string): void {
    this._confirmDialogService.openConfirmDialog().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteCategory(id);
      }
    });
  }

  deleteCategory(id: string): void {
    this._categoryService.deleteCategory(id).subscribe(
      (response: any) => {
        this.successMessage = response;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = error.error;
        this.successMessage = '';
      }
    );
  }
}
