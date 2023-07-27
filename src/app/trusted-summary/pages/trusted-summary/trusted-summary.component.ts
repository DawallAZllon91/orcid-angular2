import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TrustedSummaryService } from 'src/app/core/trusted-summary/trusted-summary.service'
import { TrustedSummary } from 'src/app/types/trust-summary'
import { SimpleActivityModel } from '../../component/summary-simple-panel/summary-simple-panel.component'
import { PlatformInfoService } from 'src/app/cdk/platform-info'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-trusted-summary',
  templateUrl: './trusted-summary.component.html',
  styleUrls: [
    './trusted-summary.component.scss',
    './trusted-summary.component.scss-theme.scss',
  ],
})
export class TrustedSummaryComponent implements OnInit, OnDestroy {
  trustedSummary: TrustedSummary
  currentLocation: string
  orcid: string
  works: SimpleActivityModel[] = []
  unsubscribe = new Subject()
  labelValidatedWorks = $localize`:@@record.validatedWorks:Validated works`
  labelValidatedWork = $localize`:@@record.validatedWork:Validated work`
  labelSelfAssertedWorks = $localize`:@@record.selfAssertedWorks:Self-asserted works`
  labelSelfAssertedWork = $localize`:@@record.selfAssertedWork:Self-asserted work`
  labelValidatedFunding = $localize`:@@record.validatedFunding:Validated funding`
  labelValidatedFundings = $localize`:@@record.validatedFundings:Validated fundings`
  labelSelfAssertedFunding = $localize`:@@record.selfAssertedFunding:Self-asserted funding`
  labelSelfAssertedFundings = $localize`:@@record.selfAssertedFundings:Self-asserted fundings`
  labelReviesFor = $localize`:@@record.reviewsFor:Reviews for`
  labelReviewFor = $localize`:@@record.reviewFor:Review for`
  labelpublicationgrants = $localize`:@@record.publicationgrantes:publication/grants`
  labelpublicationgrant = $localize`:@@record.publicationgrant:publication/grant`

  funds: SimpleActivityModel[] = []
  peerReviews: SimpleActivityModel[] = []
  mobile: boolean
  externalIdentifiers: SimpleActivityModel[]
  twoColumns: boolean = false
  threeColumns: boolean = false
  oneColumn: boolean

  constructor(
    private _trustedSummary: TrustedSummaryService,
    private _router: Router,
    private _platform: PlatformInfoService
  ) {}
  ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }

  ngOnInit(): void {

    this._platform
      .get()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((platform) => {
        if (platform.columns4 || platform.columns8) {
          this.mobile = true
        } else {
          this.mobile = false
        }
      })
    this.currentLocation = window.location.origin
    this.orcid = this._router.url.split('/')[1]
    this._trustedSummary.getSummary(this.orcid).subscribe((data) => {
      this.trustedSummary = data
      if (this.trustedSummary.selfAssertedWorks) {
        this.works.push({
          verified: false,
          countA: this.trustedSummary.selfAssertedWorks,
          stringA:
            this.trustedSummary.selfAssertedWorks > 1
              ? this.labelSelfAssertedWorks
              : this.labelSelfAssertedWork,
        })
      }
      if (this.trustedSummary.validatedWorks) {
        this.works.push({
          verified: true,
          countA: this.trustedSummary.validatedWorks,
          stringA:
            this.trustedSummary.validatedWorks > 1
              ? this.labelValidatedWorks
              : this.labelValidatedWork,
        })
      }
      if (this.trustedSummary.validatedFunds) {
        this.funds.push({
          verified: true,
          countA: this.trustedSummary.validatedFunds,
          stringA:
            this.trustedSummary.validatedFunds > 1
              ? this.labelValidatedFundings
              : this.labelValidatedFunding,
        })
      }
      if (this.trustedSummary.selfAssertedFunds) {
        this.funds.push({
          verified: false,
          countA: this.trustedSummary.selfAssertedFunds,
          stringA:
            this.trustedSummary.selfAssertedFunds > 1
              ? this.labelSelfAssertedFundings
              : this.labelSelfAssertedFunding,
        })
      }
      if (
        this.trustedSummary.reviews &&
        this.trustedSummary.peerReviewPublicationGrants
      ) {
        this.peerReviews.push({
          verified: true,
          countA: this.trustedSummary.reviews,
          stringA:
            this.trustedSummary.reviews > 1
              ? this.labelReviesFor
              : this.labelReviewFor,
          countB: this.trustedSummary.peerReviewPublicationGrants,
          stringB:
            this.trustedSummary.peerReviewPublicationGrants > 1
              ? this.labelpublicationgrants
              : this.labelpublicationgrant,
        })
      }
      this.externalIdentifiers = this.trustedSummary.externalIdentifiers.map(
        (id) => {
          return {
            verified: id.verified,
            url: id.url,
            stringA: id.id,
          }
        }
      )

      if (
        (this.works.length > 0 ||
          this.funds.length > 0 ||
          this.peerReviews.length > 0) &&
        (this.externalIdentifiers.length > 0 ||
          this.trustedSummary.professionalActivitiesCount > 0 ||
          this.trustedSummary.externalIdentifiers.length > 0)
      ) {
        this.threeColumns = true
      } else if (
        this.works.length > 0 ||
        this.funds.length > 0 ||
        this.peerReviews.length > 0 ||
        this.externalIdentifiers.length > 0 ||
        this.trustedSummary.professionalActivitiesCount > 0
      ) {
        this.twoColumns = true
      } else {
        this.oneColumn = true
      }
    })
  }
}
