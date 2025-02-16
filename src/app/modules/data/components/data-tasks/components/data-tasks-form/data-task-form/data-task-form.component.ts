import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DataOperationService } from 'src/app/modules/data/data-operation.service';
import {  ITaskCategory, ITaskFormData, IUserData } from 'src/app/shared/interfaces/types';
@Component({
  selector: 'app-task-form',
  templateUrl: 'data-task-form.component.html',
})
export class DataTaskForm  {
  dialog = inject(MatDialog);
  @Input() listOfCategories: ITaskCategory[] = [];
  
  openDialog() {
    this.dialog.open(DataTaskFormDialog, {
      data: {
        listOfCategories: this.listOfCategories,
      },
    });
  }
}
@Component({
  selector: 'app-data-task-dialog',
  templateUrl: 'data-task-dialog.html',
  styleUrl: 'data-task-form.component.scss'
  
})
export class DataTaskFormDialog implements OnInit,OnDestroy {
  data = inject(MAT_DIALOG_DATA);
  createTask$:Subscription | null = null;
  isLoading:boolean = false;
  userData:IUserData = JSON.parse(localStorage.getItem('user') || '');
  constructor(private dataOp:DataOperationService,private fb: FormBuilder,private dialog:MatDialog) { }
  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    this.createTask$?.unsubscribe()
  }
  taskForm = this.fb.group({
    title: new FormControl<string>('', [Validators.required]), 
    hardness: new FormControl<number | null>(null),
    priority: new FormControl<number | null>(null),
    deadline: new FormControl<string | null>(null),
    description: new FormControl<string | null>(null),
    taskCategoryId: new FormControl<number | null>(null),
    userId: new FormControl<number | null>(this.userData.id || null),
    isComplete: new FormControl<boolean>(false),
    createdBy: new FormControl<number>(this.userData.id),
  });
  

  validateForm(): boolean {
    if (this.taskForm.valid) {
      return true;
    }
    return false;
  }
  onSubmit(): void {
    if(this.validateForm()){
      this.isLoading = true
      this.createTask$ = this.dataOp.createTask(this.taskForm.value).subscribe({
          next:(res) => {
            console.log(res);
            this.dialog.closeAll();
            this.isLoading = false;
          },error:(err) => {
            console.log(err);
            this.isLoading = false;
          },complete:() => {
            this.isLoading = false;
          }
      })
    }else{
      this.taskForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialog.closeAll();
  }
  onDateChange(event:any){
    this.taskForm.controls['deadline'].patchValue(event.value)
  }
}
