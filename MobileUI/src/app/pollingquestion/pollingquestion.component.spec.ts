import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingquestionComponent } from './pollingquestion.component';

describe('PollingquestionComponent', () => {
  let component: PollingquestionComponent;
  let fixture: ComponentFixture<PollingquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollingquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollingquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
