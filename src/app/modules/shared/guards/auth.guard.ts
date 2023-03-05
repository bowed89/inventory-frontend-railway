import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public _loginService: LoginService,
    public router: Router,

  ) { }

  canActivate(

  ) {
//    const token = localStorage.getItem("token");
    const token = JSON.parse(localStorage.getItem('token')!);


    return this._loginService.validarToken(token).pipe(tap(estaAutenticado => {
      console.log('estaAutenticado', estaAutenticado);

      if (!estaAutenticado) {
        this.router.navigateByUrl('login');
      }
      
    }))
  }

}