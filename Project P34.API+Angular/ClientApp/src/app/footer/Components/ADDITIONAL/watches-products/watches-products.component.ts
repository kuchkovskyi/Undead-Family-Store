import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/home/product/product-view/service/product.service';
import { NotifierService } from 'angular-notifier';
import { ProductItem } from 'src/app/home/product/product-view/model/product-item.model';
import { ViewedProductModel } from 'src/app/Models/viewedProduct.model';

@Component({
  selector: 'app-watches-products',
  templateUrl: './watches-products.component.html',
  styleUrls: ['./watches-products.component.css']
})
export class WatchesProductsComponent implements OnInit {
  model: ViewedProductModel = new ViewedProductModel();

  products: ProductItem[] = [];
  product: ProductItem = new ProductItem();
  constructor(private productService: ProductService,
    private notifier: NotifierService) { }

  ngOnInit() {

    const token = localStorage.getItem('token');
    if (token !== null) {

      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);
console.log(decodedJwtData.id);
      this.productService.getViewedProducts(decodedJwtData.id).subscribe(
        (data: ViewedProductModel) => {
          this.model = data;
          this.products = this.model.products;
        }
      );
    }

  }
}
