import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlElementActionInfoComponent } from './html-element-action-info.component';

describe('HtmlElementActionInfoComponent', () => {
  let component: HtmlElementActionInfoComponent;
  let fixture: ComponentFixture<HtmlElementActionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlElementActionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlElementActionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
