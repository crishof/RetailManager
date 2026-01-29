import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrandService } from '../../../services/brand.service';
import { IBrand } from '../../../model/brand.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-brand-create',
    imports: [CommonModule, ReactiveFormsModule, NgClass],
    templateUrl: './brand-create.component.html',
    styleUrl: './brand-create.component.css'
})
export class BrandCreateComponent {
  @Output() onCancel = new EventEmitter();

  brandForm!: FormGroup;
  _brandService = inject(BrandService);
  _router = inject(Router);
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.brandForm = formBuilder.group({
      brandName: ['', [Validators.required]],
    });
  }

  enviar(event: Event) {
    event.preventDefault();

    const brand: IBrand = {
      id: '',
      name: this.brandForm.get('brandName')?.value || '',
    };

    this._brandService.createBrand(brand).subscribe(
      (response) => {
        (this.successMessage = 'Brand created successfully'), response;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Error creating Brand: ' + error.message;
        this.successMessage = '';
      }
    );
  }

  /*
  toList(): void {
    this._router.navigate(['/brand']);
  }
    */
  toList(): void {
    this.onCancel.emit();
    this._router.navigate(['/brand']);
  }

  hasErrors(field: string, typeError: string) {
    return (
      this.brandForm.get(field)?.hasError(typeError) &&
      this.brandForm.get(field)?.touched
    );
  }
}
