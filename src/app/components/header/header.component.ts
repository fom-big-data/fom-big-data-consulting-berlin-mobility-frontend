import { Component, OnInit } from '@angular/core';
import $ from "jquery";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  tableOfContents: any = null;


  constructor() { }

  ngOnInit() {
    var header_docked = false;

   $(window).scroll(function() {
     //console.log(header_offset);
      // console.log(window.scrollY);
      // return;

     if(!header_docked && window.innerHeight-window.scrollY <= 0){
       $('.app-header').addClass('docked')
       header_docked = true
     }else if(header_docked && window.innerHeight-window.scrollY >= 0){
       $('.app-header').removeClass('docked')
       header_docked = false
     }

   });

   this.tableOfContents = this.getToc(document)
}

private getToc(content: any) {
  var tableOfContents = document.createElement('ul')

    var headings = document.querySelectorAll("h2")
    headings.forEach(element => {

      var li = tableOfContents.appendChild(document.createElement('li'))
      var a = li.appendChild(document.createElement('a'))
      a.href = "#"+element.id
      console.log();
      a.innerHTML = element.innerHTML
    })



     console.log(tableOfContents)

     return tableOfContents.innerHTML;
  }

}
