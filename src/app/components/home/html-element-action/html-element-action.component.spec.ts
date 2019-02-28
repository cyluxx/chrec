import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlElementActionComponent } from './html-element-action.component';

describe('HtmlElementActionComponent', () => {
  let component: HtmlElementActionComponent;
  let fixture: ComponentFixture<HtmlElementActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlElementActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlElementActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
