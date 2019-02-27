import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableActionInfoComponent } from './editable-action-info.component';

describe('EditableActionInfoComponent', () => {
  let component: EditableActionInfoComponent;
  let fixture: ComponentFixture<EditableActionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableActionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableActionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
