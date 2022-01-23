import { Component, OnInit } from '@angular/core';
import { CategoryItem } from 'src/app/Areas/admin-area/Models/category-item.model';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { SubcategoryItem } from 'src/app/Areas/admin-area/Models/subcategory-item.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  model2: CategoryItem;
  categoryId: string;
  listOfCategories: CategoryItem[] = [];
  subcategories: SubcategoryItem[] = [];

  constructor(private categoryServise: CategoryService,
    private notifier: NotifierService,
    private router: Router) { }

  ngOnInit() {
    this.categoryServise.getAllCategories().subscribe(
      (AllCategories: CategoryItem[]) => {
        this.listOfCategories = AllCategories;
      });
  }

  SubcategoriesFromCategory(idCategory: string) {
    // for (let i = 0; i < this.listOfCategories.length; i++) {     
    //   for (let j = 0; j < this.subcategories.length; j++) {
    //     this.listOfCategories[i].subcategories.push({ idSub: this.subcategories[j].id, nameSub: this.subcategories[j].name });
    //   }
    // }
    
        this.categoryServise.subcategoriesFromCategory(idCategory).subscribe(
          (subcategoriess: SubcategoryItem[]) => {
    
            this.subcategories = subcategoriess;
            console.log(this.subcategories);
          });
      }


}
