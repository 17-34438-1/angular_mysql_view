import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportContainerBayViewComponent } from './export-container-bay-view.component';

describe('ExportContainerBayViewComponent', () => {
  let component: ExportContainerBayViewComponent;
  let fixture: ComponentFixture<ExportContainerBayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportContainerBayViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportContainerBayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
