import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { PlatformInfo, PlatformInfoService } from 'src/app/cdk/platform-info'
import { UserRecord } from '../../../types/record.local'
import { environment } from '../../../../environments/environment'
import { WINDOW } from '../../../cdk/window'
import { UserStatus } from '../../../types/userStatus.endpoint'

@Component({
  selector: 'app-top-bar-actions',
  templateUrl: './top-bar-actions.component.html',
  styleUrls: ['./top-bar-actions.component.scss'],
})
export class TopBarActionsComponent implements OnInit, OnDestroy {
  labelPrintableVersion = $localize`:@@topBar.ariaLabelPrintableVersion:View printable version (Opens of a different tab)`
  labelIsThisYou = $localize`:@@topBar.isThisYou:Is this you?`
  labelSignInToStart =
    $localize`:@@topBar.isThisYou:Is this you?` +
    ' ' +
    $localize`:@@topBar.signInToStart:Sign in to start editing`
  name: string

  $destroy: Subject<boolean> = new Subject<boolean>()
  platform: PlatformInfo
  @Input() userRecord: UserRecord
  @Input() userStatus: UserStatus
  @Input() isPublicRecord: string
  @Input() showPrintButton = false
  @Input() showIsThisYouButton = false
  constructor(
    @Inject(WINDOW) private window: Window,
    _platform: PlatformInfoService
  ) {
    _platform
      .get()
      .pipe(takeUntil(this.$destroy))
      .subscribe((data) => {
        this.platform = data
        this.getRecordName()
      })
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.$destroy.next()
  }

  printRecord() {
    this.window.open(
      environment.BASE_URL +
        this.userRecord?.userInfo?.EFFECTIVE_USER_ORCID +
        '/print'
    )
  }

  private getRecordName() {
    if (this.userRecord?.names) {
      if (this.userRecord?.names?.creditName?.value) {
        this.name = this.userRecord?.names?.creditName?.value
      } else {
        if (this.userRecord?.names?.givenNames?.value) {
          this.name = this.userRecord?.names?.givenNames?.value
        }
        if (this.userRecord?.names?.familyName?.value) {
          if (this.name) {
            this.name =
              this.name + ' ' + this.userRecord?.names?.familyName?.value
          } else {
            this.name = this.userRecord?.names?.familyName?.value
          }
        }
      }
    }
    return
  }
}
