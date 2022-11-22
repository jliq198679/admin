import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminNotificationService } from './../../../services';
import { AdminNotificationInterface } from './../../../interfaces';

@Component({
  selector: 'admin-notification-editor',
  templateUrl: './notification-editor.component.html',
  styleUrls: ['./notification-editor.component.scss']
})
export class AdminNotificationEditorComponent implements OnInit {

  form: FormGroup;
  notification: AdminNotificationInterface;

  constructor(public dialogRef: MatDialogRef<AdminNotificationEditorComponent>,
              private snackBar: MatSnackBar,
              private notificationService: AdminNotificationService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data?: AdminNotificationInterface) {
    this.notification = data;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.notification?.title || null, [Validators.required]],
      body: [this.notification?.body || null, [Validators.required]],
      click_action: [this.notification?.click_action || null],
    });
  }

  save() {
    const data = this.form.value;

    if(this.notification) {
      data['id'] = this.notification.id;
    }

    this.serverRequest(data);
  }

  serverRequest(data) {
    const response = this.notification ? this.notificationService.update(data.id, data) : this.notificationService.store(data);

    response.subscribe(resp=>{
      const msg = `Notificación ${this.notification ? 'actualizada' : 'añadida'} de forma correcta`;
      this.snackBar.open(msg, 'X');
      this.dialogRef.close();
    })
  }

}
