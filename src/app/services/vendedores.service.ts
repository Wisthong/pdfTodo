import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {
  ResponseVendedor,
  ResponseVendedores,
  Vendedor,
  Vendedores,
} from '../model/vendedores.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendedoresService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getAll(): Observable<Vendedores[]> {
    return this.http.get<ResponseVendedores>(this.apiUrl + '/vendedores').pipe(
      map(({ data }) => {
        return data;
      })
    );
  }

  getOne(cedula: string): Observable<Vendedor> {
    return this.http
      .get<ResponseVendedor>(this.apiUrl + '/vendedores/' + cedula)
      .pipe(
        map(({ data }) => {
          return data;
        })
      );
  }
}
