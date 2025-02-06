import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { CircleComponent } from './circle/circle.component';

@Component({
  selector: 'app-circular-menu',
  standalone: true,
  imports: [MatButtonModule,CircleComponent],
  templateUrl: './circular-menu.component.html',
  styleUrl: './circular-menu.component.scss',

})
export class CircularMenuComponent {
  @Input() isVisible: boolean = false;
  @Output() onCloseMenu = new EventEmitter<boolean>();
  openCircleMenu(){
    this.isVisible = true
  }
  closeCircleMenu(){
    this.onCloseMenu.emit(false)

  }
}

