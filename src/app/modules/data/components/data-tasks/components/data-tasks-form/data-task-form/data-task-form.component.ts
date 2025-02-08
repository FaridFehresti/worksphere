import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-task-form',
  templateUrl: 'data-task-form.component.html',
})
export class DataTaskForm  {
  dialog = inject(MatDialog);
 
  
  openDialog() {
    this.dialog.open(DataTaskFormDialog, {
      data: {
        animal: 'panda',
      },
    });
  }
}
@Component({
  selector: 'app-data-task-dialog',
  templateUrl: 'data-task-dialog.html',
  styleUrl: 'data-task-form.component.scss'
  
})
export class DataTaskFormDialog {
  data = inject(MAT_DIALOG_DATA);
  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  constructor(private fb: FormBuilder) { }
  taskForm = this.fb.group({
    title:['', Validators.required],
    hardness:['', [Validators.required]],
    priority:['', Validators.required],
    deadline:[''],
    last_name:['', Validators.required],
    birthdate:[''],
    gender:['male', Validators.required],
    category:['', Validators.required]
  });
  onSubmit(): void {
    console.log(this.taskForm.value);
  }
  onDateChange(event:any){
    this.taskForm.controls['deadline'].patchValue(event.value)
  }
}
