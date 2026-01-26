import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private _http = inject(HttpClient);

  private _urlBase = 'http://localhost:443/stock-sv/stock';
}
