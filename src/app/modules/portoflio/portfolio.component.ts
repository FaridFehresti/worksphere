import { Component, OnDestroy, OnInit, HostListener, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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
  isThankYouVisible: boolean = false; 
  private touchStartY: number = 0;

   listOfFrontendStacks: Array<{ name: string, logo: string }> = [
    { name: 'Angular', logo: 'angular-logo-url' },
    { name: 'Next.js', logo: 'nextjs-logo-url' },
    { name: 'React', logo: 'react-logo-url' },
    { name: 'Redux', logo: 'redux-logo-url' },
    { name: 'Three.js', logo: 'threejs-logo-url' },
    { name: 'Tailwind CSS', logo: 'tailwind-css-logo-url' },
    { name: 'HTML', logo: 'html-logo-url' },
    { name: 'CSS', logo: 'css-logo-url' },
    { name: 'SCSS/Less', logo: 'scss-less-logo-url' },
    { name: 'Bootstrap', logo: 'bootstrap-logo-url' },
    { name: 'RxJS', logo: 'rxjs-logo-url' },
    { name: 'NgRx', logo: 'ngrx-logo-url' },
    { name: 'Axios', logo: 'axios-logo-url' },
    { name: 'MUI (Material-UI)', logo: 'mui-logo-url' },
    { name: 'Angular Material', logo: 'angular-material-logo-url' },
    { name: 'Ant Design', logo: 'ant-design-logo-url' },
    { name: 'Git & GitHub', logo: 'git-github-logo-url' },


  ];
  
   listOfBackendStacks: Array<{ name: string, logo: string }> = [
    { name: 'Node.js', logo: 'nodejs-logo-url' },
    { name: 'NestJS', logo: 'nestjs-logo-url' },
    { name: 'Express.js', logo: 'expressjs-logo-url' },
    { name: 'EJs', logo: 'EJs-logo-url' },
    { name: 'Cloud Hosting', logo: 'cloud-hosting-logo-url' },
    { name: 'Postgres', logo: 'postgres-logo-url' },
    { name: 'MySQL', logo: 'mysql-logo-url' },
  ];
  
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
    Senior <span class="!text-primary">JavaScript Developer</span> with <span class="!text-primary">5+ years</span> of professional experience 
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
    thankYouParagraphText:string  = '';
    thankYouHeaderText:string = ''
  animationState: boolean = false;
  displayComponent: boolean = false;
  reactImage: string = '/images/react-white.png';
  serverImage: string = '/images/server-white.png';
  expandRing: boolean = false;
  constructor(private route: ActivatedRoute, private cdRef: ChangeDetectorRef) {}
  activeSection: string = 'about'; // Default active section
  private expandTimeout: any;
  private mouseMoveTimeout: any;
  private scrollTimeout: any;
  @ViewChild('scrollerContainer', { static: true }) scrollerContainer!: ElementRef;
  @ViewChild('thankYouSection', { static: false }) thankYouSection!: ElementRef;

  isMobile: boolean = window.innerWidth < 982; // Initial check

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth < 982;
  }
  ngAfterViewInit() {
    if (this.scrollerContainer) {
      this.scrollerContainer.nativeElement.addEventListener('scroll', () => {
        this.detectActiveSection();
        this.detectScroll();
      });
      this.detectActiveSection(); 
      this.detectScroll();
    }
  }
downloadResume() {
  const link = document.createElement('a');
  link.href = 'resume/faridfehresti-resume.pdf';
  link.download = 'faridfehresti-resume.pdf';
  link.click();
}

detectActiveSection(): void {
  const sections = ['about', 'experiences', 'stack', 'projects'];

  for (const section of sections) {
    const el = document.querySelector(`.${section}`) as HTMLElement;
    if (el) {
      const rect = el.getBoundingClientRect();
      const containerRect = this.scrollerContainer.nativeElement.getBoundingClientRect();

      if (rect.top >= containerRect.top && rect.top < containerRect.bottom) {
        if (this.activeSection !== section) {
          this.expandRing = true;

          if (this.expandTimeout) clearTimeout(this.expandTimeout);

          this.expandTimeout = setTimeout(() => {
            this.expandRing = false;
          }, 4500);

          this.activeSection = section;
          this.cdRef.detectChanges(); // Update view manually
        }
        break;
      }
    }
  }
}

scrollToSection(section: string): void {
  this.expandRing = true;

  if (this.expandTimeout) clearTimeout(this.expandTimeout);

  this.expandTimeout = setTimeout(() => {
    this.expandRing = false;
  }, 4500);

  const element = document.querySelector(`.${section}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.activeSection = section;
  }
}

@HostListener('window:scroll', [])
detectScroll(): void {
  const projectsSection = document.querySelector('.projects') as HTMLElement;
  const thankYou = this.thankYouSection?.nativeElement;

  if (!projectsSection || !thankYou) return;

  const rect = projectsSection.getBoundingClientRect();
  const isBottomReached = rect.bottom <= window.innerHeight;
  const isAboveViewport = rect.top > window.innerHeight; // Detects if scrolled back up

  if (isBottomReached && !isAboveViewport) {
    if (!this.isThankYouVisible) {
      this.thankYouHeaderText='Thank You for Visiting!'
      this.thankYouParagraphText ='I appreciate your time. Feel free to connect with me!'
      this.isThankYouVisible = true;
      thankYou.classList.add('opacity-100', 'translate-y-0');
    }
  } else {
    if (this.isThankYouVisible) {
      this.isThankYouVisible = false;
      thankYou.classList.remove('opacity-100', 'translate-y-0');
    }
  }
}



onExprienceClick() {
  this.expandRing = true;

  setTimeout(() => {
    this.expandRing = false;
  }, 4500);
}
handleThankYouScroll(event: any) {
  const projectsSection = document.querySelector('.projects');

  if (event.deltaY === -100) {
    setTimeout(() => {
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }, 0); 
  }
}

@HostListener('mousemove', ['$event'])
onMouseMove(event: MouseEvent): void {
  if (this.mouseMoveTimeout) {
    cancelAnimationFrame(this.mouseMoveTimeout);
  }
  this.mouseMoveTimeout = requestAnimationFrame(() => {
    this.lightStyle = {
      left: `${event.clientX}px`,
      top: `${event.clientY}px`,
    };
  });
}

@HostListener('window:scroll', [])
onScroll(): void {
  if (this.scrollTimeout) clearTimeout(this.scrollTimeout);

  this.scrollTimeout = setTimeout(() => {
    this.detectActiveSection();
    this.detectScroll();
  }, 100); // Adjust debounce delay as needed
}

ngOnInit(): void {
  this.getCurrentParams();
  this.onExprienceClick();
}

getCurrentParams(): void {
  this.routeSub = this.route.queryParams.subscribe((params) => {
    this.routingParam = params['type'];
  });
}
handleTouchStart(event: TouchEvent) {
  // Store the touch start Y position
  this.touchStartY = event.touches[0].clientY;
}

// Handles touchend event for mobile
handleTouchEnd(event: TouchEvent) {
  const touchEndY = event.changedTouches[0].clientY;
  const projectsSection = document.querySelector('.projects');
  const thankYou = this.thankYouSection?.nativeElement;

  if (this.touchStartY - touchEndY < -50) { 

    setTimeout(() => {
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'end' });

        if (this.isThankYouVisible) {
          
          this.isThankYouVisible = false;
          thankYou.classList.remove('opacity-100', 'translate-y-0');
        }
      }
      
    }, 0); 
  }
  
}


ngOnDestroy(): void {
  this.routeSub?.unsubscribe();
  if (this.expandTimeout) clearTimeout(this.expandTimeout);
  if (this.mouseMoveTimeout) cancelAnimationFrame(this.mouseMoveTimeout);
  if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
}
}
