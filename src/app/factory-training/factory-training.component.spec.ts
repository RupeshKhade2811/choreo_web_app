import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryTrainingComponent } from './factory-training.component';

describe('FactoryTrainingComponent', () => {
  let component: FactoryTrainingComponent;
  let fixture: ComponentFixture<FactoryTrainingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FactoryTrainingComponent]
    });
    fixture = TestBed.createComponent(FactoryTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
