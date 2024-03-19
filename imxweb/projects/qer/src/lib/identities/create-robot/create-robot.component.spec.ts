import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRobotComponent } from './create-robot.component';

describe('CreateRobotComponent', () => {
  let component: CreateRobotComponent;
  let fixture: ComponentFixture<CreateRobotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRobotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
