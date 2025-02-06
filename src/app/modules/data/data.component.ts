import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent implements OnInit, OnDestroy{
  routingParam:string = ''
  routeSub:Subscription | null = null
  constructor(private route:ActivatedRoute) {

  }
  ngOnInit(): void {
    this.getRoutingParam()
  }
  getRoutingParam(){
      this.routeSub = this.route.queryParams.subscribe(params => {
        this.routingParam = params['type']
      })
  }
  ngOnDestroy(): void {
    this.routeSub?.unsubscribe()
  }
}
