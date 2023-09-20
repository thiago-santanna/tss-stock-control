import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { ISignupUserRequest } from 'src/app/models/interfaces/user/ISignupUserRequest';
import { IAuthRequest } from 'src/app/models/interfaces/user/auth/IAuthRequest';
import { UserService } from 'src/app/services/user/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private formBuild: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router) { }

  logincard: boolean = true;

  loginForm = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  signupForm = this.formBuild.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  onSubmitLoginForm(): void {
    if(this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as IAuthRequest).subscribe({
        next: (response) => {
          if(response) {
            this.cookieService.set('USER_INFO', response.token);
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);
            this.messageService.add({
              severity:'success',
              summary: 'Sucesso',
              detail: `Usuário ${response.name} logado com sucesso!`,
              life: 2000,
            });
          }
        },
        error: (error) => {
          this.messageService.add({
            severity:'error',
            summary: 'Erro',
            detail: 'Usuário ou senha inválidos!',
            life: 2000,
          });
          console.log('Erro ao autenticar usuário', error);
        }
      })
    }
  }

  onSubmitSinupForm(): void {
    if(this.signupForm.value && this.signupForm.valid) {
      this.userService.signupUser(this.signupForm.value as ISignupUserRequest).subscribe({
        next: (response) => {
          if(response) {
            this.messageService.add({
              severity:'success',
              summary: 'Sucesso',
              detail: `Usuário ${response.name} cadastrado com sucesso!`,
              life: 2000,
            });
            this.signupForm.reset();
            this.logincard = true;
          }
        },
        error: (error) => {
          this.messageService.add({
            severity:'error',
            summary: 'Erro',
            detail: 'Erro ao criar usuario',
            life: 2000,
          });
          console.log('Erro ao cadastrar usuário', error);
        }
      })
    }
  }


}
