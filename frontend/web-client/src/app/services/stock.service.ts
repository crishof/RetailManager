import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StockService {
  private readonly _http = inject(HttpClient);

  private readonly _urlBase = "http://localhost:443/stock-sv/stock";
}
