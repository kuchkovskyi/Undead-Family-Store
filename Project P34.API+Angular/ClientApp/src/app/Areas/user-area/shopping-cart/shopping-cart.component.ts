import { Component, OnInit } from '@angular/core';
import { ProductItem } from 'src/app/home/product/product-view/model/product-item.model';
import { CartModel } from 'src/app/Models/cart';
import { ProductService } from 'src/app/home/product/product-view/service/product.service';
import { NotifierService } from 'angular-notifier';
import { ApiResult } from 'src/app/Models/result.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  model: CartModel = new CartModel();

  products: ProductItem[] = [];
  cart: ProductItem[] = [];
  product: ProductItem = new ProductItem();

  constructor(private productService: ProductService, private notifier: NotifierService) { }

  



  removeProductCart(idProduct: string) {
    const token = localStorage.getItem('token');
    if (token !== null) {

      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);

      this.productService.removeProductCart(decodedJwtData.id, idProduct).subscribe(
        (data: ApiResult) => {
          if (data.status === 200) {
            this.notifier.notify('success', 'REEMOVED CartProd:)');

            this.productService.getCartProducts(decodedJwtData.id).subscribe(
              (data: CartModel) => {
                this.model = data;
                this.products = this.model.products;
              }
            );

          } else {
            for (let i = 0; i < data.errors; i++) {
              this.notifier.notify('error', data.errors[i]);

            }
          }
        });
    }
  }
  ngOnInit() {

    const token = localStorage.getItem('token');
    if (token !== null) {

      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);
      console.log(decodedJwtData.id);
      this.productService.getCartProducts(decodedJwtData.id).subscribe(
        (data: CartModel) => {
          this.model = data;
          this.products = this.model.products;
        }
      );

      this.cart = (JSON.parse(sessionStorage.getItem('cart')) as ProductItem[]);

    }
  }

    viewProduct(id: string) {
        this.productService.temp = id;


        /*добавление в недавно просмотренние*/
        this.model.searchProductId = id;

        const token = localStorage.getItem('token');
        if (token !== null) {

            const jwtData = token.split('.')[1];
            const decodedJwtJsonData = window.atob(jwtData);
            const decodedJwtData = JSON.parse(decodedJwtJsonData);

            this.model.userId = decodedJwtData.id;
            this.productService.addViewedProduct(this.model).subscribe(
                data => {
                    console.log(data);
                    if (data.status === 200) {
                        this.notifier.notify('success', 'Добавлено в переглянуті');

                    } else {
                        console.log(data.errors);
                        for (let i = 0; i < data.errors.length; i++) {
                            this.notifier.notify('error', data.errors[i]);
                        }

                    }
                })
        }
    }

  removeFromCart(id: string) {
    var toDelete = this.cart.findIndex(t => t.id === id);
    this.cart.splice(toDelete, 1);
    sessionStorage.removeItem('cart');
    sessionStorage.setItem('cart', JSON.stringify(this.cart));

    const token = localStorage.getItem('token');
    if (token !== null) {

        const jwtData = token.split('.')[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData = JSON.parse(decodedJwtJsonData);

        this.model.userId = decodedJwtData.id;
        this.productService.addViewedProduct(this.model).subscribe(
            data => {
                console.log(data);
                if (data.status === 200) {
                    this.notifier.notify('success', 'Добавлено в переглянуті');

                } else {
                    console.log(data.errors);
                    for (let i = 0; i < data.errors.length; i++) {
                        this.notifier.notify('error', data.errors[i]);
                    }

                }
            })
    }
}

}
