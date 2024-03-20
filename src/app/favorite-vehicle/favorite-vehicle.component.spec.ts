import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteVehicleComponent } from './favorite-vehicle.component';

describe('FavoriteVehicleComponent', () => {
  let component: FavoriteVehicleComponent;
  let fixture: ComponentFixture<FavoriteVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteVehicleComponent]
    });
    fixture = TestBed.createComponent(FavoriteVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
