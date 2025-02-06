import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessetPasswordFormComponent } from './resset-password-form.component';

describe('RessetPasswordFormComponent', () => {
  let component: RessetPasswordFormComponent;
  let fixture: ComponentFixture<RessetPasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RessetPasswordFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RessetPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
