import { Component, OnInit } from '@angular/core';
import { UserItem } from '../personal-room/models/user-item.model';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../personal-room/service/user.service';
import { ApiService } from '../../../core/api.service';
import { ApiResult } from '../../../Models/result.model';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(private userService: UserService,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private apiService: ApiService) {
      const token = localStorage.getItem('token');
      if (token !== null) {
        const jwtData = token.split('.')[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData = JSON.parse(decodedJwtJsonData);
        this.tmpId = decodedJwtData.id;

      }
     }

  isConfirm:boolean = false;

  onChecked() { this.isConfirm = !this.isConfirm; }

  ngOnInit() {  }

  user: UserItem = new UserItem();
  tmpId: string;
  

  deleteUser(tmpId) {
    this.spinner.show();

    this.userService.removeUser(tmpId).subscribe(
      (data: ApiResult) => {
        if (data.status === 200) {
          this.notifier.notify('success', 'Ви успішно видалили свій профіль');
          this.apiService.Logout();
          this.router.navigate(['/']);
        } else {
          for (let i = 0; i < data.errors; i++) {
            this.notifier.notify('error', data.errors[i]);
          }
        }
        this.spinner.hide();
      }
    );
  }

    

  

}
