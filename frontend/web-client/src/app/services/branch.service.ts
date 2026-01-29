import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IBranch } from '../model/branch.model';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private _http = inject(HttpClient);
  private _urlBase = 'http://localhost:443/branch-sv/branch';

  getBranches(): Observable<IBranch[]> {
    return this._http.get<IBranch[]>(`${this._urlBase}/getAll`);
  }

  constructor() {}
}
