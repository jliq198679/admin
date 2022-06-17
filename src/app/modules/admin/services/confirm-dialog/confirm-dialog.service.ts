import { ConfirmDialogComponent } from './../../components/confirm-dialog';
import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(public dialog: MatDialog) {
  }

  confirmDialog(msg: string): Promise<boolean> {

    return new Promise(
      resolve=>{
        const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: msg });

        dialogRef.afterClosed().subscribe(confirm =>resolve(confirm));
      }
    )
  }

}
