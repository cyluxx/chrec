import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserInfoSidebarComponent } from './browser-info-sidebar.component';

describe('BrowserInfoSidebarComponent', () => {
  let component: BrowserInfoSidebarComponent;
  let fixture: ComponentFixture<BrowserInfoSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserInfoSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserInfoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
