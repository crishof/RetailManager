import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ICustomer } from "../model/customer.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private readonly http = inject(HttpClient);
  private readonly urlBase = `${environment.gatewayUrl}/api/v1/customers`;

  getAll(search?: string): Observable<ICustomer[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<ICustomer[]>(this.urlBase, { params });
  }

  getById(id: string): Observable<ICustomer> {
    return this.http.get<ICustomer>(`${this.urlBase}/${id}`);
  }

  create(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.urlBase, customer);
  }

  update(id: string, customer: Partial<ICustomer>): Observable<ICustomer> {
    return this.http.patch<ICustomer>(`${this.urlBase}/${id}`, customer);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
}
