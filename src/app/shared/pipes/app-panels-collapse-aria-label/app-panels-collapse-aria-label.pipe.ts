import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'appPanelsCollapseAriaLabel',
})
export class AppPanelsCollapseAriaLabelPipe implements PipeTransform {
  transform(panelType: any, args?: any): string {
    if (panelType === 'employment') {
      return $localize`:@@shared.employmentCollapseAriaLabel:Collapse the Employment section`
    } else if (panelType === 'education' || panelType === 'qualification') {
      return $localize`:@@shared.educationQualificationCollapseAriaLabel:Collapse the Education and qualifications section`
    } else if (
      panelType === 'distinction' ||
      panelType === 'invited-position'
    ) {
      return $localize`:@@shared.distinctionInvitedPositionCollapseAriaLabel:Collapse the Invited positions and distinction section`
    } else if (panelType === 'membership' || panelType === 'service') {
      return $localize`:@@shared.membershipServiceCollapseAriaLabel:Collapse the Membership and service section`
    } else if (panelType === 'funding') {
      return $localize`:@@shared.fundingServiceCollapseAriaLabel:Collapse the Funding section`
    } else if (panelType === 'works') {
      return $localize`:@@shared.workServiceCollapseAriaLabel:Collapse the Works section`
    } else if (panelType == 'peer-review') {
      return $localize`:@@shared.peerReviewServiceCollapseAriaLabel:Collapse the Peer review section`
    } else if (panelType === 'sub-peer-review') {
      return $localize`:@@shared.activityCollapseForAriaLabel:Collapse for`
    } else if (panelType === 'top-bar' && args) {
      if (args === 'also-know-as') {
        return $localize`:@@shared.countriesCollapseOtherNames:Collapse Other names`
      }
    } else if (panelType === 'side-bar' && args) {
      // emails-panel, websites-panel, personal-identifiers-panel, keywords-panel, countries-panel
      if (args === 'emails-panel') {
        return $localize`:@@shared.emailsCollapseAriaLabel:Collapse the Emails`
      } else if (args === 'websites-panel') {
        return $localize`:@@shared.websiteCollapseAriaLabel:Collapse the Website & Social links`
      } else if (args === 'personal-identifiers-panel') {
        return $localize`:@@shared.personalIdsCollapseAriaLabel:Collapse the Personal identifiers`
      } else if (args === 'keywords-panel') {
        return $localize`:@@shared.keywordsCollapseAriaLabel:Collapse the Keywords`
      } else if (args === 'countries-panel') {
        return $localize`:@@shared.countriesCollapseAriaLabel:Collapse the Countries`
      }
    } else {
      return $localize`:@@shared.hideDetails:Hide details`
    }
  }
}
