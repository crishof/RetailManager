import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomerInvoice } from '../model/customer-invoice.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerInvoiceService {
  private _http = inject(HttpClient);
  private _urlBase = 'http://localhost:443/customerinvoice-sv/invoice';

  getAll(): Observable<ICustomerInvoice> {
    return this._http.get<ICustomerInvoice[]>(`${this._urlBase}/getAll`);
  }

  saveInvoice(formData: FormData): Observable<any> {
    return this._http.post(`${this._urlBase}/save`, formData);
  }
}
