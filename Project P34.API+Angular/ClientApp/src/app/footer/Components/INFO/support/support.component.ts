import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SupportModel } from '../../../../Models/support.model';
import { ApiService } from '../../../../core/api.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService,
    private router: Router) 
    { }

    isError: boolean;
    model = new SupportModel();

  ngOnInit() {
    this.isError = false;
  }

  onSubmit(){
    this.spinner.show();

    if(this.model.email === ""){
      this.notifier.hideOldest();
      this.notifier.notify('warn', 'Field email is empty');
      this.isError = true;
    }
    if(this.model.text === ""){
      this.notifier.hideOldest();
      this.notifier.notify('warn', 'Field text is empty');
      this.isError = true;
    }

    if (this.isError == false) {
      this.apiService.SupportRequest(this.model).subscribe(
        data => {
          console.log(data);
          if (data.status === 200) {
            this.spinner.hide();
            this.notifier.notify('success', 'Request successfuly sended');
            this.router.navigate(['/']);
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

}
