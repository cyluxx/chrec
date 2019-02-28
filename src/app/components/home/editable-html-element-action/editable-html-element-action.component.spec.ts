import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableHtmlElementActionComponent } from './editable-html-element-action.component';

describe('EditableHtmlElementActionComponent', () => {
  let component: EditableHtmlElementActionComponent;
  let fixture: ComponentFixture<EditableHtmlElementActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableHtmlElementActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableHtmlElementActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
