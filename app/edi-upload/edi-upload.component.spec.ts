import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdiUploadComponent } from './edi-upload.component';

describe('EdiUploadComponent', () => {
  let component: EdiUploadComponent;
  let fixture: ComponentFixture<EdiUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdiUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdiUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
