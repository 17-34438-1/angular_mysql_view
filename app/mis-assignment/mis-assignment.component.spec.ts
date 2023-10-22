import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisAssignmentComponent } from './mis-assignment.component';

describe('MisAssignmentComponent', () => {
  let component: MisAssignmentComponent;
  let fixture: ComponentFixture<MisAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
