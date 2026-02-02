import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { IBrand } from "../model/brand.model";
import { PageResponse } from "../model/PageResponse";
import { UUID } from "node:crypto";

@Injectable({
  providedIn: "root",
})
export class BrandService {
  private readonly http = inject(HttpClient);
  private readonly urlBase = "http://localhost:8080/api/v1/brands";

  // ============================
  // CREATE BRAND (multipart)
  // ============================
  createBrand(name: string, logo?: File): Observable<IBrand> {
    const formData = new FormData();
    formData.append("name", name);

    if (logo) {
      formData.append("logo", logo, logo.name);
    }

    return this.http.post<IBrand>(this.urlBase, formData);
  }

  // ============================
  // GET ALL BRANDS (paginated)
  // ============================
  getBrands(params?: {
    page?: number;
    size?: number;
    search?: string;
  }): Observable<PageResponse<IBrand>> {
    let httpParams = new HttpParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<PageResponse<IBrand>>(this.urlBase, {
      params: httpParams,
    });
  }

  // ============================
  // GET BRAND BY ID
  // ============================
  getBrand(id: string): Observable<IBrand> {
    return this.http.get<IBrand>(`${this.urlBase}/${id}`);
  }

  // ============================
  // UPDATE BRAND (multipart PATCH)
  // ============================
  updateBrand(id: UUID, name?: string, logo?: File): Observable<IBrand> {
    const formData = new FormData();

    if (name) {
      formData.append("name", name);
    }

    if (logo) {
      formData.append("logo", logo, logo.name);
    }

    return this.http.patch<IBrand>(`${this.urlBase}/${id}`, formData);
  }

  // ============================
  // SOFT DELETE BRAND
  // ============================
  deleteBrand(id: string): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }

  // ============================
  // FORCE DELETE BRAND
  // ============================
  forceDeleteBrand(id: string): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}/force`);
  }

  // ============================
  // DELETE BRAND LOGO
  // ============================
  deleteBrandLogo(id: string): Observable<void> {
    return this.http.patch<void>(`${this.urlBase}/${id}/logo`, null);
  }

  // ============================
  // RESTORE BRAND
  // ============================
  restoreBrand(id: string): Observable<IBrand> {
    return this.http.patch<IBrand>(`${this.urlBase}/${id}/restore`, null);
  }

  // ============================
  // COUNT BRANDS
  // ============================
  getBrandCount(): Observable<number> {
    return this.http.get<number>(`${this.urlBase}/count`);
  }

  // ============================
  // MERGE BRANDS
  // ============================
  mergeBrands(sourceBrandId: string, targetBrandId: string): Observable<any> {
    return this.http.put<any>(`${this.urlBase}/${sourceBrandId}/merge`, null, {
      params: {
        targetBrandId,
      },
    });
  }
}
