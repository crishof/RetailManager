import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrand } from '../model/brand.model';
import { PageResponse } from '../model/PageResponse';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private readonly _http = inject(HttpClient);
  private readonly _urlBase = 'http://localhost:8080/api/v1/brands';

  getBrands(page = 0, size = 10): Observable<PageResponse<IBrand>> {
  return this._http.get<PageResponse<IBrand>>(
    `${this._urlBase}?page=${page}&size=${size}`
  );
}

  getBrand(id: string): Observable<IBrand> {
    return this._http.get<IBrand>(`${this._urlBase}/getById/${id}`);
  }

  updateBrand(id: string, formData: FormData): Observable<IBrand> {
    console.log('updateBrand, id: ' + id);
    return this._http.put<IBrand>(`${this._urlBase}/update/${id}`, formData);
  }

  createBrand(brand: IBrand): Observable<IBrand> {
    return this._http.post<IBrand>(`${this._urlBase}/save`, brand);
  }

  deleteBrand(id: string): Observable<any> {
    return this._http.delete<string>(`${this._urlBase}/delete/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  updateBrandImage(id: string, file: File): Observable<IBrand> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this._http.put<IBrand>(
      `${this._urlBase}/updateImage/${id}`,
      formData
    );
  }
}
