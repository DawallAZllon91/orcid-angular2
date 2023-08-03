import { DialogRef } from '@angular/cdk/dialog'
import { Component, Inject, OnInit } from '@angular/core'
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog'

@Component({
  selector: 'app-client-secret-modal',
  templateUrl: './client-secret-modal.component.html',
  styleUrls: ['./client-secret-modal.component.scss'],
})
export class ClientSecretModalComponent implements OnInit {
  secret: string
  generate() {
    this.matDialogRef.close(true)
  }

  ariaLabelClose = $localize`:@@developerTools.ariaLabelClose:Close`

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { secretId: string },
    private matDialogRef: MatDialogRef<ClientSecretModalComponent>
  ) {}

  ngOnInit(): void {
    this.secret = this.data.secretId
  }
  close() {
    this.matDialogRef.close()
  }
}
