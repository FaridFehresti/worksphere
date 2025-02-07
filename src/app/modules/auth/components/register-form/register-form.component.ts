import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthOperationService } from '../../services/auth-operation.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  registerSub:Subscription | null = null;
  hide:boolean =true
  validating:boolean=false;
  isPasswordValid:boolean =false;
  passwordPattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  registerForm = this.fb.group({
    email:['', Validators.required],
    password:['', [Validators.required,Validators.pattern(this.passwordPattern)]],
    user_name:['', Validators.required],
    first_name:['', Validators.required],
    last_name:['', Validators.required],
    birthdate:[''],
    gender:['male', Validators.required]
  });
  showSpsinner = false;
  constructor(private spinner: NgxSpinnerService,private authOp:AuthOperationService, private fb:FormBuilder, private router:Router) {


  }
  ngOnInit(): void {
    
  }
  

  onSubmit(): void {
    
    if (this.registerForm.valid) {
      this.showSpsinner = true;
      this.spinner.show();
      let data = {
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
        user_name: this.registerForm.value.user_name!,
        first_name: this.registerForm.value.first_name!,
        last_name: this.registerForm.value.last_name!,
        birthdate: this.registerForm.value.birthdate!,
        gender:this.registerForm.value.gender!
      }
      this.registerSub = this.authOp.RegisterUser(data).subscribe(res => {
        if(res.id){
          this.showSpsinner = false;
          this.spinner.hide();

          this.router.navigate(['/']);
        }
      })
    }
  }

  updateErrorMessage(controlName:string):void{
    if(this.registerForm.get(controlName)?.hasError('required')){
      this.registerForm.get(controlName)?.markAsDirty();
      this.registerForm.get(controlName)?.updateValueAndValidity();
    }
  }
  onDateChange(event:any){
    this.registerForm.controls['birthdate'].patchValue(event.value)
  }
  onShowPasswordClick(event: MouseEvent) {
    
    this.hide = !this.hide;
  }
  ngOnDestroy(): void {
    this.registerSub?.unsubscribe()
  }
}
