import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebdriverSettingsComponent } from './webdriver-settings.component';

describe('WebdriverSettingsComponent', () => {
  let component: WebdriverSettingsComponent;
  let fixture: ComponentFixture<WebdriverSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebdriverSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebdriverSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
