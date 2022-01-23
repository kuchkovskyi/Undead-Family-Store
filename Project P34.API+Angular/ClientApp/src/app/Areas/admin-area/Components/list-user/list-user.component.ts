import { Component, OnInit } from '@angular/core';
import { UserManagerService } from '../../Services/user-manager.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { UserItem } from 'src/app/Areas/user-area/personal-room/models/user-item.model';
import { ApiResult } from 'src/app/Models/result.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {



  listOfData: UserItem[] = [];
  searchUser: string;
  searchResult: UserItem[] = [];

  constructor(private userService: UserManagerService,
    private notifier: NotifierService,
    private router: Router) { }


  SearchUser() {
    this.searchResult = this.listOfData.filter(
      t => t.fullName.toLowerCase().includes(this.searchUser.toLowerCase())
    );
  }

  RemoveUser(id: string) {
    this.userService.removeUser(id).subscribe(
      (data: ApiResult) => {
        if (data.status === 200) {
          this.notifier.notify('success', 'Юзера видалено.)');

          console.log(data);

        } else {
          for (let i = 0; i < data.errors; i++) {
            this.notifier.notify('error', data.errors[i]);

          }
        }
      }
    );
  }


    ngOnInit() {

      this.userService.getAllUsers().subscribe((AllUsers: UserItem[]) => {
        this.listOfData = AllUsers;
        this.searchResult = AllUsers;
        console.log(this.listOfData);
      })



      document.getElementById("defActionOpen").click();
      function chooseAction(evt, actionName) {
        var i, tabcontentAction, tablinksAction;

        tabcontentAction = document.getElementsByClassName("tabcontent-action");
        for (i = 0; i < tabcontentAction.length; i++) {
          tabcontentAction[i].style.display = "none";
        }

        tablinksAction = document.getElementsByClassName("tablink-action");
        for (i = 0; i < tablinksAction.length; i++) {
          tablinksAction[i].className = tablinksAction[i].className.replace(" active", "");
        }

        document.getElementById(actionName).style.display = "block";
        evt.currentTarget.className += " active";
      }

      document.getElementById("defListOpen").click();
      function openList(evt, listName) {
        var i, tabcontentList, tablinkList;

        tabcontentList = document.getElementsByClassName("tabcontent-list");
        for (i = 0; i < tabcontentList.length; i++) {
          tabcontentList[i].style.display = "none";
        }

        tablinkList = document.getElementsByClassName("tablink-list");
        for (i = 0; i < tablinkList.length; i++) {
          tablinkList[i].className = tablinkList[i].className.replace(" active", "");
        }

        document.getElementById(listName).style.display = "block";
        evt.currentTarget.className += " active";
      }
    }

  }
