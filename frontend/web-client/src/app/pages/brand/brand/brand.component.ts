
import {
  Component,
  Input,
  EventEmitter,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { IBrand } from '../../../model/brand.model';
import { BrandService } from '../../../services/brand.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultImageDirective } from '../../../utils/default-image.directive';
import { BrandDetailsComponent } from '../brand-details/brand-details.component';
import { BrandCreateComponent } from '../brand-create/brand-create.component';

@Component({
    selector: 'app-brand',
    imports: [
    FormsModule,
    ReactiveFormsModule,
    DefaultImageDirective,
    BrandDetailsComponent,
    BrandCreateComponent
],
    templateUrl: './brand.component.html',
    styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit {
  private readonly _brandService = inject(BrandService);
  brandList: IBrand[] = [];
  filteredBrandList: IBrand[] = [];
  searchTerm: string = '';
  sortedColumn: keyof IBrand | undefined;
  isAscendingOrder: boolean = true;
  @Input() selectionMode: 'click' | 'dblclick' = 'click';
  selectedBrand: IBrand | null = null;
  private readonly _router = inject(Router);
  totalElements: number = 0;
  /*
  
  @Output() selectedBrand = new EventEmitter<IBrand>();
  private _sanitizer = inject(DomSanitizer);
*/
  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands() {
  this._brandService.getBrands().subscribe({
    next: (page) => {
      this.brandList = page.content;
      this.totalElements = page.totalElements;
    },
    error: (err) => console.error(err)
  });
}

  searchBrand() {
    this.filterBrands(this.searchTerm);
  }

  filterBrands(searchTerm: string) {
    if (!searchTerm) {
      this.filteredBrandList = this.brandList.slice();
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      this.filteredBrandList = this.brandList.filter(
        (brand) =>
          brand.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          brand.id.toString().includes(lowerCaseSearchTerm)
      );
    }
  }

  sortColumn(column: keyof IBrand) {
    if (this.sortedColumn === column) {
      this.isAscendingOrder = !this.isAscendingOrder;
    } else {
      this.sortedColumn = column;
      this.isAscendingOrder = true;
    }

    if (this.sortedColumn) {
      this.filteredBrandList.sort((a, b) => {
        const orderFactor = this.isAscendingOrder ? 1 : -1;

        const aValue = a[this.sortedColumn!] as string | number | undefined;
        const bValue = b[this.sortedColumn!] as string | number | undefined;

        if (aValue !== undefined && bValue !== undefined) {
          if (aValue < bValue) {
            return -1 * orderFactor;
          } else if (aValue > bValue) {
            return 1 * orderFactor;
          } else {
            return 0;
          }
        }

        return 0;
      });
    }
  }
  onBrandInteract(brand: IBrand) {
    this.selectedBrand = brand;
    this.createBrand = false;
  }

  createBrand: boolean = false;
  toNewBrand(): void {
    this.createBrand = true;
    this.selectedBrand = null;
  }

  /*
  
  toNewBrand(): void {
    this._router.navigate(['/brand/create']);
  }
  
  


  toBrandDetails(id: string): void {
    this._router.navigate(['/brand', id]);
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

  

  handleKeyup(event: KeyboardEvent) {
    const searchTerm = (event.target as HTMLInputElement)?.value;
    this.filterBrands(searchTerm);
  }

  

*/
}
