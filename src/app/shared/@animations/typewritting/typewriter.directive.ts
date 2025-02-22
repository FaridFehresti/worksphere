import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTypewriter]',
})
export class TypewriterDirective implements OnInit {
  @Input('appTypewriter') htmlContent: string = ''; // Accepts HTML input
  @Input() speed: number = 10; // Speed of typing (milliseconds)
  @Input() cursorSpeed: number = 500; // Cursor blinking speed (milliseconds)

  private container: HTMLElement;
  private cursor!: HTMLElement;

  constructor(private el: ElementRef) {
    this.container = this.el.nativeElement;
  }

  ngOnInit() {
    this.startTyping();
  }

  startTyping() {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this.htmlContent.trim(); // Preserve HTML structure

    const childNodes = Array.from(tempDiv.childNodes); // Get all child nodes including HTML tags

    this.container.innerHTML = ''; // Clear initial text

    // Create and add the blinking cursor
    this.cursor = document.createElement('span');
    this.cursor.innerText = '█';
    this.cursor.style.opacity = '1';
    this.cursor.style.animation = `blink ${this.cursorSpeed}ms step-end infinite`;
    this.container.appendChild(this.cursor);

    let i = 0;
    let currentNode: Node | null = null;
    const interval = setInterval(() => {
      if (i < childNodes.length) {
        currentNode = childNodes[i];
        if (currentNode instanceof HTMLElement || currentNode instanceof Text) {
          this.container.insertBefore(currentNode, this.cursor);
        }
        i++;
      } else {
        clearInterval(interval);
        this.cursor.remove(); // Remove cursor after typing ends
      }
    }, this.speed);
  }
}
