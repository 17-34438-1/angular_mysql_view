import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraiseReSlotLocationComponent } from './appraise-re-slot-location.component';

describe('AppraiseReSlotLocationComponent', () => {
  let component: AppraiseReSlotLocationComponent;
  let fixture: ComponentFixture<AppraiseReSlotLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppraiseReSlotLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraiseReSlotLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
