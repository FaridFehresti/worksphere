import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DataOperationService } from 'src/app/modules/data/data-operation.service';
import {  ITagData, ITaskCategory, ITaskFormData, IUserData } from 'src/app/shared/interfaces/types';
@Component({
  selector: 'app-tag-form',
  templateUrl: 'data-tag-form.component.html',
})
export class DataTagForm  {
  dialog = inject(MatDialog);
  
  @Input() listOfCategories: ITaskCategory[] = [];
  @Input() listOfTags:ITagData[] = []
  openDialog() {
    this.dialog.open(DataTagFormDialog, {
      data: {
        listOfCategories: this.listOfCategories,
        listOfTags:this.listOfTags
      },
    });
  }
}
@Component({
  selector: 'app-data-tag-dialog',
  templateUrl: 'data-tag-dialog.html',
  styleUrl: 'data-tag-form.component.scss'
  
})
export class DataTagFormDialog implements OnInit,OnDestroy {
  data = inject(MAT_DIALOG_DATA);
  createTag$:Subscription | null = null;
  isLoading:boolean = false;
  userData:IUserData = JSON.parse(localStorage.getItem('user') || '');
  colors:{name:string, value:string, class:string}[] = [
    {name:'Primary',value:'primary',class:'bg-primary'},
    {name:'Secondary',value:'secondary',class:'bg-secondary'},
    {name:'Tertiary',value:'tertiary',class:'bg-tertiary'},
    {name:'Red',value:'error',class:'bg-error'},
    {name:'Green',value:'success',class:'bg-success'},
    {name:'Yellow',value:'warning',class:'bg-warning'},
  ]
  constructor(private dataOp:DataOperationService,private fb: FormBuilder,private dialog:MatDialog) { }
  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    this.createTag$?.unsubscribe()
  }
  tagForm = this.fb.group({
    title: new FormControl<string>('', [Validators.required]), 
    color: new FormControl<string | null>(null),
  });
  

  validateForm(): boolean {
    if (this.tagForm.valid) {
      return true;
    }
    return false;
  }
  onSubmit(): void {
    console.log(this.tagForm.value);
    if(this.validateForm()){
      this.isLoading = true
      this.createTag$ = this.dataOp.createTag(this.tagForm.value).subscribe({
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
      this.tagForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialog.closeAll();
  }
 
}
