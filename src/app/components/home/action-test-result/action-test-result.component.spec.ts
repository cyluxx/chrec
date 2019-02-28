import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTestResultComponent } from './action-test-result.component';

describe('ActionTestResultComponent', () => {
  let component: ActionTestResultComponent;
  let fixture: ComponentFixture<ActionTestResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionTestResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
