import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Identities3Component } from './identities3.component';

describe('Identities3Component', () => {
  let component: Identities3Component;
  let fixture: ComponentFixture<Identities3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Identities3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Identities3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
