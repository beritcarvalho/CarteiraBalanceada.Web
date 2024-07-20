import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-toobar',
  templateUrl: './toobar.component.html',
  styleUrl: './toobar.component.css'
})
export class ToobarComponent {
  disableSelect = new FormControl(false);
}
