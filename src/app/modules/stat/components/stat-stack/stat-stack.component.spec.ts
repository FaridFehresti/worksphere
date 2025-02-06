import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatStackComponent } from './stat-stack.component';

describe('StatStackComponent', () => {
  let component: StatStackComponent;
  let fixture: ComponentFixture<StatStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatStackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
