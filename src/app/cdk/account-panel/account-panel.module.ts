import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button'
import { MatIconModule } from '@angular/material/icon'
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar'
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip'
import { SharedModule } from 'src/app/shared/shared.module'

import { SettingsPanelsDataComponent } from './settings-panels-data/settings-panels-data.component'
import { PanelExpandButtonsComponent } from './settings-panels-expand-buttons/settings-panels-expand-buttons.component'
import { SettingsPanelsComponent } from './settings-panels/settings-panels.component'
import { RouterModule, Routes } from '@angular/router'

@NgModule({
  declarations: [
    SettingsPanelsComponent,
    SettingsPanelsDataComponent,
    PanelExpandButtonsComponent,
  ],
  exports: [
    SettingsPanelsComponent,
    SettingsPanelsDataComponent,
    PanelExpandButtonsComponent,
    RouterModule,
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    SharedModule,
    RouterModule,
  ],
})
export class AccountPanelModule {}
