import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() diameter: number | undefined = 50;
  @Input() status: 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED' | undefined;

}
