import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Identities2Component } from './identities2.component';

describe('Identities2Component', () => {
  let component: Identities2Component;
  let fixture: ComponentFixture<Identities2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Identities2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Identities2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
