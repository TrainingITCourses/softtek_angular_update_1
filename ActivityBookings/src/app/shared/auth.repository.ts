import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  #http: HttpClient = inject(HttpClient);
  #url: string = `${environment.apiUrl}`;

  postLogin$(credentials: any) {
    return this.#http.post<any>(`${this.#url}/login`, credentials);
  }
  postRegister$(credentials: any) {
    return this.#http.post<any>(`${this.#url}/register`, credentials);
  }
}
