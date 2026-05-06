import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { IBranch } from "../../../model/branch.model";
import { ILocation } from "../../../model/location.model";
import { IInvoiceItem } from "../../../model/invoice-item.model";
import { IProduct } from "../../../model/product.model";
import { CustomerInvoiceService } from "../../../services/customer-invoice.service";
import { Subscription } from "rxjs";
import { ProductService } from "../../../services/product.service";
import { BranchService } from "../../../services/branch.service";

@Component({
  selector: "app-customer-invoice",
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./customer-invoice.component.html",
  styleUrl: "./customer-invoice.component.css",
})
export class CustomerInvoiceComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  private readonly _productService = inject(ProductService);
  private readonly _customerInvoiceService = inject(CustomerInvoiceService);
  private readonly _branchService = inject(BranchService);

  dateControl = new FormControl(new Date());
  invoiceForm!: FormGroup;
  formBuilder = inject(FormBuilder);

  productList: IProduct[] = [];
  isFormSubmitted: boolean = false;
  productSearchQuery: string = "";
  showProductDropdown: boolean = false;

  selectedBranchId: string = "";

  branches: IBranch[] = [];
  locations: ILocation[] = [];

  invoiceItems: IInvoiceItem[] = [];
  totalInvoiceUnits: number = 0;

  vat21: number = 0.21;
  vat105: number = 0.105;
  vat27: number = 0.27;
  vat0: number = 0;

  ngOnInit(): void {
    this.loadBranches();
    this.dateControl.setValue(new Date());
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  initForm(): void {
    this.invoiceForm = this.formBuilder.group({
      customerId: "",

      customerRequest: {
        name: "Pepe",
        lastname: "Sanchez",
        dni: "30123543",
        taxId: "20-30123543-9",
        email: "pepe@mail.com",
        phone: "666453456",
        AddressRequest: {
          street: "Calle ancha",
          houseNumber: "3",
          city: "Fuengirola",
          state: "Málaga",
          postalCode: "44123",
          country: "España",
        },
      },
      branchId: ["", Validators.required],
      locationId: ["", Validators.required],

      invoiceDate: [new Date(), Validators.required],

      invoiceType: "A",
      packingListPrefix: 0,
      packingListNumber: 0,
      invoicePrefix: [0, Validators.required],
      invoiceNumber: [0, Validators.required],

      taxSave: true,

      observations: "",

      subtotal1: 0,
      discount: 0,
      interest: 0,
      subtotal2: 0,

      netValue21: 0,
      netValue105: 0,
      netValue27: 0,
      netValue0: 0,

      vat21: 0,
      vat105: 0,
      vat27: 0,
      internalTax: 0,

      withholdingVat: 0,
      withholdingSuss: 0,
      withholdingGrossReceiptsTax: 0,
      withholdingIncome: 0,
      stateTax: 0,
      localTax: 0,
      rounding: 0,
      totalPrice: 0,
    });

    // Suscribirse a los cambios en el control branchId
    this.invoiceForm.get("branchId")!.valueChanges.subscribe((branchId) => {
      this.onBranchChange(branchId);
    });
  }

  getTotalInvoiceUnits(): void {
    this.totalInvoiceUnits = Number(
      this.invoiceItems.reduce((total, item) => total + item.quantity, 0),
    );
  }

  getSubtotal1(): number {
    const subtotal1 = this.invoiceItems.reduce((total, item) => {
      const discount = item.discountRate ?? 0;
      const discountedPrice = item.price * ((100 - discount) / 100);
      return total + discountedPrice * item.quantity;
    }, 0);

    this.invoiceForm.patchValue({ subtotal1: subtotal1 }, { emitEvent: false });

    return subtotal1;
  }

  getSubtotal2(): number {
    const subtotal1 = this.invoiceForm.get("subtotal1")?.value;
    const discount = this.invoiceForm.get("discount")?.value;
    const interest = this.invoiceForm.get("interest")?.value;

    let subtotal2 = subtotal1;

    if (discount !== 0) {
      const discountPercentage = Math.min(Math.max(discount, 0), 100) / 100;
      subtotal2 *= 1 - discountPercentage;
    }

    if (interest !== 0) {
      const interestPercentage = Math.min(Math.max(interest, 0), 100) / 100;
      subtotal2 *= 1 + interestPercentage;
    }

    this.invoiceForm.patchValue({ subtotal2: subtotal2 }, { emitEvent: false });

    return subtotal2;
  }

  getNetVat(vat: number): number {
    return this.calculateNetVat(vat);
  }

  calculateNetVat(vat: number): number {
    const discount = Number.parseFloat(
      this.invoiceForm.get("discount")?.value || "0",
    );
    const interest = Number.parseFloat(
      this.invoiceForm.get("interest")?.value || "0",
    );

    const total = this.invoiceItems.reduce((acc, item) => {
      if (item.taxRate == vat) {
        const itemDiscount = item.discountRate ?? 0;
        return acc + item.price * item.quantity * ((100 - itemDiscount) / 100);
      } else {
        return acc;
      }
    }, 0);

    const netVat = total * ((100 - discount) / 100) * ((100 + interest) / 100);

    switch (vat) {
      case this.vat21:
        this.invoiceForm.patchValue({ netValue21: netVat }, { emitEvent: false });
        break;
      case this.vat105:
        this.invoiceForm.patchValue({ netValue105: netVat }, { emitEvent: false });
        break;
      case this.vat27:
        this.invoiceForm.patchValue({ netValue27: netVat }, { emitEvent: false });
        break;
      case this.vat0:
        this.invoiceForm.patchValue({ netValue0: netVat }, { emitEvent: false });
        break;
    }

    return netVat;
  }

  getVatAmount(vat: number): number {
    return this.calculateVat(vat);
  }

  calculateVat(vat: number): number {
    const netVat: number = this.getNetVat(vat);
    const calculatedVat: number = netVat * vat;

    switch (vat) {
      case this.vat21:
        this.invoiceForm.patchValue({ vat21: calculatedVat }, { emitEvent: false });
        break;
      case this.vat105:
        this.invoiceForm.patchValue({ vat105: calculatedVat }, { emitEvent: false });
        break;
      case this.vat27:
        this.invoiceForm.patchValue({ vat27: calculatedVat }, { emitEvent: false });
        break;
    }

    return calculatedVat;
  }

  getInternalTax(): number {
    return this.invoiceItems.reduce((total, item) => {
      const internalTaxRate = item.internalTaxRate ?? 0;
      const lineNet = item.price * item.quantity;
      return total + lineNet * (internalTaxRate / 100);
    }, 0);
  }

  getInvoiceTotal() {
    const total: number =
      Number.parseFloat(this.invoiceForm.get("subtotal2")?.value || "0") +
      Number.parseFloat(this.invoiceForm.get("vat21")?.value || "0") +
      Number.parseFloat(this.invoiceForm.get("vat105")?.value || "0") +
      Number.parseFloat(this.invoiceForm.get("vat27")?.value || "0") +
      Number.parseFloat(this.invoiceForm.get("withholdingVat")?.value || "0") +
      Number.parseFloat(this.invoiceForm.get("withholdingSuss")?.value || "0") +
      Number.parseFloat(
        this.invoiceForm.get("withholdingGrossReceiptsTax")?.value || "0",
      ) +
      Number.parseFloat(
        this.invoiceForm.get("withholdingIncome")?.value || "0",
      ) +
      Number.parseFloat(this.invoiceForm.get("stateTax")?.value || "0") +
      Number.parseFloat(this.invoiceForm.get("localTax")?.value || "0") +
      Number.parseFloat(this.invoiceForm.get("rounding")?.value || "0");

    this.invoiceForm.patchValue({ totalPrice: total }, { emitEvent: false });
    return total;
  }

  saveInvoice() {
    this.isFormSubmitted = true;
    const formData = this.invoiceForm.value;
    formData.invoiceItemsRequest = this.invoiceItems;
    if (this.invoiceForm.valid && this.invoiceItems.length > 0) {
      this._customerInvoiceService.saveInvoice(formData).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error.message);
        },
      });
    } else {
      // El formulario no es válido, imprime los campos inválidos y sus errores
      console.log("El formulario no es válido. Campos inválidos:");
      Object.keys(this.invoiceForm.controls).forEach((key) => {
        const control = this.invoiceForm.get(key);
        if (control?.errors) {
          console.log(key + ":", control.errors);
        }
      });

      // Marca los campos inválidos como tocados para mostrar mensajes de error en el HTML
      Object.values(this.invoiceForm.controls).forEach((control) => {
        if (control instanceof FormControl) {
          control.markAsTouched();
        }
      });
    }
  }

  selectProduct(product: IProduct): void {
    const invoiceItem: IInvoiceItem = {
      id: product.id,
      brandName: product.brandName,
      model: product.model,
      description: product.description,
      price: product.priceResponse.purchasePrice,
      taxRate: product.priceResponse.taxRate,
      discountRate: product.priceResponse.discount,
      internalTaxRate: 0,
      quantity: 1,
    };
    this.invoiceItems.push(invoiceItem);
    this.productSearchQuery = "";
    this.productList = [];
    this.showProductDropdown = false;
    this.getTotalInvoiceUnits();
  }

  removeItem(index: number): void {
    this.invoiceItems.splice(index, 1);
    this.getTotalInvoiceUnits();
  }

  updateItem(
    index: number,
    field: "price" | "taxRate" | "discountRate" | "quantity",
    value: number,
  ): void {
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      return;
    }

    const item = this.invoiceItems[index];

    if (!item) {
      return;
    }

    if (field === "price") {
      item.price = Math.max(numericValue, 0);
      return;
    }

    if (field === "taxRate") {
      item.taxRate = Math.max(numericValue, 0);
      return;
    }

    if (field === "discountRate") {
      item.discountRate = Math.min(Math.max(numericValue, 0), 100);
      return;
    }

    item.quantity = Math.max(numericValue, 1);
    this.getTotalInvoiceUnits();
  }

  onSearchInput(searchTerm: string): void {
    this.productSearchQuery = searchTerm;
    this.isFormSubmitted = true;

    if (searchTerm.length >= 2) {
      this.searchProductsWithStock(searchTerm);
      this.showProductDropdown = true;
      return;
    }

    this.productList = [];
    this.showProductDropdown = false;
  }

  hideDropdown(): void {
    setTimeout(() => {
      this.showProductDropdown = false;
    }, 200);
  }

  searchProductsWithStock(searchTerm: string, supplierId?: string): void {
    this.subscription?.unsubscribe();

    this.subscription = this._productService
      .getProducts({
        search: searchTerm,
        supplierId: supplierId,
        inStock: true,
        page: 0,
        size: 20,
      })
      .subscribe({
        next: (page) => {
          this.productList = page.content;
        },
        error: (err) => {
          console.error("Failed to load products", err);
        },
      });
  }

  loadBranches() {
    this._branchService.getBranches().subscribe({
      next: (branches: IBranch[]) => {
        this.branches = branches;
      },
      error: (error) => {
        console.log("Error loading branches list", error);
      },
    });
  }

  onBranchChange(branchId: string) {
    if (!branchId) {
      this.locations = [];
      return;
    }

    this.selectedBranchId = branchId;
    this.getLocations(branchId);
    this.invoiceForm.get("locationId")!.setValue("");
  }

  getLocations(branchId: string) {
    const branch = this.branches.find((branch) => branch.id == branchId);
    this.locations = branch ? branch.locations : [];
  }
}
