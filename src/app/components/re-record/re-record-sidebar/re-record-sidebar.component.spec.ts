import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReRecordSidebarComponent } from './re-record-sidebar.component';

describe('ReRecordSidebarComponent', () => {
  let component: ReRecordSidebarComponent;
  let fixture: ComponentFixture<ReRecordSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReRecordSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReRecordSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
