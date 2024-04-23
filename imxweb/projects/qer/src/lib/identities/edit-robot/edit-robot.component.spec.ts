import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRobotComponent } from './edit-robot.component';

describe('EditRobotComponent', () => {
  let component: EditRobotComponent;
  let fixture: ComponentFixture<EditRobotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRobotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
