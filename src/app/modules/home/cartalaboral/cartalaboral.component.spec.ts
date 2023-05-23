import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartalaboralComponent } from './cartalaboral.component';

describe('CartalaboralComponent', () => {
  let component: CartalaboralComponent;
  let fixture: ComponentFixture<CartalaboralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartalaboralComponent]
    });
    fixture = TestBed.createComponent(CartalaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
