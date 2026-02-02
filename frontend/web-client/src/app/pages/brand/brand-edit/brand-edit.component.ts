import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  inject,
} from "@angular/core";
import { CommonModule, NgClass } from "@angular/common";
import { IBrand } from "../../../model/brand.model";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { BrandService } from "../../../services/brand.service";

@Component({
  selector: "app-brand-edit",
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: "./brand-edit.component.html",
  styleUrl: "./brand-edit.component.css",
})
export class BrandEditComponent implements OnInit {
  @Input() brand: IBrand | null = null;
  @Output() _save = new EventEmitter<IBrand>();
  @Output() _cancel = new EventEmitter<void>();
  @Output() _successMessage = new EventEmitter<string>();

  brandForm!: FormGroup;
  file: File | null = null;

  private readonly brandService = inject(BrandService);
  private readonly formBuilder = inject(FormBuilder);

  errorMessage = "";

  ngOnInit(): void {
    this.brandForm = this.formBuilder.group({
      brandName: [this.brand?.name ?? "", Validators.required],
    });
  }

  updateBrand(event: Event) {
    event.preventDefault();

    const brandName = this.brandForm.get("brandName")?.value;

    if (!brandName && !this.file) {
      this.errorMessage = "No changes made";
      return;
    }

    if (!this.brand) {
      this.errorMessage = "Brand is not loaded";
      return;
    }
    this.brandService
      .updateBrand(this.brand.id, brandName, this.file ?? undefined)
      .subscribe({
        next: (updatedBrand) => {
          this._save.emit(updatedBrand);
          this._successMessage.emit("Brand updated successfully");
        },
        error: (error) => {
          this.errorMessage = "Error updating brand";
          console.error(error);
        },
      });
  }

  onFileSelected(event: any) {
    if (event.target.files?.length) {
      this.file = event.target.files[0];
    }
  }

  cancelar(): void {
    this._cancel.emit();
  }

  hasErrors(field: string, error: string): boolean {
    const control = this.brandForm.get(field);
    return !!(control && control.touched && control.hasError(error));
  }
}
