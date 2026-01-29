import { Component, OnInit, inject } from '@angular/core';
import { ICategory } from '../../../model/category.model';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDialogService } from '../../../services/modal-dialog.service';

@Component({
    selector: 'app-category',
    imports: [CategoryDetailsComponent],
    templateUrl: './category.component.html',
    styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categoryList: ICategory[] = [];
  private _categoryService = inject(CategoryService);
  private _router = inject(Router);
  private _sanitizer = inject(DomSanitizer);
  private _modalDialogService = inject(ModalDialogService);

  ngOnInit(): void {
    this.loadCategories();
    this.subscribeToCategoryUpdatedEvent();
  }

  loadCategories(): void {
    this._categoryService.getCategories().subscribe((data: ICategory[]) => {
      this.categoryList = data;

      if (this.categoryList.length > 0) {
        this.selectedCategory = this.categoryList[0];
      }
    });
  }

  subscribeToCategoryUpdatedEvent(): void {
    this._categoryService.getCategoryUpdatedObservable().subscribe(() => {
      this.loadCategories();
    });
  }

  handleCategoryUpdated(): void {
    this.loadCategories();
  }

  getImageUrl(image: any): any {
    const base64Image = image.content;
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpeg;base64,' + base64Image
    );
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    if (typeof window !== 'undefined') {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    }
    return '';
  }

  navegate(id: string): void {
    this._router.navigate(['/category', id]);
  }

  selectedCategory: ICategory | null = null;

  showDetails(category: ICategory): void {
    this.selectedCategory = category;
  }

  openCategoryEditDialog() {
    this._modalDialogService.openCategoryEditDialog().subscribe((result) => {});
  }
}
