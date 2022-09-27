import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementdetailedComponent } from './achievementdetailed.component';

describe('AchievementdetailedComponent', () => {
  let component: AchievementdetailedComponent;
  let fixture: ComponentFixture<AchievementdetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementdetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementdetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
