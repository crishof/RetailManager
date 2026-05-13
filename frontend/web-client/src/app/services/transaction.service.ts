import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ITransaction } from "../model/transaction.model";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  readonly _http = inject(HttpClient);

  private readonly _urlBase = `${environment.gatewayUrl}/api/v1/transactions`;

  getTransactions(supplierId: string): Observable<ITransaction[]> {
    return this._http.get<ITransaction[]>(`${this._urlBase}/supplier/${supplierId}`);
  }

  readonly transactionSource = new BehaviorSubject<ITransaction | null>(null);

  setSelectedTransaction(transaction: ITransaction) {
    this.transactionSource.next(transaction);
  }
}
