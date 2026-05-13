import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type TCurrencyCode = 'ARS' | 'USD' | 'EUR';

export interface ICashSessionResponse {
  id: string;
  branchId: string | null;
  userId: string;
  sessionDate: string;
  openedAt: string;
  closedAt: string | null;
  openingBalance: number;
  closingBalance: number;
  status: 'OPEN' | 'CLOSED';
  notes: string | null;
  totalIncome: number;
  totalExpense: number;
  expectedBalance: number;
  countedTotalsByCurrency?: Partial<Record<TCurrencyCode, number>>;
  exchangeRatesToArs?: Partial<Record<TCurrencyCode, number>>;
}

export interface IOpenSessionRequest {
  branchId?: string;
  userId?: string;
  openingBalance: number;
  notes?: string;
}

export interface ICloseSessionRequest {
  closingBalance: number;
  notes?: string;
  countedTotalsByCurrency?: Partial<Record<TCurrencyCode, number>>;
  exchangeRatesToArs?: Partial<Record<TCurrencyCode, number>>;
}

export interface ICashMovementResponse {
  id: string;
  sessionId: string;
  type: 'INCOME' | 'EXPENSE' | 'SALE' | 'CUSTOMER_PAYMENT' | 'SUPPLIER_PAYMENT' | 'OPENING' | 'CLOSING';
  amount: number;
  currency: TCurrencyCode;
  originalAmount: number;
  exchangeRateToArs: number;
  description: string;
  reference: string | null;
  createdAt: string;
}

export interface ICashMovementRequest {
  type: string;
  amount: number;
  currency?: TCurrencyCode;
  exchangeRateToArs?: number;
  description: string;
  reference?: string;
}

export interface ICashQueryTarget {
  branchId?: string;
  central?: boolean;
}

@Injectable({ providedIn: 'root' })
export class CashService {
  private readonly _http = inject(HttpClient);
  private readonly _base = `${environment.gatewayUrl}/api/v1/cash`;

  // Sessions
  openSession(request: IOpenSessionRequest): Observable<ICashSessionResponse> {
    return this._http.post<ICashSessionResponse>(`${this._base}/sessions`, request);
  }

  closeSession(sessionId: string, request: ICloseSessionRequest): Observable<ICashSessionResponse> {
    return this._http.put<ICashSessionResponse>(`${this._base}/sessions/${sessionId}/close`, request);
  }

  getCurrentSession(target: ICashQueryTarget): Observable<ICashSessionResponse> {
    const params: Record<string, string> = {
      central: target.central ? 'true' : 'false',
    };
    if (!target.central && target.branchId) {
      params['branchId'] = target.branchId;
    }

    return this._http.get<ICashSessionResponse>(`${this._base}/sessions/current`, {
      params,
    });
  }

  getAllSessions(target: ICashQueryTarget): Observable<ICashSessionResponse[]> {
    const params: Record<string, string> = {
      central: target.central ? 'true' : 'false',
    };
    if (!target.central && target.branchId) {
      params['branchId'] = target.branchId;
    }

    return this._http.get<ICashSessionResponse[]>(`${this._base}/sessions`, {
      params,
    });
  }

  getSessionById(sessionId: string): Observable<ICashSessionResponse> {
    return this._http.get<ICashSessionResponse>(`${this._base}/sessions/${sessionId}`);
  }

  // Movements
  addMovement(sessionId: string, request: ICashMovementRequest): Observable<ICashMovementResponse> {
    return this._http.post<ICashMovementResponse>(`${this._base}/sessions/${sessionId}/movements`, request);
  }

  getMovements(sessionId: string): Observable<ICashMovementResponse[]> {
    return this._http.get<ICashMovementResponse[]>(`${this._base}/sessions/${sessionId}/movements`);
  }

  getExchangeRatesToArs(): Observable<Record<TCurrencyCode, number>> {
    return this._http.get<Record<TCurrencyCode, number>>(`${this._base}/exchange-rates`);
  }
}
