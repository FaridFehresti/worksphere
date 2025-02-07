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
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core'; // ✅ Import MatNativeDateModule

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/interceptors/auth-interceptor';

import { DataTaskForm, DataTaskFormDialog } from './components/data-tasks/components/data-tasks-form/data-task-form/data-task-form.component';

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
  MatNativeDateModule, // ✅ Add this
  MatIconModule,
];

const COMPONENTS = [
  GearThreeDComponent,
  DataComponent,
  DataTasksComponent,
  DataTaskForm,
  DataTaskFormDialog,
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
    provideNativeDateAdapter(), // ✅ Keep this
  ],
})
export class DataModule { }
