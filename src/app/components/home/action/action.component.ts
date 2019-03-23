import { Component, OnInit, Input } from '@angular/core';
import { Action } from 'chrec-core/lib/model/action/action';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  @Input() action: Action;

  constructor() { }

  ngOnInit() {
  }

}
