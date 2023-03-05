import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL_LOGIN } from '../../../config/config';
import { LoginElement } from '../interfaces/login.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  // Almacenar Categorias
  loginUser(body: LoginElement) {
    const endpoint = `${BASE_URL_LOGIN}/login`;
    return this.http.post(endpoint, body, { observe: 'response' });

  }

  validarToken(token: any) {
    const endpoint = `${BASE_URL_LOGIN}/user/verify/${token}`;
    
    return this.http.get(endpoint).pipe(map(res => {
      if (res) { return true; }
      return false;
    }));

  }


}
