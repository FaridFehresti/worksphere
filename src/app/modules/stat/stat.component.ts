import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.scss'
})
export class StatComponent implements OnInit, OnDestroy{
  routeSub:Subscription | null = null;
  routingParam:string = ''
  constructor(private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.getCurrentParams()
  }
  getCurrentParams(){
    this.routeSub = this.route.queryParams.subscribe(params=>{
      this.routingParam  = params['type']
      console.log(this.routingParam)
    })
  }
 
  ngOnDestroy(): void {
    this.routeSub?.unsubscribe()
  }

}
