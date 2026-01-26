import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProduct } from '../model/product.model';
import { Observable, catchError, throwError } from 'rxjs';
import { ISupplierProduct } from '../model/supplierProduct';

@Injectable({
  providedIn: 'root',
})
export class SupplierPriceListService {
  private _http = inject(HttpClient);

  //TODO: corregir camelCase de URL

  private _urlBase = 'http://localhost:443/supplierpricelist-sv/priceList';
  private _urlSupplier = 'http://localhost:443/supplierpricelist-sv/supplier';
  private _urlProductSv = 'http://localhost:443/product-sv/product';
  constructor() {}

  uploadFile(file: File, supplierId: string, updateExistingProducts: boolean) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('supplierId', supplierId);
    formData.append('updateExistingProducts', String(updateExistingProducts));

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this._http.post<any>(`${this._urlBase}/importList`, formData, {
      headers,
    });
  }

  getAllByFilter(
    supplierId: string,
    brand: string,
    filter: string
  ): Observable<ISupplierProduct[]> {
    let params = new HttpParams();

    if (supplierId !== null && supplierId !== '') {
      params = params.set('supplierId', supplierId);
    }
    if (brand !== null && brand !== '') {
      params = params.set('brand', brand);
    }
    if (filter !== null && filter !== '') {
      params = params.set('filter', filter);
    }
    return this._http.get<ISupplierProduct[]>(
      `${this._urlBase}/getAllByFilter`,
      {
        params: params,
      }
    );
  }

  getBrandsBySupplierId(supplierId: string): Observable<String[]> {
    let params = new HttpParams();
    params = params.set('supplierId', supplierId);
    return this._http.get<String[]>(
      `${this._urlSupplier}/getBrandsBySupplier`,
      {
        params: params,
      }
    );
  }

  getAllBrands(): Observable<String[]> {
    return this._http.get<String[]>(`${this._urlSupplier}/getAllBrands`);
  }

  getSupplierProductById(id: string): Observable<ISupplierProduct> {
    return this._http
      .get<ISupplierProduct>(`${this._urlBase}/getById/${id}`)
      .pipe(
        catchError(() => {
          return throwError(() => new Error('Error getting supplier product'));
        })
      );
  }

  importProducts(productList: ISupplierProduct[]): Observable<any> {
    return this._http.post<any>(
      `${this._urlProductSv}/importProducts`,
      productList
    );
  }
}
