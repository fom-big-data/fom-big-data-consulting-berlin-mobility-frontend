import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  tableOfContents: any = null;


  constructor() { }

  ngOnInit(): void {
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



       return tableOfContents.innerHTML;
    }

}
