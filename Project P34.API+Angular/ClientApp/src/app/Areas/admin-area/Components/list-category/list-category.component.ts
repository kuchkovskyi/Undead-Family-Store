import { Component, OnInit } from '@angular/core';
import { CategoryManagerService } from '../../Services/category-manager.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { CategoryItem } from '../../Models/category-item.model';
import { ApiResult } from 'src/app/Models/result.model';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  model2: CategoryItem;
  categoryId: string;
  listOfData: CategoryItem[] = [];

  constructor(private categoryServise: CategoryManagerService,
    private notifier: NotifierService,
    private router: Router) { }



    RemoveCategory(id: string) {
      this.categoryServise.removeCategory(id).subscribe(
        (data: ApiResult) => {
          if (data.status === 200) {
            this.notifier.notify('success', 'Category removed :)');
  
            console.log(data);
  
          } else {
            for (let i = 0; i < data.errors; i++) {
              this.notifier.notify('error', data.errors[i]);
  
            }
          }
        }
      );
    }

    editCat(id: string){

   this.categoryServise.getCategory(id)
    .subscribe((categorry: CategoryItem) => {
        this.model2 = categorry;
      });

      // this.categoryServise.editCategory(id, this.model2).subscribe(
      //   (data: ApiResult) => {
      //     if (data.status === 200) {
      //       this.notifier.notify('success', 'Категорія змінена!');
      //       // this.router.navigate(['/admin-panel/categories-list-view']);
      //     }
      //   },
      //   (error) => {
      //     this.notifier.notify('error', 'ERROR!!!');
      //   }
      // );
    }



  ngOnInit() {
    this.categoryServise.getAllCategories().subscribe((AllCategories: CategoryItem[]) => {
      this.listOfData = AllCategories;
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
