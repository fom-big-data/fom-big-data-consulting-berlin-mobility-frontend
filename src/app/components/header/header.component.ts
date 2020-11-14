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
    var header_offset = $('.app-header').offset()
    var header_docked = false;

   $(window).scroll(function() {
     if(!header_docked && header_offset.top-window.scrollY <= 0){
       $('.app-header').addClass('docked')
       header_docked = true
     }else if(header_docked && header_offset.top-window.scrollY >= 0){
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
      a.href = "#"
      console.log();
      a.innerHTML = element.innerHTML
    })



     console.log(tableOfContents)

     return tableOfContents.innerHTML;
  }

}
