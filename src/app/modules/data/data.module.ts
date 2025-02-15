import { NgModule } from '@angular/core';
import { DataRoutingModule } from './data.routes';
import { GearThreeDComponent } from './components/gear-three-d/gear-three-d.component';
import { DataComponent } from './data.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DataTasksComponent } from './components/data-tasks/data-tasks.component';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/interceptors/auth-interceptor';
import {MatTabsModule} from '@angular/material/tabs';

import { DataTaskForm, DataTaskFormDialog } from './components/data-tasks/components/data-tasks-form/data-task-form/data-task-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { DataTaskCategoryForm, DataTaskCategoryFormDialog } from './components/data-tasks/components/data-task-category-form/data-task-form-category.component';
import { EmptyListComponent } from 'src/app/shared/components/empty-list/empty-list/empty-list.component';

const MAT = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  FormsModule,
  MatDividerModule,
  MatChipsModule,
  MatDialogTitle,
  MatDialogContent,
  MatGridListModule,
  MatInputModule,
  MatDatepickerModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTabsModule,
  EmptyListComponent
];

const COMPONENTS = [
  GearThreeDComponent,
  DataComponent,
  DataTasksComponent,
  DataTaskForm,
  DataTaskFormDialog,
  DataTaskCategoryForm,
  DataTaskCategoryFormDialog,
  
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [DataRoutingModule, CdkDrag, CdkDropList, ReactiveFormsModule, ...MAT],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideNativeDateAdapter(), 
  ],
})
export class DataModule { }