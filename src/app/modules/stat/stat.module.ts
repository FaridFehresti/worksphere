import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatComponent } from './stat.component';
import { StatRoutingModule } from './stat.routes';
import { ClockComponent } from 'src/app/shared/components/clock/clock.component';
import { ThreeDModelComponent} from './components/three-d-model/three-d-model.component'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { StatOverviewComponent } from './components/stat-overview/stat-overview.component';
import { StatStatsComponent } from './components/stat-stats/stat-stats.component';
import { StatConditionComponent } from './components/stat-condition/stat-condition.component';
import { StatCalendarComponent } from './components/stat-calendar/stat-calendar.component';
import { StatStackComponent } from './components/stat-stack/stat-stack.component';
import { HolographicRingComponent } from 'src/app/shared/components/3d-model-ring/three-d-ring/three-d-ring.component';

const COMPONENTS = [
    ThreeDModelComponent,
    StatComponent,
    StatOverviewComponent,
    StatStatsComponent,
    StatConditionComponent,
    StatCalendarComponent,
    StatStackComponent
]
const MAT = [
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
]
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...MAT,
    CommonModule,
    StatRoutingModule,
    ClockComponent,
    HolographicRingComponent
  ],
})
export class StatModule {}
