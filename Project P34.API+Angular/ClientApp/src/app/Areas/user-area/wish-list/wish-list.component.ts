import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ProductItem } from 'src/app/home/product/product-view/model/product-item.model';
import { ProductService } from 'src/app/home/product/product-view/service/product.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  constructor(private notifier: NotifierService,
    private productService: ProductService) {
    this.showStorage = JSON.parse(localStorage.getItem("wishlist"));
    this.isEmpty();
  }
  showStorage: ProductItem[] = [];

  ngOnInit() {
  }
  

  removeFromWishList(id: string) {
    var toDelete = this.showStorage.findIndex(t => t.id === id);
    this.showStorage.splice(toDelete, 1);
    localStorage.removeItem('wishlist');
    localStorage.setItem('wishlist', JSON.stringify(this.showStorage));

  }

  isEmpty() {
    const wishlist = localStorage.getItem('wishlist');
    if (wishlist !== "") {
      return true;
    } else {
      return false;
    }
  }

  viewProduct(id: string){
    this.productService.temp = id;
  }

}
