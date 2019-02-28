import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserSidebarComponent } from './browser-sidebar.component';

describe('BrowserSidebarComponent', () => {
  let component: BrowserSidebarComponent;
  let fixture: ComponentFixture<BrowserSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
