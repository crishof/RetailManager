import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appDefaultImage]',
  standalone: true,
})
export class DefaultImageDirective {
  constructor() {}

  //@HostBinding('src')
  @Input()
  defaultImage: string = '../../assets/images/no-image-100.png';
}
