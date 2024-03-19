import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewIdentity2Component } from './create-new-identity2.component';

describe('CreateNewIdentity2Component', () => {
  let component: CreateNewIdentity2Component;
  let fixture: ComponentFixture<CreateNewIdentity2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewIdentity2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewIdentity2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
