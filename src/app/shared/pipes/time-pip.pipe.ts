import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePip',
  standalone: true
})
export class TimePipPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
