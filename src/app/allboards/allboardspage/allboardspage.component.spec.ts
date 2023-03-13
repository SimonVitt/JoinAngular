import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllboardspageComponent } from './allboardspage.component';

describe('AllboardspageComponent', () => {
  let component: AllboardspageComponent;
  let fixture: ComponentFixture<AllboardspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllboardspageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllboardspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
