import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExternalComponent } from './edit-external.component';

describe('EditExternalComponent', () => {
  let component: EditExternalComponent;
  let fixture: ComponentFixture<EditExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExternalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
