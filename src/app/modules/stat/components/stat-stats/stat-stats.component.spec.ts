import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatStatsComponent } from './stat-stats.component';

describe('StatStatsComponent', () => {
  let component: StatStatsComponent;
  let fixture: ComponentFixture<StatStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
