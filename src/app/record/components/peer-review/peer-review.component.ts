import { Component, Input, OnInit } from '@angular/core'
import { PeerReview } from '../../../types/record-peer-review.endpoint'

@Component({
  selector: 'app-peer-review',
  templateUrl: './peer-review.component.html',
  styleUrls: ['./peer-review.component.scss'],
})
export class PeerReviewComponent  {
  @Input() isPublicRecord: string
  @Input() subPeerReview: PeerReview
  @Input() detailsPeerReviews: any

  @Input() stackMode

  constructor() {}


  getPeerReview(putCode: number): PeerReview {
    if (this.detailsPeerReviews.length === 0) {
      return null
    }

    return this.detailsPeerReviews
      .filter((value) => value.putCode === putCode)
      .map((value) => {
        return value.peerReview
      })[0]
  }
}
