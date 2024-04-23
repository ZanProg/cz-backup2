import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRobotSidesheetComponent } from './custom-robot-sidesheet.component';

describe('CustomRobotSidesheetComponent', () => {
  let component: CustomRobotSidesheetComponent;
  let fixture: ComponentFixture<CustomRobotSidesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomRobotSidesheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomRobotSidesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
