import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycomplainComponent } from './mycomplain.component';

describe('MycomplainComponent', () => {
  let component: MycomplainComponent;
  let fixture: ComponentFixture<MycomplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycomplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycomplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
