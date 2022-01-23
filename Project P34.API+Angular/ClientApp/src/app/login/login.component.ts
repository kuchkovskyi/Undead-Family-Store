import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignInModel } from './../Models/login.model';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model = new SignInModel();
  isExpanded = false;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isError: boolean;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService
  ) {
    this.isLoggedIn = this.apiService.isLoggedIn();
    this.isAdmin = this.apiService.isAdmin();

    this.apiService.loginStatus.subscribe((status) => {
      this.isLoggedIn = status;
      this.isAdmin = this.apiService.isAdmin();
    });
  }

  ngOnInit() {
    this.isError = false;
  }

  validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit() {
    this.spinner.show();

    if (this.model.Email === null) {
      this.notifier.notify('error', 'Поле "Email" пусте!');
      this.isError = true;
    } else if (!this.validateEmail(this.model.Email)) {
      this.notifier.notify('error', 'Email не коректний!');
      this.isError = true;
    }
    if (this.model.Password === null) {
      this.notifier.notify('error', 'Поле "Пароль" пусте!');
      this.isError = true;
    }

    if (this.isError === false) {

      this.apiService.SignIn(this.model).subscribe(
        data => {
          if (data.status === 200) {
            console.log(data);
            window.localStorage.setItem('token', data.token);
            this.apiService.loginStatus.emit(true);

            const jwtData = data.token.split('.')[1];
            const decodedJwtJsonData = window.atob(jwtData);
            const decodedJwtData = JSON.parse(decodedJwtJsonData);

            if (decodedJwtData.roles === 'User') {
              this.router.navigate(['/']);
            } else if (decodedJwtData.roles === 'Admin') {
              this.router.navigate(['/admin-panel']);
            }
              this.spinner.hide();
            } else {
              for (let i = 0; i < data.errors.length; i++) {
                this.notifier.notify('error', data.errors[i]);
              }
              this.spinner.hide();
            }
          }
        );

      } else {
        this.isError = false;
        this.spinner.hide();
      }
    }

  Logout() {
    this.apiService.Logout();
    this.router.navigate(['/']);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  google() {
    this.spinner.show();

    this.apiService.GoogleLogin().subscribe(
      data => {
        if(data.status === 200){
          this.notifier.notify('succes', "Hi");
        }
      }
    )
  }

  facebook() {
    this.spinner.show();

    this.apiService.FacebookLogin().subscribe(
      data => {
        if(data.status === 200){
          this.notifier.notify('succes', "Hi");
        }
      }
    )
  }

}
