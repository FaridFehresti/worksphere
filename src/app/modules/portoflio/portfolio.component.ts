import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { zoomInRightAnimation } from 'src/app/shared/@animations/zooming-entrances';
interface IExprienceObj {
  title: string;
  date: string;
  description: string;
  skils: Array<string>;
}
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [zoomInRightAnimation()],
})
export class PortfolioComponent implements OnInit, OnDestroy {
  routeSub: Subscription | null = null;
  listOfExpriences: Array<IExprienceObj> = [
    {
      title: ' Admin Panel & Automation Programmer',
      description: `Designed high-performance admin panels for managing real-time updates, calculations, and
 large-scale data.
 Designed high-performance admin panels for managing real-time updates, calculations, and
 large-scale data.
 Created enterprise-level automation solutions for companies, improving efficiency and
 reducing manual work.`,
      date: '2021-present',
      skils: ['React', 'Angular', 'Next.js', 'NestJS', 'GitLab'],
    },
    {
      title: ' E-commerce & SEO Solutions Developer ',
      description: `
      Built 5+ e-commerce platforms for diverse industries (shoes, pipes, bathroom tools).
 Integrated SEO strategies to enhance online visibility and boost client sales.
 Developed scalable, reusable components for seamless user experiences and rapid
 deployment.
      `,
      date: '2023-2024',
      skils: ['React', 'Next.js', 'Nodejs', 'GitLab'],
    },
    {
      title: 'Full-Stack Freelance Developer',
      description: `
      Successfully delivered 20+ projects across gaming, e-commerce, automation, and education
 sectors.
      `,
      date: '2020-present',
      skils: ['React', 'Angular', 'Next.js', 'NestJS', 'NodeJs', 'Postgres'],
    },
    {
      title: ' Lead Developer & Team Manager ',
      description: `
      Led a team of 4 engineers in developing MadTalk, a secure educational platform during
 COVID-19.
 Led a team of 10 engineers in developing TalaCenter a gold price and invoicing solution
 platform.`,
      date: '2020-2023',
      skils: ['Angular', 'TypeScript', 'AntDesing'],
    },
  ];
  routingParam: string = '/images/react-black.png';
  lightStyle = {
    left: '0px',
    top: '0px',
  };
  paragraphHtml1: string = `
    Senior <span class="!text-primary">JavaScript Developer</span> with <span class="!text-primary">3+ years</span> of professional experience 
    in web application development, automation, and <span class="!text-primary">UI/UX</span> design. 
    
  `;
  paragraphHtml2: string = `
  Passionate about building scalable, high-performance applications using 
    <span class="!text-primary">React</span>, <span class="!text-primary">Angular</span>, <span class="!text-primary">Next.js</span>, and <span class="text-primary">NestJS</span>. 
    Proven expertise in automation solutions, enterprise-level platforms, and e-commerce applications, 
    having successfully led teams of 4-10 engineers.`;
  paragraphHtml3: string = ` Developed highly <span class="!text-primary">Angular</span>, <span class="!text-primary">reusable</span> configurations that enhanced development 
    speed and efficiency across multiple projects. Strong focus on performance optimization, modern design patterns, 
    and AI-enhanced development. Experienced in freelancing, startups, and enterprise projects, 
    consistently delivering cutting-edge, minimalistic, and user-friendly applications.`;
  animationState: boolean = false;
  displayComponent: boolean = false;
  reactImage: string = '/images/react-white.png';
  serverImage: string = '/images/server-white.png';
  expandRing: boolean = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCurrentParams();
    this.onExprienceClick();
    setTimeout(() => {
      this.animate();
    }, 10);
  }
  animate() {
    this.displayComponent = true;
    this.animationState = !this.animationState;
  }
  getCurrentParams(): void {
    this.routeSub = this.route.queryParams.subscribe((params) => {
      this.routingParam = params['type'];
    });
  }
  onExprienceClick() {
    this.expandRing = true;

    setTimeout(() => {
      this.expandRing = false;
    }, 4500);
  }
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Update the light position dynamically
    this.lightStyle = {
      left: `${mouseX}px`,
      top: `${mouseY}px`,
    };
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
