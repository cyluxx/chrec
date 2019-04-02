import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceTestResultComponent } from './sequence-test-result.component';

describe('SequenceTestResultComponent', () => {
  let component: SequenceTestResultComponent;
  let fixture: ComponentFixture<SequenceTestResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceTestResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
