import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalPageComponent } from './appraisal-page.component';

describe('AppraisalPageComponent', () => {
  let component: AppraisalPageComponent;
  let fixture: ComponentFixture<AppraisalPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppraisalPageComponent]
    });
    fixture = TestBed.createComponent(AppraisalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
