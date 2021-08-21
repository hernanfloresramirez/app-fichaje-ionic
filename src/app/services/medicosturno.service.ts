import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MedicosturnoService {

  constructor(private httpClient: HttpClient) { }
  readonly url = `${environment.apiUrl}/medicsturn`;
  viewnormal(tipo: any) {
    let url = `${this.url}/${tipo}`;
    return this.httpClient
      .get<any>(url);
  }
  viewdetaills(tipo: any, area: any) {
    let url = `${this.url}/${tipo}/${area}`;
    return this.httpClient
      .get<any>(url);
  }
}
