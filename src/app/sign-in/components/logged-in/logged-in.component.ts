import { Component, Inject, Input, OnInit } from '@angular/core'
import { WINDOW } from '../../../cdk/window'

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.scss'],
})
export class LoggedInComponent {
  @Input() realUserOrcid: string
  @Input() displayName: string

  constructor(@Inject(WINDOW) private window: Window) {}


  navigateTo(val) {
    this.window.location.href = val
  }
}
