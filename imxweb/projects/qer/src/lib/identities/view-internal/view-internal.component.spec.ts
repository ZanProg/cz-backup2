import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInternalComponent } from './view-internal.component';

describe('ViewInternalComponent', () => {
  let component: ViewInternalComponent;
  let fixture: ComponentFixture<ViewInternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInternalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
