import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeServiceService } from './time-service.service';
import { CommonModule } from '@angular/common';
import {  MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
type ITime = 'short' | 'medium' | 'long' | 'full'| 'shortDate' | 'mediumDate'| 'longDate' | 'fullDate' | 'shortTime' | 'mediumTime' | 'longTime' | 'fullTime'


@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatProgressBarModule,MatButtonModule],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent implements OnInit,OnDestroy{
  @Input() type:ITime = 'mediumTime'
  @Input() showTimeZone:boolean = false;
  value = signal(0);
  regex = /GMT([+-])(\d{2})(\d{2}) \(([^)]+)\)/;
  timeSub:Subscription | null = null;
  currentDate:Date | null = null
  currentHour:number | null = null;
  timeOffset:string | null = null;
  timeZone:string | null = null;
  currentMinute:number | null = null;
  progressBarValue = 0
  constructor( private timeService:TimeServiceService){

  }
  ngOnInit(): void {
    this.getTime()
  }
  getTime(){
    this.timeSub = this.timeService.getRealTimeData().subscribe((time)=>{
      this.currentDate = time
      this.currentHour = time.getHours()
      this.currentMinute = time.getMinutes()
      let match = this.currentDate?.toString().match(this.regex)
      if (match) {
        let offsetSign = match[1]; // "+" or "-" for offset
        let offsetHours = parseInt(match[2], 10);
        let offsetMinutes = parseInt(match[3], 10);
        this.timeZone = match[4]; 
        this.timeOffset = `${offsetSign}${offsetHours}:${offsetMinutes}`;
      }
      let ratio = 100/1440
      this.progressBarValue = Math.ceil((this.currentHour * 60 + this.currentMinute) * ratio);

    })
  }
  ngOnDestroy(): void {
    this.timeSub?.unsubscribe();
  }
}
