import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Ficha } from '../interfaces/ficha';

@Injectable({
  providedIn: 'root'
})
export class EstadisposicionfichaService {

  constructor(private httpClient: HttpClient) { }

  readonly url = `${environment.apiUrl}/ficha/`
  registrar(datsficharegister: any) {
    let url = `${this.url}registrar`;
    return this.httpClient
      .post<any>(url, datsficharegister);
  }
  verificarOne(nroficha: any, codmed: number, codesp: number, fechpresent: any) {
    let url = `${this.url}verificarOne`;
    return this.httpClient
      .post<any>(url, {
        "nroficha": nroficha,
        "fechpresent": fechpresent,
        "codmed": codmed,
        "codesp": codesp
      });
  }
  verificarAll(nroficha: any, codmed: number, codesp: number, fechpresent: any) {
    let url = `${this.url}verificarAll`;
    return this.httpClient
      .post<any>(url, {
        "nroficha": nroficha,
        "fechpresent": fechpresent,
        "codmed": codmed,
        "codesp": codesp
      });
  }
  verdisposicion(nroficha: any, codmed: number, fechpresent: any) {
    let url = `${environment.apiUrl}disposicion`;
    return this.httpClient
      .post<any>(url, {
        "fechpresent": fechpresent,
        "codmed": codmed,
        "nroficha": nroficha
      });
  }
}