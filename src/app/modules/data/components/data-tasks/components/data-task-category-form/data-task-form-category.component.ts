import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DataOperationService } from 'src/app/modules/data/data-operation.service';
@Component({
  selector: 'app-task-category-form',
  templateUrl: 'data-task-form-category.component.html',
})
export class DataTaskCategoryForm {
  dialog = inject(MatDialog);
 
 
  openDialog() {
    this.dialog.open(DataTaskCategoryFormDialog, {
      data: {
        animal: 'panda',
      },
    });
  }
}
@Component({
  selector: 'app-data-task-dialog',
  templateUrl: 'data-task-category-dialog.html',
  styleUrl: 'data-task-form-category.component.scss'
  
})
export class DataTaskCategoryFormDialog {
  data = inject(MAT_DIALOG_DATA);
  isLoading:boolean = false;
  constructor(private fb: FormBuilder, private dataOp:DataOperationService, private dialog:MatDialog) { }
  taskCategoryForm = this.fb.group({
    title:['', Validators.required],
  });
  
  
  handleCancel(): void {
    console.log('got here!')
    this.dialog.closeAll();
  }
  onSubmit(): void {
    if(this.validateForm()){
      this.isLoading = true
      this.dataOp.createTaskCategory(this.taskCategoryForm.value).subscribe({next:(res) => {
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
    
      
    }
  }
  validateForm():boolean{
    if(this.taskCategoryForm.valid){
      return true
    }
    return false
  }
 
}
