import { Component, OnInit } from '@angular/core';
import { CategoryItem } from '../../Models/category-item.model';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { CategoryManagerService } from '../../Services/category-manager.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {


  model: CategoryItem = new CategoryItem();
  isError = false;



  constructor(
     private categoryServise:CategoryManagerService ,
    private notifier: NotifierService,
    private router: Router
  ) { }

  OnSubmit() {

   
    if (this.model.name === null) {
      this.notifier.notify('error', 'Please, enter name of category!');
      this.isError = true;
    }




    if (this.isError === false) {
      this.categoryServise.addCategory(this.model).subscribe(
        data => {
          console.log(data);
          if (data.status === 200) {
            this.notifier.notify('success', 'Category is added!');

          } else {
            console.log(data.errors);
            for (let i = 0; i < data.errors.length; i++) {
              this.notifier.notify('error', data.errors[i]);
            }

          }
        },
        errors => {
          console.log(errors);
        });
    }
  
  }



  ngOnInit(): void {
    // document.getElementById("defActionOpen").click();
    // function chooseAction(evt, actionName) {
    //   var i, tabcontentAction, tablinksAction;

    //   tabcontentAction = document.getElementsByClassName("tabcontent-action");
    //   for (i = 0; i < tabcontentAction.length; i++) {
    //     tabcontentAction[i].style.display = "none";
    //   }

    //   tablinksAction = document.getElementsByClassName("tablink-action");
    //   for (i = 0; i < tablinksAction.length; i++) {
    //     tablinksAction[i].className = tablinksAction[i].className.replace(" active", "");
    //   }

    //   document.getElementById(actionName).style.display = "block";
    //   evt.currentTarget.className += " active";
    // }

    // document.getElementById("defListOpen").click();
    // function openList(evt, listName) {
    //   var i, tabcontentList, tablinkList;

    //   tabcontentList = document.getElementsByClassName("tabcontent-list");
    //   for (i = 0; i < tabcontentList.length; i++) {
    //     tabcontentList[i].style.display = "none";
    //   }

    //   tablinkList = document.getElementsByClassName("tablink-list");
    //   for (i = 0; i < tablinkList.length; i++) {
    //     tablinkList[i].className = tablinkList[i].className.replace(" active", "");
    //   }

    //   document.getElementById(listName).style.display = "block";
    //   evt.currentTarget.className += " active";
    // }







  }
  sendDataToNewUser() { }

}
