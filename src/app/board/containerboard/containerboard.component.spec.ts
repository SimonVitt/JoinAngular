import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerboardComponent } from './containerboard.component';

describe('ContainerboardComponent', () => {
  let component: ContainerboardComponent;
  let fixture: ComponentFixture<ContainerboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
