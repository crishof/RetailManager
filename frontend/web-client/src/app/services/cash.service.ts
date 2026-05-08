import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ICashSessionResponse {
  id: string;
  branchId: string;
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
}

export interface IOpenSessionRequest {
  branchId: string;
  userId?: string;
  openingBalance: number;
  notes?: string;
}

export interface ICloseSessionRequest {
  closingBalance: number;
  notes?: string;
}

export interface ICashMovementResponse {
  id: string;
  sessionId: string;
  type: 'INCOME' | 'EXPENSE' | 'SALE' | 'CUSTOMER_PAYMENT' | 'SUPPLIER_PAYMENT' | 'OPENING' | 'CLOSING';
  amount: number;
  description: string;
  reference: string | null;
  createdAt: string;
}

export interface ICashMovementRequest {
  type: string;
  amount: number;
  description: string;
  reference?: string;
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

  getCurrentSession(branchId: string): Observable<ICashSessionResponse> {
    return this._http.get<ICashSessionResponse>(`${this._base}/sessions/current`, {
      params: { branchId }
    });
  }

  getAllSessions(branchId: string): Observable<ICashSessionResponse[]> {
    return this._http.get<ICashSessionResponse[]>(`${this._base}/sessions`, {
      params: { branchId }
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
}
