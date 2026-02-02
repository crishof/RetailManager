import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { ICategory } from "../model/category.model";
import { PageResponse } from "../model/PageResponse";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private readonly _http = inject(HttpClient);
  private readonly _urlBase = "http://localhost:8080/api/v1/categories";

  private readonly categoryUpdatedSubject = new Subject<void>();
  categoryUpdated$ = this.categoryUpdatedSubject.asObservable();

  // ============================
  // CREATE CATEGORY (multipart)
  // ============================
  createCategory(
    name: string,
    parentId?: string,
    logo?: File,
  ): Observable<ICategory> {
    const formData = new FormData();
    formData.append("name", name);

    if (parentId) {
      formData.append("parentId", parentId);
    }

    if (logo) {
      formData.append("logo", logo, logo.name);
    }

    return this._http
      .post<ICategory>(this._urlBase, formData)
      .pipe(tap(() => this.categoryUpdatedSubject.next()));
  }

  // ============================
  // GET ALL (PAGINATED)
  // ============================
  getCategories(page = 0, size = 20): Observable<PageResponse<ICategory>> {
    const params = new HttpParams().set("page", page).set("size", size);

    return this._http.get<PageResponse<ICategory>>(this._urlBase, { params });
  }

  // ============================
  // GET BY ID
  // ============================
  getCategoryById(id: string): Observable<ICategory> {
    return this._http.get<ICategory>(`${this._urlBase}/${id}`);
  }

  // ============================
  // GET BY NAME (backend pendiente)
  // ============================
  getCategoryByName(name: string): Observable<ICategory> {
    const params = new HttpParams().set("name", name);

    return this._http.get<ICategory>(`${this._urlBase}/by-name`, { params });
  }

  // ============================
  // UPDATE CATEGORY (multipart)
  // ============================
  updateCategory(
    id: string,
    name?: string,
    logo?: File,
  ): Observable<ICategory> {
    const formData = new FormData();

    if (name) {
      formData.append("name", name);
    }

    if (logo) {
      formData.append("logo", logo, logo.name);
    }

    return this._http
      .patch<ICategory>(`${this._urlBase}/${id}`, formData)
      .pipe(tap(() => this.categoryUpdatedSubject.next()));
  }

  // ============================
  // DELETE CATEGORY
  // ============================
  deleteCategory(id: string): Observable<void> {
    return this._http
      .delete<void>(`${this._urlBase}/${id}`)
      .pipe(tap(() => this.categoryUpdatedSubject.next()));
  }

  // ============================
  // DELETE CATEGORY IMAGE
  // ============================
  deleteCategoryImage(id: string): Observable<void> {
    return this._http
      .patch<void>(`${this._urlBase}/${id}/image`, null)
      .pipe(tap(() => this.categoryUpdatedSubject.next()));
  }

  // ============================
  // CHANGE CATEGORY PARENT
  // ============================
  changeParent(id: string, newParentId?: string): Observable<ICategory> {
    let params = new HttpParams();

    if (newParentId) {
      params = params.set("newParentId", newParentId);
    }

    return this._http
      .patch<ICategory>(`${this._urlBase}/${id}/parent`, null, { params })
      .pipe(tap(() => this.categoryUpdatedSubject.next()));
  }

  // ============================
  // GET CATEGORY TREE
  // ============================
  getTree(): Observable<any[]> {
    return this._http.get<any[]>(`${this._urlBase}/tree`);
  }

  // ============================
  // GET SUBTREE
  // ============================
  getSubTree(id: string): Observable<any> {
    return this._http.get<any>(`${this._urlBase}/${id}/tree`);
  }

  // ============================
  // COUNT
  // ============================
  getCategoryCount(): Observable<number> {
    return this._http.get<number>(`${this._urlBase}/count`);
  }
}
