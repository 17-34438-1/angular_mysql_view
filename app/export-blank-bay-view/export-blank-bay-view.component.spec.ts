import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBlankBayViewComponent } from './export-blank-bay-view.component';

describe('ExportBlankBayViewComponent', () => {
  let component: ExportBlankBayViewComponent;
  let fixture: ComponentFixture<ExportBlankBayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportBlankBayViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportBlankBayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
