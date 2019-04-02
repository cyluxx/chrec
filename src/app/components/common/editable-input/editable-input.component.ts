import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent {

  @Input() type = 'text';
  @Input() value: string;
  @Output() valueEmitter = new EventEmitter<string>();
  alert = false;
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
    if (this.value) {
      this.valueEmitter.emit(this.value);
      this.edit = false;
      this.alert = false;
    } else {
      this.alert = true;
      setTimeout(() => this.alert = false, 5000);
    }
  }
}
