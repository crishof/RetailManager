import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  inject,
} from "@angular/core";
import { ICategory } from "../../../model/category.model";
import { CommonModule, NgClass } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CategoryService } from "../../../services/category.service";

@Component({
  selector: "app-category-edit",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: "./category-edit.component.html",
  styleUrls: ["./category-edit.component.css"],
})
export class CategoryEditComponent implements OnInit {
  @Input() category?: ICategory;
  @Output() saved = new EventEmitter<ICategory>();
  @Output() canceled = new EventEmitter<void>();
  @Output() categoryUpdatedEvent = new EventEmitter<void>();

  categoryForm!: FormGroup;
  selectedFile?: File;

  private readonly _categoryService = inject(CategoryService);
  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: [this.category?.name || "", Validators.required],
      image: [null],
    });
  }

  hasErrors(field: string, typeError: string): boolean {
    const control = this.categoryForm.get(field);
    return (control?.hasError(typeError) && control.touched) ?? false;
  }

  save(event: Event): void {
    event.preventDefault();
    if (!this.categoryForm.valid || !this.category?.id) return;

    const name = this.categoryForm.get("categoryName")?.value;

    this._categoryService.updateCategory(this.category.id, name).subscribe({
      next: (updatedCategory) => {
        this.saved.emit(updatedCategory);
        this.categoryUpdatedEvent.emit();
        console.log("Category updated:", updatedCategory);
      },
      error: (err) => console.error("Error updating category:", err),
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  updateImage(): void {
    if (!this.selectedFile || !this.category?.id) {
      console.warn(
        "Seleccione un archivo válido y asegúrese de que la categoría tenga ID.",
      );
      return;
    }

    const name = this.categoryForm.get("categoryName")?.value || undefined;

    this._categoryService
      .updateCategory(this.category.id, name, this.selectedFile)
      .subscribe({
        next: (updatedCategory) => {
          this.saved.emit(updatedCategory);
          this.categoryUpdatedEvent.emit();
          console.log("Category image updated:", updatedCategory);
        },
        error: (err) => console.error("Error updating image:", err),
      });
  }

  cancel(): void {
    this.canceled.emit();
  }
}
