import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReRecordComponent } from './re-record.component';

describe('ReRecordComponent', () => {
  let component: ReRecordComponent;
  let fixture: ComponentFixture<ReRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
