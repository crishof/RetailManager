import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ISupplierInvoice } from "../model/supplier-invoice.model";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class SupplierInvoiceService {
  private readonly _http = inject(HttpClient);
  private readonly _urlBase = `${environment.gatewayUrl}/api/v1/purchases`;

  getAll(): Observable<ISupplierInvoice[]> {
    return this._http.get<ISupplierInvoice[]>(this._urlBase);
  }

  saveInvoice(payload: ISupplierInvoice): Observable<ISupplierInvoice> {
    return this._http.post<ISupplierInvoice>(this._urlBase, payload);
  }
}
