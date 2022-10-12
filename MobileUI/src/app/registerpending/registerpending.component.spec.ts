import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterpendingComponent } from './registerpending.component';

describe('RegisterpendingComponent', () => {
  let component: RegisterpendingComponent;
  let fixture: ComponentFixture<RegisterpendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterpendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
