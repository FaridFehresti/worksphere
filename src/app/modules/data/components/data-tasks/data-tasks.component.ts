import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { DataOperationService } from '../../data-operation.service';
import { Subscription } from 'rxjs';
import { ITagData, ITaskCategory, ITaskData } from 'src/app/shared/interfaces/types';
import { MatTabChangeEvent } from '@angular/material/tabs';

export interface Task {
  name: string;
  completed: boolean;
  description: string;
  tags?: Array<string>;
  color: ThemePalette;
  subtasks?: Task[];
  id: number;
}

@Component({
  selector: 'app-data-tasks',
  templateUrl: './data-tasks.component.html',
  styleUrl: './data-tasks.component.scss',
})
export class DataTasksComponent implements OnInit, OnDestroy{
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  allComplete: boolean = false;
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  listOfTaskCategories:ITaskCategory[] = []
  listOfTags:ITagData[] = []
  taskCategoriesSubscription:Subscription | null = null;
  tasksSubscription:Subscription | null = null;
  selecteCategoryId:number | null = 0;
  isLoading:boolean = false;
  listOfTasks:ITaskData[] = []
  constructor(private dataOp: DataOperationService) {
    
  }
  ngOnInit(): void {
   this.intialData()
  }
  async intialData(){
    this.isLoading = true
    await this.getListOfTaskCategories();
    await this.getListOfTaks(0);
    await this.getListOfTags();
    this.isLoading = false;
  }
  ngOnDestroy(): void {
    
      this.taskCategoriesSubscription?.unsubscribe()
    
  }
  getListOfTags(){
    this.dataOp.getTagList().subscribe({next:(res) => {
      console.log('fgetched:',res)  
      this.listOfTags =res
    }})
  }
  getListOfTaskCategories(){
    this.taskCategoriesSubscription = this.dataOp.getTaskCategoryList().subscribe({next:(res) => {
      console.log('got:',res);
      this.listOfTaskCategories = res;
    },error:(err) => {
      console.log(err)
    },complete:() => {
      
    }})
  }
  getListOfTaks(categoryId:number){
    let selectedCategoryId:number = categoryId
    if(selectedCategoryId  > 0){
      this.tasksSubscription = this.dataOp.getTasksList(selectedCategoryId).subscribe({next:(res) => {
        console.log(res)  
        this.listOfTasks =res
      }})
    }else{
      this.tasksSubscription = this.dataOp.getTasksList().subscribe({next:(res) => {
        console.log(res)  
        this.listOfTasks =res
      }})
    }
    
  }
  handleTabChange(event: MatTabChangeEvent) {
    if (event.index === 0) {
      // "All" tab selected
      this.selecteCategoryId = null;
        this.getListOfTaks(0);
      
    } else {
      // Subtract 1 because the first tab is "All"
      const selectedCategory = this.listOfTaskCategories[event.index - 1];
      if (selectedCategory) {
        this.selecteCategoryId = selectedCategory.id;
        this.getListOfTaks(this.selecteCategoryId);
      }
    }
    console.log('Selected Category ID:', this.selecteCategoryId);
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  

  updateAllComplete(task: ITaskData) {
    if (task && task.subtasks) {
      task.isComplete = task.subtasks.every(subtask => subtask.isComplete);
    }
  }

  someComplete(task: ITaskData): boolean {
    if (task && task.subtasks) {
      return task.subtasks.some(subtask => subtask.isComplete) && !task.isComplete;
    }
    return false;
  }

  setAll(completed: boolean, task: ITaskData) {
    if (task && task.subtasks) {
      task.subtasks.forEach(subtask => subtask.isComplete = completed);
      this.updateAllComplete(task);
    }
  }
  addTask() {
    this.dataOp.getTaskCategoryList().subscribe((res) => {
      console.log(res);
    })
  }
  
}
