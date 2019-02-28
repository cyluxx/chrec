import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceSidebarComponent } from './sequence-sidebar.component';

describe('SequenceSidebarComponent', () => {
  let component: SequenceSidebarComponent;
  let fixture: ComponentFixture<SequenceSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
