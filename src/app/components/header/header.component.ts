import { Component, OnInit } from '@angular/core';
import $ from "jquery";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
}

}
