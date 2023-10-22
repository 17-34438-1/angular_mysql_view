import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerLocationFormComponent } from './container-location-form.component';

describe('ContainerLocationFormComponent', () => {
  let component: ContainerLocationFormComponent;
  let fixture: ComponentFixture<ContainerLocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerLocationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerLocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
