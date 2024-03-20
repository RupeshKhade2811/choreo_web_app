import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNewAppraisalComponent } from './create-new-appraisal.component';

describe('CreateNewAppraisalComponent', () => {
  let component: CreateNewAppraisalComponent;
  let fixture: ComponentFixture<CreateNewAppraisalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewAppraisalComponent]
    });
    fixture = TestBed.createComponent(CreateNewAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
