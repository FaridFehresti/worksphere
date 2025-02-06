import { NgModule } from '@angular/core';
import { DataRoutingModule } from './data.routes';
import { GearThreeDComponent } from './components/gear-three-d/gear-three-d.component';
import { DataComponent } from './data.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DataTasksComponent } from './components/data-tasks/data-tasks.component';
import {
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';

const MAT = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  FormsModule,
  MatDividerModule,
  MatChipsModule,


  
];
const PAGES = [
    
];
const COMPONENTS = [
  GearThreeDComponent,
  DataComponent,
  DataTasksComponent,
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [DataRoutingModule,
    CdkDrag,
    CdkDropList,
    ...MAT,
  ],
  providers:[]
})
export class DataModule { }
