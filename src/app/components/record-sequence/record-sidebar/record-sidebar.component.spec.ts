import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSidebarComponent } from './record-sidebar.component';

describe('RecordSidebarComponent', () => {
  let component: RecordSidebarComponent;
  let fixture: ComponentFixture<RecordSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
