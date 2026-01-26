import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISupplierInvoice } from '../model/supplier-invoice.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierInvoiceService {
  private _http = inject(HttpClient);
  private _urlBase = 'http://localhost:443/supplierinvoice-sv/invoice';

  getAll(): Observable<ISupplierInvoice[]> {
    return this._http.get<ISupplierInvoice[]>(`${this._urlBase}/getAll`);
  }

  saveInvoice(formData: FormData): Observable<any> {
    return this._http.post(`${this._urlBase}/save`, formData);
  }
}
