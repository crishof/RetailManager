import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { IProduct } from "../model/product.model";
import { PageResponse } from "../model/PageResponse";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private readonly _http = inject(HttpClient);
  private readonly _urlBase = "http://localhost:8080/api/v1/products";

  // ============================
  // GET ALL PRODUCTS (PAGINATED + FILTERS)
  // ============================
  getProducts(params: {
    brandId?: string;
    categoryId?: string;
    supplierId?: string;
    highlighted?: boolean;
    published?: boolean;
    inStock?: boolean;
    search?: string;
    page?: number;
    size?: number;
  }): Observable<PageResponse<IProduct>> {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    return this._http.get<PageResponse<IProduct>>(this._urlBase, {
      params: httpParams,
    });
  }

  // ============================
  // GET PRODUCT BY ID
  // ============================
  getProduct(id: string): Observable<IProduct> {
    return this._http.get<IProduct>(`${this._urlBase}/${id}`);
  }

  // ============================
  // CREATE PRODUCT
  // ============================
  createProduct(product: IProduct): Observable<IProduct> {
    return this._http.post<IProduct>(this._urlBase, product);
  }

  // ============================
  // UPDATE PRODUCT
  // ============================
  updateProduct(id: string, product: IProduct): Observable<IProduct> {
    return this._http.patch<IProduct>(`${this._urlBase}/${id}`, product);
  }

  // ============================
  // SOFT DELETE PRODUCT
  // ============================
  deleteProduct(id: string): Observable<void> {
    return this._http.delete<void>(`${this._urlBase}/${id}`);
  }

  // ============================
  // HARD DELETE PRODUCT
  // ============================
  forceDeleteProduct(id: string): Observable<void> {
    return this._http.delete<void>(`${this._urlBase}/${id}/force`);
  }

  // ============================
  // RESTORE PRODUCT
  // ============================
  restoreProduct(id: string): Observable<IProduct> {
    return this._http.patch<IProduct>(`${this._urlBase}/${id}/restore`, {});
  }

  // ============================
  // COUNT PRODUCTS
  // ============================
  countProducts(params: {
    brandId?: string;
    categoryId?: string;
    supplierId?: string;
  }): Observable<number> {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        httpParams = httpParams.set(key, value);
      }
    });

    return this._http.get<number>(`${this._urlBase}/count`, {
      params: httpParams,
    });
  }
}
