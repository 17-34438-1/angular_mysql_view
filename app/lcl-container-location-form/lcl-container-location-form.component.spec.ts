import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LclContainerLocationFormComponent } from './lcl-container-location-form.component';

describe('LclContainerLocationFormComponent', () => {
  let component: LclContainerLocationFormComponent;
  let fixture: ComponentFixture<LclContainerLocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LclContainerLocationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LclContainerLocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
