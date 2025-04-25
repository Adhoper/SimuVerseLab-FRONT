import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService.service';
import { SharedModule } from '../../shared/shared.module';
import { LoaderService } from '../../services/loader.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-login',
  imports: [SharedModule,LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  errorMensaje: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router
    ,private loader: LoaderService
  ) {
    this.loginForm = this.fb.group({
      identificadorUsuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
    
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
    this.errorMensaje = '';
  });
  }

  getInputClasses(controlName: string): string {
    const control = this.loginForm.get(controlName);
    return control && control.invalid && (control.touched || this.submitted)
      ? 'border-red-500'
      : '';
  }
  
  onSubmit() {
    this.submitted = true;
  
    if (this.loginForm.valid) {
      this.loader.show();
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          const userData = res.singleData;
          if (res.successful && userData?.token) {
            this.authService.saveAuthData(userData.token, userData);
            this.loader.hide();
            this.router.navigate(['/app/dashboard']);
          } else {
            this.errorMensaje = res.message || 'Error al iniciar sesión';
            this.loader.hide();
          }
        },
        error: (err) => {
          this.errorMensaje = 'Error del servidor o conexión';
          console.error(err);
          this.loader.hide();
        }
      });
    }
  }
  

}
