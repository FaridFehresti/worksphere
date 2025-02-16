import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDRingComponent } from './three-d-ring.component';

describe('ThreeDRingComponent', () => {
  let component: ThreeDRingComponent;
  let fixture: ComponentFixture<ThreeDRingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeDRingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeDRingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
