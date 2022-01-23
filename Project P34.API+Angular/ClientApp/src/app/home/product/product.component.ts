import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from './product-view/service/product.service';
import { ProductItem } from './product-view/model/product-item.model';
import { WishListModel } from '../../Models/wishlist.model';
import { NotifierService } from 'angular-notifier';
import { CartModel } from 'src/app/Models/cart';
import { ViewedProductModel } from 'src/app/Models/viewedProduct.model';
import { ProtocolMode } from 'angularx-social-login/providers/microsoft-login-provider';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    viewProducts: ViewedProductModel[] = [];
    model: ViewedProductModel = new ViewedProductModel();
    modelCart: CartModel = new CartModel();
    products: ProductItem[] = [];
    product: ProductItem = new ProductItem();
    cartProduct: ProductItem = new ProductItem();
    cart: ProductItem[] = [];

    listOfData: ProductItem[] = [];
    searchProd: string;
    searchResult: ProductItem[] = [];

    constructor(private productService: ProductService,
        private notifier: NotifierService) {



        // this.productService.searchProduct(this.productService.search).subscribe((data2: ProductItem[])=>{
        //   this.products = data2;
        //   this.listOfData = data2;
        //   this.searchResult = data2;

        // });

    }/*Constructor close*/

    // SearchProduct() {
    //     this.searchResult = this.listOfData.filter(
    //       t => t.name.toLowerCase().includes(this.searchProd.toLowerCase())
    //     );
    //   }


    wishlistArray: ProductItem[] = [];


    ngOnInit() {
        this.productService.getProducts().subscribe(
            (data: ProductItem[]) => {
                this.products = data;
                this.listOfData = data;
            }
        );

        this.productService.es.subscribe(text => {
            this.productService.searchProduct(text).subscribe(data => {
                this.products = data;
            });
        });
        // this.productService.searchProduct(text).subscribe((data2:ProductItem[])=>{
        //   this.searchResult=data2;
        // });
        const tmp = localStorage.getItem("wishlist");
        if (tmp != null) {
            this.wishlistArray = JSON.parse(localStorage.getItem("wishlist"));
        }


    }

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

    addToCart(id: string) {
        var array: ProductItem[] = [];

        if (sessionStorage.getItem('cart') === null) {
            this.productService.getProductById(id).subscribe(
                (data: ProductItem) => {
                    array.push(data);
                    this.setStorageItem(array);
                    this.notifier.notify('success', 'Продукт добавлений у корзину');
                }
            );
        } else {
            array = (JSON.parse(sessionStorage.getItem('cart')) as ProductItem[]);
            this.productService.getProductById(id).subscribe(
                (data: ProductItem) => {
                    array.push(data);
                    this.setStorageItem(array);
                    this.notifier.notify('success', 'Продукт добавлений у корзину');
                }
            );
        }



    }

    setStorageItem(array) {
        sessionStorage.removeItem('cart');
        sessionStorage.setItem('cart', JSON.stringify(array));
    }


    showStorage = [];

    addToWishList(id: string) {
        this.showStorage = JSON.parse(localStorage.getItem("wishlist"));
        var tmp = this.showStorage.find(t => id === id);
        if (tmp === undefined) {

            this.productService.getProductById(id).subscribe(
                (data: ProductItem) => {
                    this.wishlistArray.push(data);
                    localStorage.setItem("wishlist", JSON.stringify(this.wishlistArray));
                    this.notifier.notify('success', 'Продукт добавлений у бажане');
                }
            );
        }
        else {
            this.notifier.notify('warning', 'Продукт уже знаходиться у бажаному!');
        }


    }
}




