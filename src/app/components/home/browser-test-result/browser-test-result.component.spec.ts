import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserTestResultComponent } from './browser-test-result.component';

describe('BrowserTestResultComponent', () => {
  let component: BrowserTestResultComponent;
  let fixture: ComponentFixture<BrowserTestResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserTestResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
