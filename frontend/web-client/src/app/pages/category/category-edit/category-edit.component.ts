import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ICategory } from '../../../model/category.model';
import { CommonModule, NgClass } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-category-edit',
    imports: [CommonModule, ReactiveFormsModule, NgClass],
    templateUrl: './category-edit.component.html',
    styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent implements OnInit {
  @Input() category: ICategory | undefined;
  @Output() onSave = new EventEmitter<ICategory>();
  @Output() onCancel = new EventEmitter();
  @Output() categoryUpdated = new EventEmitter();

  categoryForm!: FormGroup;
  _categoryService = inject(CategoryService);

  private categoryUpdatedSubject = new Subject<ICategory>();

  constructor(private formBuilder: FormBuilder) {
    this.categoryForm = formBuilder.group({
      categoryName: ['', [Validators.required]],
      image: [null],
    });
  }
  enviar(event: Event) {
    event.preventDefault();

    const updatedCategory: ICategory = {
      id: this.category?.id || '',
      name: this.categoryForm.get('categoryName')?.value || '',
    };

    const formData = new FormData();
    formData.append('name', updatedCategory.name);

    this._categoryService
      .updateCategory(updatedCategory.id, formData)
      .subscribe(
        (response) => {
          console.log('Category updated: ', response);
          this.categoryUpdated.emit();

          this.categoryUpdatedSubject.next(response);

          this.onSave.emit(response);
        },
        (error) => {
          console.log('Error updating category:', error);
        }
      );
  }

  selectedFile: File | undefined;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  updateImage(): void {
    if (this.selectedFile && this.category?.id) {
      this._categoryService
        .updateCategoryImage(this.category?.id, this.selectedFile)
        .subscribe(
          (response) => {
            console.log('Image updated: ', response);

            this.categoryUpdatedSubject.next(response);

            this.onSave.emit(response);
          },
          (error) => {
            console.log('Error updating image:', error);
          }
        );
    } else {
      console.log('Seleccione un archivo y proporcione un ID de marca válido.');
    }
  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      image: [null],
    });
  }

  cancelar(): void {
    this.onCancel.emit();
  }

  hasErrors(field: string, typeError: string) {
    return (
      this.categoryForm.get(field)?.hasError(typeError) &&
      this.categoryForm.get(field)?.touched
    );
  }
}
