import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _http = inject(HttpClient);

  private _urlBase = 'http://localhost:443/product-sv/product';

  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(`${this._urlBase}/getAll`);
  }

  getProduct(id: string): Observable<IProduct> {
    return this._http.get<IProduct>(`${this._urlBase}/getById/${id}`);
  }

  getAllByFilter(filter: string, supplierId?: string): Observable<IProduct[]> {
    let params = new HttpParams().set('filter', filter);
    if (supplierId) {
      params = params.set('supplierId', supplierId);
    }
    return this._http.get<IProduct[]>(`${this._urlBase}/getAllByFilter`, {
      params,
    });
  }

  getAllByFilterAndStock(
    filter: string,
    supplierId?: string
  ): Observable<IProduct[]> {
    let params = new HttpParams().set('filter', filter);
    if (supplierId) params.set('supplierId', supplierId);
    return this._http.get<IProduct[]>(
      `${this._urlBase}/getAllByFilterAndStock`,
      {
        params,
      }
    );
  }

  getBrandProductsQuantity(id: string): Observable<number> {
    return this._http.get<number>(
      `${this._urlBase}/countProductsByBrand/${id}`
    );
  }
}
