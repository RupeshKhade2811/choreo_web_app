import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableCardComponent } from './reusable-card.component';

describe('ReusableCardComponent', () => {
  let component: ReusableCardComponent;
  let fixture: ComponentFixture<ReusableCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReusableCardComponent]
    });
    fixture = TestBed.createComponent(ReusableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
