import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVesselForExportContainersComponent } from './update-vessel-for-export-containers.component';

describe('UpdateVesselForExportContainersComponent', () => {
  let component: UpdateVesselForExportContainersComponent;
  let fixture: ComponentFixture<UpdateVesselForExportContainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVesselForExportContainersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVesselForExportContainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
