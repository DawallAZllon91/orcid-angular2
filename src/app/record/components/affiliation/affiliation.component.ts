import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { OrgDisambiguated } from 'src/app/types'
import {
  Affiliation,
  AffiliationType,
} from 'src/app/types/record-affiliation.endpoint'
import { URL_REGEXP } from '../../../constants'

@Component({
  selector: 'app-affiliation',
  templateUrl: './affiliation.component.html',
  styleUrls: ['./affiliation.component.scss'],
  preserveWhitespaces: true,
})
export class AffiliationComponent  {
  affiliationValue: Affiliation
  @Input() set affiliation(value: Affiliation) {
    this.showEndDateRange = this.isAffiliationEndDateRangeShown(value)
    this.affiliationValue = value
  }

  get affiliation() {
    return this.affiliationValue
  }
  @Input() panelDetailsState: {
    state: boolean
  }
  @Output() toggleDetails = new EventEmitter<Affiliation>()
  @Input() stackMode
  @Input() orgDisambiguated: OrgDisambiguated
  showEndDateRange = true

  constructor() {}


  /**
   * RegEx function to check if the elements contains a URL
   */
  isUrl(element) {
    return RegExp(URL_REGEXP).test(element)
  }
  private isAffiliationEndDateRangeShown(affiliation: Affiliation): boolean {
    return !(
      affiliation?.affiliationType.value === AffiliationType.distinction &&
      !affiliation.endDate.year
    )
  }
}
