import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { ReturnModel } from './../../../../Models/ReturnModel';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {
  model = new ReturnModel();
  isError: boolean;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService
  ) { }


  ngOnInit() {
    this.isError = false;
  }

  OnSubmit() {
    this.spinner.show();

    if(this.model.nameSurname === null) {
      this.notifier.notify('error', 'Поле "ПІБ" пусте!');
      this.isError = true;
    }
    if(this.model.email === null) {
      this.notifier.notify('error', 'Поле "Email" пусте!');
      this.isError = true;
    } else if (!this.validateEmail(this.model.email)) {
      this.notifier.notify('error', 'Email не коректний!');
      this.isError = true;
    }
    if(this.model.phone === null) {
      this.notifier.notify('error', 'Поле "Телефон" пусте!');
      this.isError = true;
    }
    if(this.model.numberOfOrder === null) {
      this.notifier.notify('error', 'Поле "Номер договору" пусте!');
      this.isError = true;
    }
    if(this.model.nameOfProduct === null) {
      this.notifier.notify('error', 'Поле "Назва продукту" пусте!');
      this.isError = true;
    }
    if(this.model.articleOfProduct === null) {
      this.notifier.notify('error', 'Поле "Артикул" пусте!');
      this.isError = true;
    }
    if(this.model.count === null) {
      this.notifier.notify('error', 'Поле "Кількість" пусте!');
      this.isError = true;
    }
    if(this.model.reason === null) {
      this.notifier.notify('error', 'Поле "Причина" пусте!');
      this.isError = true;
    }

    if (this.isError === false) {
      this.notifier.notify('success', 'Відправлено :)');

    } else {
      this.isError = false;
      this.spinner.hide();
    }
  }

  validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
