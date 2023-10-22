import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContainerBayViewComponent } from './import-container-bay-view.component';

describe('ImportContainerBayViewComponent', () => {
  let component: ImportContainerBayViewComponent;
  let fixture: ComponentFixture<ImportContainerBayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportContainerBayViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContainerBayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
