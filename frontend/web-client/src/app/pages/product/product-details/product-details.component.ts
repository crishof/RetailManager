import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { ProductService } from '../../../services/product.service';
import { IProduct } from '../../../model/product.model';
import { IBrand } from '../../../model/brand.model';
import { BrandService } from '../../../services/brand.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-product-detail',
    imports: [],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: IProduct | null = null;

  /*
  loading: boolean = true;
  public product?: IProduct;

  private _route = inject(ActivatedRoute);
  private _productService = inject(ProductService);
  private _brandService = inject(BrandService);
*/
  ngOnInit(): void {
    /*
    this._route.params.subscribe((params) => {
      this._productService
        .getProduct(params['id'])
        .subscribe((data: IProduct) => {
          this.product = data;
          this.loading = false;
        });
    });
    */
  }

  /*
  getBrandName(brandId: string): Observable<string> {
    return this._brandService.getBrand(brandId).pipe(
      map((brand: IBrand) => brand.name)
    );
    
  }
  */
}
