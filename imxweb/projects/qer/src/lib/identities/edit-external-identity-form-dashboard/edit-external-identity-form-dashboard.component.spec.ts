import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExternalIdentityFormDashboardComponent } from './edit-external-identity-form-dashboard.component';

describe('EditExternalIdentityFormDashboardComponent', () => {
  let component: EditExternalIdentityFormDashboardComponent;
  let fixture: ComponentFixture<EditExternalIdentityFormDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExternalIdentityFormDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExternalIdentityFormDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
