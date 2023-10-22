import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgmContainerListComponent } from './igm-container-list.component';

describe('IgmContainerListComponent', () => {
  let component: IgmContainerListComponent;
  let fixture: ComponentFixture<IgmContainerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgmContainerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgmContainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
