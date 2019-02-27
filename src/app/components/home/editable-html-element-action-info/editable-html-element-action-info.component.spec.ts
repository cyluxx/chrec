import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableHtmlElementActionInfoComponent } from './editable-html-element-action-info.component';

describe('EditableHtmlElementActionInfoComponent', () => {
  let component: EditableHtmlElementActionInfoComponent;
  let fixture: ComponentFixture<EditableHtmlElementActionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableHtmlElementActionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableHtmlElementActionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
