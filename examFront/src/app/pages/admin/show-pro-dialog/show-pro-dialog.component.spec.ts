import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProDialogComponent } from './show-pro-dialog.component';

describe('ShowProDialogComponent', () => {
  let component: ShowProDialogComponent;
  let fixture: ComponentFixture<ShowProDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
