import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddedSuccessPopupComponent } from './task-added-success-popup.component';

describe('TaskAddedSuccessPopupComponent', () => {
  let component: TaskAddedSuccessPopupComponent;
  let fixture: ComponentFixture<TaskAddedSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAddedSuccessPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAddedSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
