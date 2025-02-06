import { Component, EventEmitter, Input, Output} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-circle',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './circle.component.html',
  styleUrl: './circle.component.scss'
})
export class CircleComponent {
  @Input() isHome: boolean = false
  @Output() onCloseMenu = new EventEmitter<boolean>()
  circleElement: HTMLElement | null = null;
  maxRadius = 50; // Maximum allowed radius for movement

  ngOnInit() {
    this.circleElement = document.querySelector('.circle-light');
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }

  closeCircleMenu() {
    this.onCloseMenu.emit(false)
  }
  onMouseMove(event: MouseEvent) {
    if (this.circleElement) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate distance from the center of the window
      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;

      // Calculate the distance from the center using Pythagorean theorem
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Limit the distance to the max radius
      let limitedX = distanceX;
      let limitedY = distanceY;
      if (distance > this.maxRadius) {
        const ratio = this.maxRadius / distance;
        limitedX = distanceX * ratio;
        limitedY = distanceY * ratio;
      }

      // Update the position of the circle
      this.circleElement.style.top = `calc(50% + ${limitedY}px)`;
      this.circleElement.style.left = `calc(50% + ${limitedX}px)`;
    }
  }
}
