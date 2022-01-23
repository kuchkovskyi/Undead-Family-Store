import { Component, OnInit } from '@angular/core';
import { SubcategoryItem } from '../../Models/subcategory-item.model';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { SubcategoryManagerService } from '../../Services/subcategory-manager.service';
import { CategoryManagerService } from '../../Services/category-manager.service';
import { CategoryItem } from '../../Models/category-item.model';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit {

  SelectedCategory: string;
  model: SubcategoryItem = new SubcategoryItem();
  model2: CategoryItem = new CategoryItem();
  isError = false; 
  allCategories: CategoryItem[] = [];

  constructor(
    private subCategoryService: SubcategoryManagerService,
    private categoryService: CategoryManagerService,
    private notifier: NotifierService,
    private router: Router
  ) { }

  getcompanyid(id){
    this.model.categoryId=id;
    console.log(id);
  }

  OnSubmit() {


    if (this.model.name === null) {
      this.notifier.notify('error', 'Please, enter name of SubCategory!');
      this.isError = true;
    }



    if (this.isError === false) {
      console.log(this.SelectedCategory);
      // this.model.categoryId=document.getElementById("categories").nodeValue;
      this.subCategoryService.addSubCategory(this.model).subscribe(
        data => {
          console.log(data);
          if (data.status === 200) {
            this.notifier.notify('success', 'SubCategory is added!');

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

    this.categoryService.getAllCategories().subscribe((Categoriess: CategoryItem[])=>{
      this.allCategories = Categoriess;
      console.log(this.allCategories);
    });

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

  sendDataToNewUser() { }

}
