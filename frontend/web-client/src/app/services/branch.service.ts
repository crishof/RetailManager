import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { IBranch } from "../model/branch.model";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class BranchService {
  private readonly _http = inject(HttpClient);
  private readonly _urlBase = `${environment.gatewayUrl}/api/v1/branches`;

  getBranches(): Observable<IBranch[]> {
    return this._http.get<IBranch[]>(`${this._urlBase}`);
  }

  constructor() {}
}
