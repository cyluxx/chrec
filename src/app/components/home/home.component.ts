import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clickedElements: String[];

  constructor() { 
    this.clickedElements = [];
  }

  ngOnInit() {
  }

  onClickedElement(selector: String){
    this.clickedElements.push(selector);
  }
}
