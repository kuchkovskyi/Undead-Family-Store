import { Component, OnInit } from '@angular/core';
import { ProductItem } from '../../Models/product-item.model';
import { ProductManagerService } from '../../Services/product-manager.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { ApiResult } from 'src/app/Models/result.model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  listOfData: ProductItem[] = [];
  searchProduct: string;
  searchResult: ProductItem[] = [];


  constructor(private productService: ProductManagerService,
    private notifier: NotifierService,
    private router: Router) { }


  SearchProduct() {
    this.searchResult = this.listOfData.filter(
      t => t.name.toLowerCase().includes(this.searchProduct.toLowerCase())
    );
  }

  RemoveProduct(id: string) {
    this.productService.removeProduct(id).subscribe(
      (data: ApiResult) => {
        if (data.status === 200) {
          this.notifier.notify('success', 'Product removed :)');

          console.log(data);

        } else {
          for (let i = 0; i < data.errors; i++) {
            this.notifier.notify('error', data.errors[i]);

          }
        }
      }
    );
  }


  ngOnInit() {
    this.productService.getAllProducts().subscribe((AllProducts: ProductItem[]) => {
      this.listOfData = AllProducts;
      this.searchResult = AllProducts;
      console.log(this.listOfData);
    })


    /**/
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
}


