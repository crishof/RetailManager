import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ICustomerInvoice } from "../model/customer-invoice.model";

@Injectable({
  providedIn: "root",
})
export class CustomerInvoiceService {
  private readonly _http = inject(HttpClient);
  private readonly _urlBase = "http://localhost/customerinvoice-sv/invoice";

  getAll(): Observable<ICustomerInvoice> {
    return this._http.get<ICustomerInvoice[]>(`${this._urlBase}/getAll`);
  }

  saveInvoice(formData: FormData): Observable<any> {
    return this._http.post(`${this._urlBase}/save`, formData);
  }
}
