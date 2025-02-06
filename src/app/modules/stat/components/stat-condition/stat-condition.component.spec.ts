import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatConditionComponent } from './stat-condition.component';

describe('StatConditionComponent', () => {
  let component: StatConditionComponent;
  let fixture: ComponentFixture<StatConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatConditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
