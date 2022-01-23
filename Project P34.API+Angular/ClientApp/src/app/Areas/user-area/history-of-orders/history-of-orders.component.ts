import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/home/product/product-view/service/product.service';
import { NotifierService } from 'angular-notifier';
import { ViewedProductModel } from 'src/app/Models/viewedProduct.model';
import { ProductItem } from 'src/app/home/product/product-view/model/product-item.model';

@Component({
  selector: 'app-history-of-orders',
  templateUrl: './history-of-orders.component.html',
  styleUrls: ['./history-of-orders.component.css']
})
export class HistoryOfOrdersComponent implements OnInit {


 


  constructor() {

     }

  ngOnInit():void {

    

    
    //DON'T TOUCH!!!
    let coll = document.getElementsByClassName('btn-collapse');
    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener('click', function() {
        this.classList.toggle('active');
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }

  }

}
