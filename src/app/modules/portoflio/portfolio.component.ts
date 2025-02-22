import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { zoomInRightAnimation } from 'src/app/shared/@animations/zooming-entrances';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations:[
    zoomInRightAnimation(),
  ]
})
export class PortfolioComponent implements OnInit, OnDestroy {
  routeSub: Subscription | null = null;

  routingParam: string = '/images/react-black.png';
  lightStyle = {
    left: '0px',
    top: '0px'
  };
  paragraphHtml: string = `
    Senior <span class="!text-white">JavaScript Developer</span> with <span class="!text-white">3+ years</span> of professional experience 
    in web application development, automation, and <span class="!text-white">UI/UX</span> design. 
    Passionate about building scalable, high-performance applications using 
    <span class="!text-white">React</span>, <span class="!text-white">Angular</span>, <span class="!text-white">Next.js</span>, and <span class="text-white">NestJS</span>. 
    Proven expertise in automation solutions, enterprise-level platforms, and e-commerce applications, 
    having successfully led teams of 4-10 engineers. Developed highly reusable configurations that enhanced development 
    speed and efficiency across multiple projects. Strong focus on performance optimization, modern design patterns, 
    and AI-enhanced development. Experienced in freelancing, startups, and enterprise projects, 
    consistently delivering cutting-edge, minimalistic, and user-friendly applications.
  `;
  animationState :boolean= false;
  displayComponent:boolean = false;
  reactImage:string = '/images/react-white.png';
  serverImage:string = '/images/server-white.png';
  expandRing:boolean =false;
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.getCurrentParams();
    this.onExprienceClick();
    setTimeout(()=>{
      this.animate();
    },10)
  }
  animate(){
    this.displayComponent=true;
    this.animationState = !this.animationState;
  }
  getCurrentParams(): void {
    this.routeSub = this.route.queryParams.subscribe((params) => {
      this.routingParam = params['type'];
    });
  }
  onExprienceClick(){
    this.expandRing = true;

    setTimeout(()=>{
      this.expandRing = false;
    },4500)
  }
  @HostListener('mousemove', ['$event'])
  
  onMouseMove(event: MouseEvent): void {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Update the light position dynamically
    this.lightStyle = {
      left: `${mouseX}px`,
      top: `${mouseY}px`
    };
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
