import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCellNumberForTwoStepVerificationComponent } from './verify-cell-number-for-two-step-verification.component';

describe('VerifyCellNumberForTwoStepVerificationComponent', () => {
  let component: VerifyCellNumberForTwoStepVerificationComponent;
  let fixture: ComponentFixture<VerifyCellNumberForTwoStepVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyCellNumberForTwoStepVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCellNumberForTwoStepVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
