import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RerecordSidebarComponent } from './rerecord-sidebar.component';

describe('RerecordSidebarComponent', () => {
  let component: RerecordSidebarComponent;
  let fixture: ComponentFixture<RerecordSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RerecordSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RerecordSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
