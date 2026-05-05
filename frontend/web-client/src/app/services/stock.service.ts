import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class StockService {
  private readonly _http = inject(HttpClient);

  private readonly _urlBase = `${environment.gatewayUrl}/api/v1/inventory`;
}
