import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { PageEvent } from '@angular/material/paginator'
import { Observable, of, Subject } from 'rxjs'
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators'
import { PlatformInfoService } from 'src/app/cdk/platform-info'
import {
  EMAIL_REGEXP_GENERIC,
  ORCID_REGEXP,
  ORCID_REGEXP_CASE_INSENSITIVE,
} from 'src/app/constants'
import { UserService } from 'src/app/core'
import { AccountTrustedIndividualsService } from 'src/app/core/account-trusted-individuals/account-trusted-individuals.service'
import { SearchService } from 'src/app/core/search/search.service'
import { ExpandedSearchResultsContent, SearchResults } from 'src/app/types'
import { UserSession } from 'src/app/types/session.local'
import { environment } from 'src/environments/environment'
import { DialogAddTrustedIndividualsComponent } from '../dialog-add-trusted-individuals/dialog-add-trusted-individuals.component'

@Component({
  selector: 'app-settings-trusted-individuals-search',
  templateUrl: './settings-trusted-individuals-search.component.html',
  styleUrls: [
    './settings-trusted-individuals-search.component.scss',
    './settings-trusted-individuals-search.component.scss-theme.scss',
  ],
})
export class SettingsTrustedIndividualsSearchComponent
  implements OnInit, OnDestroy {
  searchDone = false
  displayedColumns = ['trustedIndividuals', 'orcid', 'actions']
  platformSubs = new Subject<void>()
  isMobile: boolean
  searchValue: string
  $trustedIndividuals: Observable<SearchResults>
  pageIndex: number
  pageSize: number
  ariaLabelPaginator = $localize`:@@search.paginator:paginator`
  loading: boolean
  baseUrl = environment.BASE_URL
  userSession: UserSession
  searchPlaceHolder = $localize`:@@account.searchIndividualsPlaceHolder:ORCID iD, email address, or names`

  constructor(
    private _search: SearchService,
    private dialog: MatDialog,
    private _platform: PlatformInfoService,
    private account: AccountTrustedIndividualsService,
    private _user: UserService
  ) {}
  ngOnDestroy(): void {
    this.platformSubs.next()
    this.platformSubs.complete()
  }

  search(value: string) {
    this.loading = true
    value = value.trim().toLowerCase()
    this.$trustedIndividuals = this._search
      .search({
        searchQuery: value,
        pageIndex: this.pageIndex || 0,
        pageSize: this.pageSize || 10,
      })
      .pipe(
        map((trustedIndividuals) => {
          if (trustedIndividuals['expanded-result']) {
            trustedIndividuals['expanded-result'] = trustedIndividuals[
              'expanded-result'
            ].filter(
              (x) =>
                x['orcid-id'] !== this.userSession.userInfo.EFFECTIVE_USER_ORCID
            )
          }
          return trustedIndividuals
        }),
        map((trustedIndividuals) => {
          const orcidIdMatch = this.extractOrcidId(value)
          const emailMatch = EMAIL_REGEXP_GENERIC.test(value)
          console.log('EMAIL MATCH', emailMatch)

          if (emailMatch && trustedIndividuals['expanded-result']) {
            console.log(emailMatch)
            console.log(trustedIndividuals['expanded-result'])

            const matchingResult = trustedIndividuals['expanded-result'].find(
              (x) =>
                !!x.email.find(
                  (email) => !!(email.trim().toLowerCase() === value)
                )
            )
            if (matchingResult) {
              this.add(matchingResult)
              return null
            } else {
              trustedIndividuals['expanded-result'] = []
            }
          } else if (orcidIdMatch && trustedIndividuals['expanded-result']) {
            const matchingOrcid = trustedIndividuals['expanded-result'].find(
              (ti) => ti['orcid-id'].trim().toLowerCase() === orcidIdMatch
            )
            if (
              matchingOrcid &&
              (orcidIdMatch === value ||
                value.indexOf(environment.BASE_URL + orcidIdMatch) >= 1)
            ) {
              this.add(matchingOrcid)
              return null
            } else {
              trustedIndividuals['expanded-result'] = []
            }
          }
          return trustedIndividuals
        }),
        tap(() => {
          this.loading = false
        })
      )
  }

  private extractOrcidId(input: string): string {
    console.log(input)
    const regexResult = ORCID_REGEXP.exec(input)
    console.log(regexResult)

    if (regexResult) {
      return regexResult[0]
    }
    return null
  }

  add(value: ExpandedSearchResultsContent) {
    this.dialog
      .open(DialogAddTrustedIndividualsComponent, {
        data: value,
        width: '634px',
      })
      .afterClosed()
      .pipe(
        switchMap((value) => {
          if (value) {
            return this.account.add(value)
          }
          return of(undefined)
        })
      )
      .subscribe()
  }

  changePage(event: PageEvent) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.search(this.searchValue)
  }
  ngOnInit(): void {
    this._platform
      .get()
      .pipe(takeUntil(this.platformSubs))
      .subscribe((platform) => {
        this.isMobile = platform.columns4 || platform.columns8
      })
    this._user
      .getUserSession()
      .pipe(take(1))
      .subscribe((userSession) => {
        this.userSession = userSession
      })
  }
}