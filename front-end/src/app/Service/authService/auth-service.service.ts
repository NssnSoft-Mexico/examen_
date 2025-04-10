import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = 'https://localhost:7183';

  constructor(private http: HttpClient) { }

  async getAllRegistro(): Promise<any> {
    return await this.http.get<any>(`${this.url}/api/Registros`).toPromise().then(result => {
      const data = result.length ? result : false;
      return data;
    });
  }

  async setPersona(compania:string, persona:string, correo:string, telefono:string): Promise<any> {
    const queryParams: any = {
      compania:compania,
      persona:persona,
      correo:correo,
      telefono:telefono
    }
    return await this.http.post<any>(`${this.url}/api/Registros`, queryParams).toPromise();
  }

}
