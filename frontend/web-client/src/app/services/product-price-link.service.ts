import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProductPriceLink, IProductPriceHistory } from '../model/product-price-link.model';

export interface IProductPriceLinkRequest {
  supplierProductId: string;
  productId: string;
  supplierCode?: string;
  lastImportedPrice?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductPriceLinkService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.gatewayUrl}/api/v1/product-price-links`;

  createLink(request: IProductPriceLinkRequest): Observable<IProductPriceLink> {
    return this.http.post<IProductPriceLink>(this.baseUrl, request);
  }

  getAlerts(): Observable<IProductPriceLink[]> {
    return this.http.get<IProductPriceLink[]>(`${this.baseUrl}/alerts`);
  }

  getProductAlerts(productId: string): Observable<IProductPriceLink[]> {
    return this.http.get<IProductPriceLink[]>(`${this.baseUrl}/alerts/product/${productId}`);
  }

  getLink(linkId: string): Observable<IProductPriceLink> {
    return this.http.get<IProductPriceLink>(`${this.baseUrl}/${linkId}`);
  }

  getPriceHistory(linkId: string): Observable<IProductPriceHistory[]> {
    return this.http.get<IProductPriceHistory[]>(`${this.baseUrl}/${linkId}/history`);
  }
}
