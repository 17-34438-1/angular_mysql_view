import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertPangaonContainerComponent } from './convert-pangaon-container.component';

describe('ConvertPangaonContainerComponent', () => {
  let component: ConvertPangaonContainerComponent;
  let fixture: ComponentFixture<ConvertPangaonContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertPangaonContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertPangaonContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
