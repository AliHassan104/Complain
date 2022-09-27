import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintimelineComponent } from './complaintimeline.component';

describe('ComplaintimelineComponent', () => {
  let component: ComplaintimelineComponent;
  let fixture: ComponentFixture<ComplaintimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
