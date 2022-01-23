import { Component, OnInit } from '@angular/core';
import { SubcategoryItem } from '../../Models/subcategory-item.model';
import { SubcategoryManagerService } from '../../Services/subcategory-manager.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { ApiResult } from 'src/app/Models/result.model';

@Component({
  selector: 'app-list-subcategory',
  templateUrl: './list-subcategory.component.html',
  styleUrls: ['./list-subcategory.component.css']
})
export class ListSubcategoryComponent implements OnInit {

  listOfData: SubcategoryItem[] = [];

  constructor(private subCategoryService: SubcategoryManagerService,
    private notifier: NotifierService,
    private router: Router) { }




    RemoveSub(id: string) {
      this.subCategoryService.removeSubCategory(id).subscribe(
        (data: ApiResult) => {
          if (data.status === 200) {
            this.notifier.notify('success', 'Subcategory removed :)');
  
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

    this.subCategoryService.getAllSubCategories().subscribe((AllSubCategories: SubcategoryItem[]) => {
      this.listOfData = AllSubCategories;
      console.log(this.listOfData);})
      /**/
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


