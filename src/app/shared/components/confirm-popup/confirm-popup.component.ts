import { Component, Input, Inject, Output, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: 'confirm-popup.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmPopUpAnimation {
  @Input() title:string = 'dailog';
  @Input() description:string = 'description';
  @Output() onConfirm = new EventEmitter<any>();


  constructor(public dialog: MatDialog) {}

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(ConfirmPopUpComponent, {
      width: '250px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.onConfirm.emit(result);
      }
    });
  }
}

@Component({
  selector: 'app-confirm-popup-dialog',
  templateUrl: 'confirm-popup-dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class ConfirmPopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
    
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
