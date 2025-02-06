import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTasksComponent } from './data-tasks.component';

describe('DataTasksComponent', () => {
  let component: DataTasksComponent;
  let fixture: ComponentFixture<DataTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
