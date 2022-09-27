import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatertimingComponent } from './watertiming.component';

describe('WatertimingComponent', () => {
  let component: WatertimingComponent;
  let fixture: ComponentFixture<WatertimingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatertimingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatertimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
