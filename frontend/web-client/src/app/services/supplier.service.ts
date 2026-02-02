import { Injectable, inject } from "@angular/core";
import { ISupplier } from "../model/supplier.model";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SupplierService {
  private readonly _http = inject(HttpClient);
  private readonly _urlBase = "http://localhost:8080/api/v1/suppliers";

  // ============================
  // GET ALL / FILTER
  // ============================
  getSuppliers(filter?: string): Observable<ISupplier[]> {
    let params = new HttpParams();

    if (filter && filter.trim().length > 0) {
      params = params.set("filter", filter);
    }

    return this._http.get<ISupplier[]>(this._urlBase, { params });
  }

  // ============================
  // GET BY ID
  // ============================
  getSupplierById(id: string): Observable<ISupplier> {
    return this._http.get<ISupplier>(`${this._urlBase}/${id}`);
  }

  // ============================
  // GET BY NAME
  // ============================
  getSupplierByName(name: string): Observable<ISupplier> {
    const params = new HttpParams().set("name", name);

    return this._http.get<ISupplier>(`${this._urlBase}/by-name`, {
      params,
    });
  }

  // ============================
  // SELECTED SUPPLIER (STATE)
  // ============================
  private readonly supplierSource = new BehaviorSubject<ISupplier | null>(null);

  readonly selectedSupplier$ = this.supplierSource.asObservable();

  setSelectedSupplier(supplier: ISupplier | null): void {
    this.supplierSource.next(supplier);
  }

  clearSelectedSupplier(): void {
    this.supplierSource.next(null);
  }
}
