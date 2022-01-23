import { Component, OnInit } from '@angular/core';
import { ProductItem } from './model/product-item.model';
import { ProductService } from './service/product.service';
import { CartModel } from 'src/app/Models/cart';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  
  product: ProductItem = new ProductItem();

  constructor(private productService: ProductService,
    private notifier: NotifierService) {

    this.productService.getProduct().subscribe(
      (data: ProductItem) => {
          this.product = data;
          console.log(this.product.id);
        }
      );

    
  }

  modelCart: CartModel = new CartModel();
  addCartProducts(id: string) {
    this.modelCart.searchProductId = id;

    const token = localStorage.getItem('token');
    if (token !== null) {

        const jwtData = token.split('.')[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData = JSON.parse(decodedJwtJsonData);

        this.modelCart.userId = decodedJwtData.id;

        this.productService.addCartProducts(this.modelCart).subscribe(
            data => {
                console.log(data);
                if (data.status === 200) {
                    this.notifier.notify('success', 'Добавлено в кошик');

                } else {
                    console.log(data.errors);
                    for (let i = 0; i < data.errors.length; i++) {
                        this.notifier.notify('error', data.errors[i]);
                    }

                }
            })
    }
}


  ngOnInit():void {
    //BTS OF SIZE
    function makeActive(evt) {
      var i, sizeBtns;
      sizeBtns = document.getElementsByClassName("size-btn");
      for (i = 0; i < sizeBtns.length; i++) {
        sizeBtns[i].className = sizeBtns[i].className.replace(" active", "");
      }
      evt.currentTarget.className += " active";
    }
    document.getElementById("DefaultActive").click();
    //END OF THIS FUNCTION


  }


  

}
