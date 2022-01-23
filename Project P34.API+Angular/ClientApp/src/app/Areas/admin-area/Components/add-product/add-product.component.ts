import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ProductManagerService } from '../../Services/product-manager.service';
import { ProductItem } from '../../Models/product-item.model';
import { ImagesItem } from '../../Models/Images-item.model';
import { SubcategoryItem } from '../../Models/subcategory-item.model';
import { SubcategoryManagerService } from '../../Services/subcategory-manager.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {


  model : ProductItem = new ProductItem();
  model2: ImagesItem= new ImagesItem();
  model3: SubcategoryItem = new SubcategoryItem();
  isError = false;

  SelectedSubCategory: string;
  allSubCategories: SubcategoryItem[] = [];

  constructor(
    private productService: ProductManagerService,
    private notifier: NotifierService,
    private router: Router,
    private subCategoryService: SubcategoryManagerService,
  ) { }

  OnSubmit() {

    // if (this.model.firstname === null) {
    //   this.notifier.notify('error', 'Please, enter name of product!');
    //   this.isError = true;
    // }

    if (this.model.price === null) {
      this.notifier.notify('error', 'Please, enter price of product!');
      this.isError = true;
    }

    if (this.model.countryMade === null) {
      this.notifier.notify('error', 'Please, enter countryMade of product!');
      this.isError = true;
    }

    // if (this.model.description === null) {
    //   this.notifier.notify('error', 'Please, enter description of product!');
    //   this.isError = true;
    // }

    if (this.model.rating === null) {
      this.notifier.notify('error', 'Please, enter rating of product!');
      this.isError = true;
    }

    if (this.model.size === null) {
      this.notifier.notify('error', 'Please, enter size of product!');
      this.isError = true;
    }

    if (this.model.count === null) {
      this.notifier.notify('error', 'Please, enter count of product!');
      this.isError = true;
    }

    if (this.model.image === null) {
      this.notifier.notify('error', 'Please, enter image of product!');
      this.isError = true;
    }

  


    if (this.isError === false) {
      console.log(this.model.images);
      this.model.subcategoryId=this.SelectedSubCategory;
      this.productService.addProduct(this.model).subscribe(
        data => {
          console.log(data);
          if (data.status === 200) {
            this.notifier.notify('success', 'Product is added!');
          
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
    // if (this.isError === false) {
    //   this.productService.addImageToProduct(this.model2, this.model.id).subscribe(
    //     data => {
    //       console.log(data);
    //       if (data.status === 200) {
    //         this.notifier.notify('success', 'Images to Product are added!');
          
    //       } else {
    //         console.log(data.errors);
    //         for (let i = 0; i < data.errors.length; i++) {
    //           this.notifier.notify('error', data.errors[i]);
    //         }
           
    //       }
    //     },
    //     errors => {
    //       console.log(errors);
    //     });
    // } 
  }



  onOptionSelect(data:string){
    
    this.SelectedSubCategory=data;
    
    console.log(data);
  }

  ngOnInit():void {
  
    this.subCategoryService.getAllSubCategories().subscribe((SubCategories: SubcategoryItem[])=>{
      this.allSubCategories = SubCategories;
      console.log(this.allSubCategories);
    });



  }
  sendDataToNewUser() {}

}
