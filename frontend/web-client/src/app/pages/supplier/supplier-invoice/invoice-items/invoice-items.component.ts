import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IInvoiceItem } from '../../../../model/invoice-item.model';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
    selector: 'app-invoice-items',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './invoice-items.component.html',
    styleUrl: './invoice-items.component.css'
})
export class InvoiceItemsComponent {
  @Input() invoiceItems: IInvoiceItem[] = [];
  @Output() invoiceItemsChange = new EventEmitter<IInvoiceItem[]>();

  itemsGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.itemsGroup = this.formBuilder.group({
      items: this.formBuilder.array([]),
      price: '',
      taxRate: '',
      discountRate: '',
      quantity: '',
    });

    // Agregar formControls para cada item en invoiceItems
    const itemsArray = this.itemsGroup.get('items') as FormArray;
    this.invoiceItems.forEach((item) => {
      itemsArray.push(this.createItemFormGroup(item));
    });
  }

  createItemFormGroup(item: any): FormGroup {
    return this.formBuilder.group({
      price: [item.price],
      taxRate: [item.taxRate],
      discountRate: [item.discountRate],
      quantity: [item.quantity],
    });
  }

  setItemPrice(index: number, price: number): void {
    this.invoiceItems[index].price = price;
    this.invoiceItemsChange.emit(this.invoiceItems);
  }

  setTaxRate(index: number, taxRate: number): void {
    this.invoiceItems[index].taxRate = taxRate;
    this.invoiceItemsChange.emit(this.invoiceItems);
  }

  setDiscount(index: number, discount: number): void {
    this.invoiceItems[index].discountRate = discount;
    this.invoiceItemsChange.emit(this.invoiceItems);
  }

  setQuantity(index: number, quantity: number): void {
    this.invoiceItems[index].quantity = quantity;
    this.invoiceItemsChange.emit(this.invoiceItems);
  }
}
