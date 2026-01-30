import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { ISupplierProduct } from "../model/supplierProduct";

@Injectable({
  providedIn: "root",
})
export class SupplierPriceListService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = "http://localhost:8080/api/v1/price-items";
  private readonly productsUrl =
    "http://localhost:8080/api/v1/products/import/supplier";

  // ============================
  // IMPORT PRICE ITEMS
  // ============================
  uploadFile(
    file: File,
    supplierId: string,
    updateExisting = false,
  ): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("supplierId", supplierId);
    formData.append("updateExisting", String(updateExisting));

    // ❗ NO setear Content-Type en multipart
    return this.http.post(`${this.baseUrl}/import`, formData);
  }

  // ============================
  // SEARCH / FILTER ITEMS
  // ============================
  getAllByFilter(
    supplierId?: string,
    brand?: string,
    filter?: string,
  ): Observable<ISupplierProduct[]> {
    let params = new HttpParams();

    if (supplierId) {
      params = params.set("supplierId", supplierId);
    }
    if (brand) {
      params = params.set("brand", brand);
    }
    if (filter) {
      params = params.set("filter", filter);
    }

    return this.http.get<ISupplierProduct[]>(this.baseUrl, { params });
  }

  // ============================
  // GET ITEM BY ID
  // ============================
  getById(id: string): Observable<ISupplierProduct> {
    return this.http
      .get<ISupplierProduct>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(() =>
          throwError(() => new Error("Error getting price item")),
        ),
      );
  }

  // ============================
  // GET BRANDS (OPTIONAL SUPPLIER)
  // ============================
  getBrands(supplierId?: string): Observable<string[]> {
    let params = new HttpParams();

    if (supplierId) {
      params = params.set("supplierId", supplierId);
    }

    return this.http.get<string[]>(`${this.baseUrl}/brands`, { params });
  }

  // ============================
  // IMPORT PRODUCTS FROM SUPPLIER
  // ============================
  importProductsFromSupplier(productList: ISupplierProduct[]): Observable<any> {
    return this.http.post<any>(this.productsUrl, productList);
  }
}
