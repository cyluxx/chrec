import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTestResultComponent } from './project-test-result.component';

describe('ProjectTestResultComponent', () => {
  let component: ProjectTestResultComponent;
  let fixture: ComponentFixture<ProjectTestResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTestResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
