import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableActionComponent } from './editable-action.component';

describe('EditableActionComponent', () => {
  let component: EditableActionComponent;
  let fixture: ComponentFixture<EditableActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
