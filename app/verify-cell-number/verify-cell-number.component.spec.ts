import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCellNumberComponent } from './verify-cell-number.component';

describe('VerifyCellNumberComponent', () => {
  let component: VerifyCellNumberComponent;
  let fixture: ComponentFixture<VerifyCellNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyCellNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCellNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
