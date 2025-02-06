import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, interval, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeServiceService {

  private currentDate: Date = new Date(); // Initialize with current date
  private timeSubject = new BehaviorSubject<Date>(this.currentDate);

  constructor() {
    this.updateTime();
  }

  getRealTimeData(): Observable<Date> {
    return this.timeSubject.asObservable().pipe(
      distinctUntilChanged(),
      shareReplay(1)
    );
  }
  private updateTime() {
    this.currentDate = new Date();
    this.timeSubject.next(this.currentDate);
    setTimeout(() => {
      this.updateTime();
    }, 1000);
  }
}
