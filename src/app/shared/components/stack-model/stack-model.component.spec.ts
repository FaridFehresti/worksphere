import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackModelComponent } from './stack-model.component';

describe('StackModelComponent', () => {
  let component: StackModelComponent;
  let fixture: ComponentFixture<StackModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
