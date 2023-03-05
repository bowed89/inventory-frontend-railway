import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/shared/services/login.service';
import { LoginElement } from '../../../shared/interfaces/login.interface';

import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/modules/shared/services/product.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public _loginService: LoginService,
    public _productService: ProductService,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['admin@admin.com', Validators.required],
      password: ['admin', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const body: LoginElement = this.loginForm.value;
    this._loginService.loginUser(body).subscribe({
      next: (res) => {
        let token = res.headers.get('authorization')!.split('Bearer ')[1];
        localStorage.setItem("token", JSON.stringify(token));
        this.openSnackBar("Inicio de sesión satisfactoriamente", "Exito");
        this.router.navigateByUrl('/dashboard/home');
        setTimeout(() => {
          location.reload();
        }, 400)
      }, error: () => { this.openSnackBar("Verificar los datos", "Error"); }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }


}
