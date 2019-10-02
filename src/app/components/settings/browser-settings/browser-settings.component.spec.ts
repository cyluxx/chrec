import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserSettingsComponent } from './browser-settings.component';

describe('BrowserSettingsComponent', () => {
  let component: BrowserSettingsComponent;
  let fixture: ComponentFixture<BrowserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
