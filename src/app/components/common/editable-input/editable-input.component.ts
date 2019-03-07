import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent {

  @Input() type = 'text';
  @Input() value: string;
  @Output() valueEmitter = new EventEmitter<string>();
  edit = false;
  mouseOver = false;

  constructor() { }

  onEdit() {
    this.edit = true;
  }

  onMouseOut() {
    this.mouseOver = false;
  }

  onMouseOver() {
    this.mouseOver = true;
  }

  onSubmit() {
    this.valueEmitter.emit(this.value);
    this.edit = false;
  }
}
