import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { ISupplierProduct } from "../model/supplierProduct";
import { environment } from '../../environments/environment';

export interface ImportItemError {
  supplierProductId: string;
  code: string;
  reason: string;
}

export interface ImportResult {
  total: number;
  imported: number;
  skipped: number;
  failed: number;
  errors: ImportItemError[];
}

export interface ColumnHeaderSuggestion {
  rawHeader: string;
  suggestedAttribute: string | null;
}

@Injectable({
  providedIn: "root",
})
export class SupplierPriceListService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${environment.gatewayUrl}/api/v1/price-items`;
  private readonly productsUrl =
    `${environment.gatewayUrl}/api/v1/products/import/supplier`;

  // ============================
  // IMPORT PRICE ITEMS
  // ============================
  uploadFile(
    file: File,
    supplierId: string,
    updateExisting = false,
    columnMapping?: Record<string, string>,
  ): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("supplierId", supplierId);
    formData.append("updateExisting", String(updateExisting));

    if (columnMapping && Object.keys(columnMapping).length > 0) {
      formData.append("columnMapping", JSON.stringify(columnMapping));
    }

    // ❗ NO setear Content-Type en multipart
    return this.http.post(`${this.baseUrl}/import`, formData);
  }

  // ============================
  // PARSE EXCEL HEADERS
  // ============================
  parseExcelHeaders(file: File): Observable<ColumnHeaderSuggestion[]> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<ColumnHeaderSuggestion[]>(
      `${this.baseUrl}/parse-headers`,
      formData,
    );
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
  importProductsFromSupplier(productList: ISupplierProduct[]): Observable<ImportResult> {
    return this.http.post<ImportResult>(this.productsUrl, productList);
  }
}
