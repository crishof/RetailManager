import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  input,
} from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { IBrand } from '../../../model/brand.model';
import { inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrandService } from '../../../services/brand.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-brand-edit',
    imports: [CommonModule, ReactiveFormsModule, NgClass],
    templateUrl: './brand-edit.component.html',
    styleUrl: './brand-edit.component.css'
})
export class BrandEditComponent implements OnInit {
  @Input() brand: IBrand | undefined;
  @Output() onSave = new EventEmitter<IBrand>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSuccessMessage = new EventEmitter<String>();

  brandForm!: FormGroup;
  brandId: string;
  file: File | null = null;

  _brandService = inject(BrandService);
  route = inject(ActivatedRoute);
  _router = inject(Router);
  formBuilder = inject(FormBuilder);

  errorMessage: string = '';

  private brandUpdatedSubject = new Subject<IBrand>();

  constructor() {
    this.brandForm = this.formBuilder.group({
      brandName: ['', Validators.required],
      image: [null],
    });
    this.brandId = '';
  }

  ngOnInit(): void {
    if (this.brand) {
      this.brandId = this.brand?.id;
    }
  }

  updateBrand(event: Event) {
    event.preventDefault();

    console.log('updateBrand, id: ' + this.brandForm.get('brandId'));

    const brandName = this.brandForm.get('brandName')?.value;

    const currentBrandName = this.brand ? this.brand.name : '';

    if (!brandName && !this.file) {
      this.errorMessage = 'No changes made. Please upddate at least one field';
      console.error(this.errorMessage);
      return;
    }

    const formData = new FormData();

    if (brandName) {
      formData.append('brandName', brandName);
    } else {
      formData.append('brandName', currentBrandName);
    }

    if (this.file) {
      formData.append('file', this.file, this.file.name);
    }

    this._brandService.updateBrand(this.brandId, formData).subscribe(
      (response) => {
        this.onSave.emit(response);
        this.onSuccessMessage.emit('Brand updated successfully');
      },
      (error) => {
        console.error('Error updating Brand', error);
      }
    );
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  hasErrors(field: string, typeError: string): boolean {
    const formControl = this.brandForm.get(field);
    return formControl
      ? formControl.hasError(typeError) && formControl.touched
      : false;
  }

  cancelar(): void {
    this.onCancel.emit();
  }
}
