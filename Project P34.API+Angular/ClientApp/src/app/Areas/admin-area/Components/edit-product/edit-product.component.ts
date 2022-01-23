import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ProductManagerService } from '../../Services/product-manager.service';
import { ProductItem } from '../../Models/product-item.model';
import { SubcategoryManagerService } from '../../Services/subcategory-manager.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { SubcategoryItem } from '../../Models/subcategory-item.model';
import { ApiResult } from 'src/app/Models/result.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  model : ProductItem = new ProductItem();

  isError = false;
  productId: string;
  SelectedSubCategory: string;
  allSubCategories: SubcategoryItem[] = [];

  constructor(
    private productService: ProductManagerService,
    private notifier: NotifierService,
    private router: Router,
    private subCategoryService: SubcategoryManagerService,
    private route: ActivatedRoute
  ) { }

  OnSubmit(){
    this.model.subcategoryId=this.SelectedSubCategory;
    
    this.productService.editProduct(this.productId, this.model).subscribe(
      (data: ApiResult) => {
        if (data.status === 200) {
          this.notifier.notify('success', 'Продукт змінено');
          this.router.navigate(['/admin-panel']);
        }
      },
      (error) => {
        this.notifier.notify('error', 'ERROR!!!');
      }
    );
  }

  onOptionSelect(data:string){
    
    this.SelectedSubCategory=data;
    
    console.log(data);
  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.productId = params['id'];
    });

    this.productService.getProduct(this.productId).subscribe((prod: ProductItem) => {
      this.model = prod;
      
    });


    this.subCategoryService.getAllSubCategories().subscribe((SubCategories: SubcategoryItem[])=>{
      this.allSubCategories = SubCategories;
      console.log(this.allSubCategories);
    });
  }


}
