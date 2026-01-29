import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ICategory } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly _http = inject(HttpClient);

  private readonly _urlBase = 'http://localhost:443/category-sv/category';
  private readonly categoryUpdatedSubject = new Subject<void>();

  getCategories(): Observable<ICategory[]> {
    return this._http.get<ICategory[]>(`${this._urlBase}/getAll`);
  }

  getCategory(id: string): Observable<ICategory> {
    return this._http.get<ICategory>(`${this._urlBase}/getById/${id}`);
  }

  updateCategory(id: string, formData: FormData): Observable<ICategory> {
    return this._http
      .put<ICategory>(`${this._urlBase}/update/${id}`, formData)
      .pipe(
        tap(() => {
          this.categoryUpdatedSubject.next();
        })
      );
  }

  getCategoryUpdatedObservable(): Observable<void> {
    return this.categoryUpdatedSubject.asObservable();
  }

  createCategory(category: ICategory): Observable<ICategory> {
    return this._http.post<ICategory>(`${this._urlBase}/save`, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this._http.delete<string>(`${this._urlBase}/delete/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  updateCategoryImage(id: string, image: File): Observable<ICategory> {
    const formData = new FormData();
    formData.append('image', image, image.name);

    return this._http.put<ICategory>(
      `${this._urlBase}/updateImage/${id}`,
      formData
    );
  }
}
