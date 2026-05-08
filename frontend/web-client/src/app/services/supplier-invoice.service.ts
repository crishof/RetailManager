import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ISupplierInvoice } from "../model/supplier-invoice.model";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

export interface IAccountMovement {
  id: string;
  type: 'INVOICE' | 'PAYMENT' | 'ADJUSTMENT';
  date: string;
  reference?: string;
  description?: string;
  amount: number;
  balance: number;
}

export interface ISupplierPaymentRequest {
  supplierId?: string;
  branchId?: string;
  paymentDate: string;
  amount: number;
  paymentMethod: string;
  reference?: string;
  description?: string;
}

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

  getBySupplierId(supplierId: string): Observable<ISupplierInvoice[]> {
    return this._http.get<ISupplierInvoice[]>(`${this._urlBase}/supplier/${supplierId}`);
  }

  getTransactionsBySupplierId(supplierId: string): Observable<any[]> {
    return this._http.get<any[]>(`${this._urlBase}/supplier/${supplierId}/transactions`);
  }

  getAccountStatement(supplierId: string): Observable<IAccountMovement[]> {
    return this._http.get<IAccountMovement[]>(`${this._urlBase}/supplier/${supplierId}/account`);
  }

  savePayment(supplierId: string, payment: ISupplierPaymentRequest): Observable<any> {
    return this._http.post(`${this._urlBase}/supplier/${supplierId}/payments`, payment);
  }
}
