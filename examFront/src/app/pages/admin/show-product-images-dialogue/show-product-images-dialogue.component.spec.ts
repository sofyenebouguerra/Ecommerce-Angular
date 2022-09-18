import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductImagesDialogueComponent } from './show-product-images-dialogue.component';

describe('ShowProductImagesDialogueComponent', () => {
  let component: ShowProductImagesDialogueComponent;
  let fixture: ComponentFixture<ShowProductImagesDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProductImagesDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProductImagesDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
