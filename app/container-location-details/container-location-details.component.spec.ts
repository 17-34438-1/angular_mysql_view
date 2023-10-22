import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerLocationDetailsComponent } from './container-location-details.component';

describe('ContainerLocationDetailsComponent', () => {
  let component: ContainerLocationDetailsComponent;
  let fixture: ComponentFixture<ContainerLocationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerLocationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerLocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
