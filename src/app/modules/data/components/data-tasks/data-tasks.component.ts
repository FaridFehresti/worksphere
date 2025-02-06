import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

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
export class DataTasksComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  allComplete: boolean = false;
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

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
}
