import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSearchReportComponent } from './container-search-report.component';

describe('ContainerSearchReportComponent', () => {
  let component: ContainerSearchReportComponent;
  let fixture: ComponentFixture<ContainerSearchReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerSearchReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerSearchReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
