import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'public-forum';
  isHome: boolean = false;
  isAuth: boolean = false;
  isPortfolio: boolean = false;
  isVisible: boolean = false;
  currentRoute: string = '';
  private routerSubscription: Subscription | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.determineCurrentRoute(event.urlAfterRedirects);
    });
  }

  determineCurrentRoute(url: string): void {
    this.currentRoute = url;
    if(this.currentRoute === '/home'){
      this.isHome = true;
    }else{
      this.isHome = false;
    }
    if(this.currentRoute === '/auth' || this.currentRoute === '/auth/login' || this.currentRoute === '/auth/register'){
      this.isAuth = true;
    }else{
      this.isAuth = false;
    }
    if(this.currentRoute === '/'){
      this.isPortfolio = true

    }else{
      this.isPortfolio = false

    }
   
  }
  openCircularMenu(){
    this.isVisible = true
  }
  closeCircularMenu(){
    this.isVisible = false
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
