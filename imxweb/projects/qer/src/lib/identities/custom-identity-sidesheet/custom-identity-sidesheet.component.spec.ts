import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomIdentitySidesheetComponent } from './custom-identity-sidesheet.component';

describe('CustomIdentitySidesheetComponent', () => {
  let component: CustomIdentitySidesheetComponent;
  let fixture: ComponentFixture<CustomIdentitySidesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomIdentitySidesheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomIdentitySidesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
