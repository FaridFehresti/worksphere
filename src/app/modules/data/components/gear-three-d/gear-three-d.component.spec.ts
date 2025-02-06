import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearThreeDComponent } from './gear-three-d.component';

describe('GearThreeDComponent', () => {
  let component: GearThreeDComponent;
  let fixture: ComponentFixture<GearThreeDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GearThreeDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GearThreeDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
