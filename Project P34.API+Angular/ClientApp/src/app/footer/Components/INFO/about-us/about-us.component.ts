import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit():void {

    function ChoosePage(evt, choosePage) {
      var i, subpage, chooseLink;

      subpage = document.getElementsByClassName("about-us-subpage");
      for (i = 0; i < subpage.length; i++) {
        subpage[i].style.display = "none";
      }

      chooseLink = document.getElementsByClassName("choose-link");
      for (i = 0; i < chooseLink.length; i++) {
        chooseLink[i].className = chooseLink[i].className.replace(" active", "");
      }

      document.getElementById(choosePage).style.display = "block";
      evt.currentTarget.className += " active";
    }
    document.getElementById("defaultOpenPage").click();




  }

}
