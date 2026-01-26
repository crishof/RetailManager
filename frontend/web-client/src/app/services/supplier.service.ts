import { Injectable, inject } from '@angular/core';
import { ISupplier } from '../model/supplier.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  readonly _http = inject(HttpClient);

  readonly _urlBase = 'http://localhost/api/v1/suppliers';

  getAllByFilter(filter: string): Observable<ISupplier[]> {
    const params = new HttpParams().set('filter', filter);
    return this._http.get<ISupplier[]>(`${this._urlBase}`, {
      params,
    });
  }
  getAllSuppliers(): Observable<ISupplier[]> {
    return this._http.get<ISupplier[]>(`${this._urlBase}`);
  }

  getSupplierByName(name: string): Observable<ISupplier> {
    return this._http.get<ISupplier>(`${this._urlBase}/getByName`);
  }

  getSupplierById(id: string): Observable<ISupplier> {
    return this._http.get<ISupplier>(`${this._urlBase}/${id}`);
  }

  readonly supplierSource = new BehaviorSubject<ISupplier | null>(null);
  selectedSupplier$ = this.supplierSource.asObservable();

  setSelectedSupplier(supplier: ISupplier) {
    this.supplierSource.next(supplier);
  }
}
