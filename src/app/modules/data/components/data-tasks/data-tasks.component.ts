import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { DataOperationService } from '../../data-operation.service';
import { Subscription } from 'rxjs';
import { ITaskCategory } from 'src/app/shared/interfaces/types';

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
  taskCategoriesSubscription:Subscription | null = null;
  tasksSubscription:Subscription | null = null;
  selecteCategoryId:number | null = 0;
  isLoading:boolean = false;
  constructor(private dataOp: DataOperationService) {
    
  }
  ngOnInit(): void {
   this.intialData()
  }
  async intialData(){
    this.isLoading = true
    await this.getListOfTaskCategories();
    await this.getListOfTaks(0);
    this.isLoading = false;
  }
  ngOnDestroy(): void {
    
      this.taskCategoriesSubscription?.unsubscribe()
    
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
  handleTabChange(event: any) {
    console.log(event.index)
    this.selecteCategoryId = event.index;
    this.getListOfTaks(event.index);
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

  listOfTasks: Array<Task> = [
    {
      name: 'Complete Project Proposal',
      completed: false,
      color: 'primary',
      id: 1,
      description: 'Draft and finalize the project proposal document.',
      tags: ['work', 'deadline'],
      subtasks: [
        {
          name: 'Research',
          completed: false,
          id: 2,
          description: 'Gather necessary information and data.',
          color: 'primary'
        },
        {
          name: 'Outline',
          completed: false,
          id: 3,
          description: 'Create a detailed outline of the proposal.',
          color: 'accent'
        },
        {
          name: 'Review',
          completed: false,
          id: 4,
          description: 'Review and revise the draft.',
          color: 'warn'
        },
      ],
    },
    {
      name: 'Complete Project Proposal',
      completed: false,
      color: 'primary',
      id: 5,
      description: 'Draft and finalize the project proposal document.',
      tags: ['work', 'deadline'],
      subtasks: [
        {
          name: 'Research',
          completed: false,
          id: 12,
          description: 'Gather necessary information and data.',
          color: 'primary'
        },
        {
          name: 'Outline',
          completed: false,
          id: 34,
          description: 'Create a detailed outline of the proposal.',
          color: 'accent'
        },
        {
          name: 'Review',
          completed: false,
          id: 65,
          description: 'Review and revise the draft.',
          color: 'warn'
        },
      ],
    },
  ];

  updateAllComplete(task: Task) {
    if (task && task.subtasks) {
      task.completed = task.subtasks.every(subtask => subtask.completed);
    }
  }

  someComplete(task: Task): boolean {
    if (task && task.subtasks) {
      return task.subtasks.some(subtask => subtask.completed) && !task.completed;
    }
    return false;
  }

  setAll(completed: boolean, task: Task) {
    if (task && task.subtasks) {
      task.subtasks.forEach(subtask => subtask.completed = completed);
      this.updateAllComplete(task);
    }
  }
  addTask() {
    this.dataOp.getTaskCategoryList().subscribe((res) => {
      console.log(res);
    })
  }
}
