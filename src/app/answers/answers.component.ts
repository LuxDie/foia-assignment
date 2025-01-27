import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog'

@Component({
  selector: 'app-answers',
  imports: [MatButtonModule],
  template: '<div><button mat-raised-button (click)="openDialog()">Answers</button></div>',
  styles: 'div { margin: 1rem 0; width: 100%; text-align: center }'
})
export class AnswersComponent {
  matDialog = inject(MatDialog)

  openDialog() {
    this.matDialog.open(AnswersComponentDialog);
}

}

@Component({
  selector: 'app-answers-dialog',
  imports: [MatDialogContent],
  template:
    `
    <mat-dialog-content>
      <dl>
        <dt>Describe the pros and cons of a few methods of communication between Angular components.</dt>
        <dd>Not sure.</dd>
        <dt>Describe 3 things you dislike about Angular.</dt>
        <dd>It's too complex and has a too steep learning curve.</dd>
        <dt>If there are any items that you did not complete, please list them out.</dt>
        <dd>I think I hit all the nails. There are a few things in need of ironing though.</dd>
        <dt>If you had 40 hours to work on this project, please describe all the improvements you would incorporate.</dt>
        <dd>I'd add filtering, sorting and searching, plus a neater interface.</dd>
      </dl>
    </mat-dialog-content>
    `,
    styles: 'dt { font-weight: bold; }'
})
class AnswersComponentDialog {}