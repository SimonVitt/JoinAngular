import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddboarddialogComponent } from './addboarddialog.component';

describe('AddboarddialogComponent', () => {
  let component: AddboarddialogComponent;
  let fixture: ComponentFixture<AddboarddialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddboarddialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddboarddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
