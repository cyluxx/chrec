import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatorInfoComponent } from './locator-info.component';

describe('LocatorInfoComponent', () => {
  let component: LocatorInfoComponent;
  let fixture: ComponentFixture<LocatorInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatorInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
