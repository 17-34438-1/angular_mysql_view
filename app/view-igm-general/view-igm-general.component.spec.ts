import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIgmGeneralComponent } from './view-igm-general.component';

describe('ViewIgmGeneralComponent', () => {
  let component: ViewIgmGeneralComponent;
  let fixture: ComponentFixture<ViewIgmGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIgmGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIgmGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
