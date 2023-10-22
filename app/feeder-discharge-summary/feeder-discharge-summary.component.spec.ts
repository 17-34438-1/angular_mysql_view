import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeederDischargeSummaryComponent } from './feeder-discharge-summary.component';

describe('FeederDischargeSummaryComponent', () => {
  let component: FeederDischargeSummaryComponent;
  let fixture: ComponentFixture<FeederDischargeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeederDischargeSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeederDischargeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
