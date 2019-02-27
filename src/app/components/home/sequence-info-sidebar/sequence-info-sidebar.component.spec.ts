import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceInfoSidebarComponent } from './sequence-info-sidebar.component';

describe('SequenceInfoSidebarComponent', () => {
  let component: SequenceInfoSidebarComponent;
  let fixture: ComponentFixture<SequenceInfoSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceInfoSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceInfoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
