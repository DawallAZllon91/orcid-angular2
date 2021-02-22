import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { MatSelect } from '@angular/material/select'
import { cloneDeep } from 'lodash'
import { Subject } from 'rxjs'
import { first, takeUntil } from 'rxjs/operators'
import { ModalComponent } from 'src/app/cdk/modal/modal/modal.component'
import { PlatformInfoService } from 'src/app/cdk/platform-info'
import { RecordKeywordService } from 'src/app/core/record-keyword/record-keyword.service'
import { VisibilityStrings } from 'src/app/types/common.endpoint'
import { KeywordEndpoint } from 'src/app/types/record-keyword.endpoint'

@Component({
  selector: 'app-modal-keyword',
  templateUrl: './modal-keyword.component.html',
  styleUrls: [
    './modal-keyword.component.scss-theme.scss',
    './modal-keyword.component.scss',
  ],
})
export class ModalKeywordComponent implements OnInit, OnDestroy {
  $destroy: Subject<boolean> = new Subject<boolean>()

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private _recordKeywordService: RecordKeywordService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _platform: PlatformInfoService
  ) {}

  addedKeywordsCount = 0
  keywordsForm: FormGroup
  keywords: Keyword[]
  keywordsMap: { [key: string]: Keyword }
  defaultVisibility: VisibilityStrings
  originalBackendKeywords: KeywordsEndpoint
  isMobile: boolean
  loadingKeywords = true  
  
  ngOnInit(): void {
    this._recordKeywordService
      .getKeywords()
      .pipe(first())
      .subscribe((keywords: KeywordsEndpoint) => {
        this.defaultVisibility = keywords.visibility.visibility
        this.originalBackendKeywords = cloneDeep(keywords)
        this.keywords = this.originalBackendkeywords.keywords
        this.originalBackendKeywords.keywords.map(
          (value) => (this.keywordsMap[value.putCode] = value)
        )
        this.backendJsonToForm(this.originalBackendKeywords)
        this.loadingKeywords = false
      })    
    this._platform
      .get()
      .pipe(takeUntil(this.$destroy))
      .subscribe(
        (platform) => (this.isMobile = platform.columns4 || platform.columns8)
      )
  }

  backendJsonToForm(keywordEndpointJson: KeywordEndpoint) {
    const keywords = keywordEndpointJson.keywords
    const group: { [key: string]: FormGroup } = {}

    keywords.forEach((keyword) => {
      group[keyword.putCode] = new FormGroup({
        keyword: new FormControl(keyword.value),
        visibility: new FormControl(keyword.visibility.visibility, {}),
      })
    })
    this.keywordsForm = new FormGroup(group)
  }

  formToBackend(keywordsForm: FormGroup): KeywordEndPoint {
    const keywords = {
      errors: [],
      keywords: [],
      visibility: this.originalBackendKeywords.visibility,
    }
    this.keywords.reverse()
    this.keywords
      .map((value) => value.putCode)
      .filter((key) => keywordsForm.value[key].content)
      .forEach((key, i) => {
        const keyword = websitesForm.value[key].content
        const visibility = websitesForm.value[key].visibility
        if (keywordsForm.value[key]) {
          keywords.keywords.push({
            putCode: key.indexOf('new-') === 0 ? null : key,
            value: value,
            displayIndex: i + 1,
            source: this.userSession.userInfo.EFFECTIVE_USER_ORCID,
            visibility: {
              visibility,
            },
          } as Assertion)
        }
      })
    return keywords
  }


  saveEvent() {
    this.loadingKeywords = true
    this._recordKeywordService
      .postKeyword(this.formToBackend(this.keywordsForm))
      .subscribe((response) => {
        this.closeEvent()
      })
  }
  closeEvent() {
    this.dialogRef.close()
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.keywords, event.previousIndex, event.currentIndex)
  }
  addKeyword() {
    this.keywordsForm.addControl(
      'new-' + this.addedKeywordsCount,
      new FormGroup({
        keyword: new FormControl(),
        visibility: new FormControl(this.defaultVisibility, {}),
      })
    )
    this.keywords.push({
      putCode: 'new-' + this.addedKeywordsCount,
      visibility: { visibility: this.defaultVisibility },
    } as Keyword)
    this.addedKeywordsCount++

    this._changeDetectorRef.detectChanges()
    const input = this.inputs.last
    input.focus()
  }
  deleteKeyword(putcode: string) {
    const i = this.keywords.findIndex((value) => value.putCode === putcode)
    this.keywords.splice(i, 1)
    this.keywordsForm.removeControl(putcode)
  }

  getSourceName(keyword: Assertion) {
    return keyword.sourceName || keyword.source
  }  

  ngOnDestroy() {
    this.$destroy.next(true)
    this.$destroy.unsubscribe()
  }

  onSubmit() {}
}
