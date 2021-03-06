import { ApiService } from './../core/api.service';
import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../Models/register.model';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SignInModel } from '../Models/login.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  model = new RegisterModel();
  confirmPassword: string;
  isError: boolean;

  ngOnInit() {
    this.isError = false;
  }

  onSubmit() {
    this.spinner.show();

    if (this.model.FullName === null) {
      this.notifier.notify('error', 'Поле "Ім\'я та прізвище" пусте!');
      this.isError = true;
    }
    if (this.model.Age === null) {
      this.notifier.notify('error', 'Поле "Вік" пусте!');
      this.isError = true;
    }
    if (this.model.PhoneNumber === null) {
      this.notifier.notify('error', 'Поле "Телефон" пусте!');
      this.isError = true;
    }
    if(this.model.Email === null){
      this.notifier.notify('error', 'Поле "Email" пусте!');
      this.isError = true;
    }
    if (!this.validateEmail(this.model.Email)) {
      this.notifier.notify('error', 'Email не задане у коректному форматі!');
      this.isError = true;
    }
    if(this.model.Password === null) {
      this.notifier.notify('error', 'Поле "Пароль" пусте!');
      this.isError = true;
    }
    if(this.confirmPassword === null) {
      this.notifier.notify('error', 'Ви не підтвердили свій пароль!');
      this.isError = true;
    }
    if (this.confirmPassword !== this.model.Password) {
      this.notifier.notify('error', 'Паролі не співпадають!');
      this.isError = true;
    }

    if (this.isError == false) {
      this.apiService.SingUp(this.model).subscribe(
        data => {
          console.log(data);
          if (data.status === 200) {
            this.spinner.hide();
            this.notifier.notify('success', 'You registered!');
            this.router.navigate(['/login']);
          } else {
             console.log(data.errors);
            for (let i = 0; i < data.errors.length; i++) {
              this.notifier.notify('error', data.errors[i]);
            }
            setTimeout(() => {
              this.spinner.hide();
            }, 2500);
          }
        },
        errors => {
          console.log(errors);
        });
      } else {
        setTimeout(() => {
          this.spinner.hide();
          this.isError = false;
        }, 1500);
      }
  }

  validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
