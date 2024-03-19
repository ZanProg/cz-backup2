import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewIdentity3Component } from './create-new-identity3.component';

describe('CreateNewIdentity3Component', () => {
  let component: CreateNewIdentity3Component;
  let fixture: ComponentFixture<CreateNewIdentity3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewIdentity3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewIdentity3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
