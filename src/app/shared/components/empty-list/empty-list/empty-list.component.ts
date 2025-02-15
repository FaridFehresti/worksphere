import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-list',
  standalone: true,
  imports: [],
  templateUrl: './empty-list.component.html',
  styleUrl: './empty-list.component.scss'
})
export class EmptyListComponent {
  @Input() message: string = 'No data found'

}
