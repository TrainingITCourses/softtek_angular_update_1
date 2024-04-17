import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesRepository {
  #http: HttpClient = inject(HttpClient);
  #url: string = `${environment.apiUrl}/activities`;

  getAll$() {
    return this.#http.get<any[]>(this.#url);
  }

  getById$(id: string) {
    return this.#http.get<any>(`${this.#url}/${id}`);
  }
}
