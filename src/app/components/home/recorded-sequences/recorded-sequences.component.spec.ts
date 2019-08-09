import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordedSequencesComponent } from './recorded-sequences.component';

describe('RecordedSequencesComponent', () => {
  let component: RecordedSequencesComponent;
  let fixture: ComponentFixture<RecordedSequencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordedSequencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordedSequencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
