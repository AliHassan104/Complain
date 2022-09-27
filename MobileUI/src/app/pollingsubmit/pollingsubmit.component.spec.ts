import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingsubmitComponent } from './pollingsubmit.component';

describe('PollingsubmitComponent', () => {
  let component: PollingsubmitComponent;
  let fixture: ComponentFixture<PollingsubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollingsubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollingsubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
