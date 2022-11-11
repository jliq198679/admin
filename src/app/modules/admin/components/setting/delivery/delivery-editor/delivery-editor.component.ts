import { AdminSettingDeliveryPlaceService } from '../../../../services';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AdminSettingDeliveryPlaceInterface,
  AdminSettingMunicipalityInterface
} from '../../../../interfaces';

@Component({
  selector: 'admin-setting-delivery-editor',
  templateUrl: './delivery-editor.component.html',
  styleUrls: ['./delivery-editor.component.scss']
})
export class AdminSettingDeliveryPlaceEditorComponent implements OnInit {

  form: FormGroup;
  municipality: AdminSettingMunicipalityInterface;
  deliveryPlace: AdminSettingDeliveryPlaceInterface;

  constructor(public dialogRef: MatDialogRef<AdminSettingDeliveryPlaceEditorComponent>,
              private deliveryPlaceService: AdminSettingDeliveryPlaceService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data?: any) {
    this.municipality = data.municipality;
    this.deliveryPlace = data.deliveryPlace;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.deliveryPlace?.name || null, [Validators.required]],
      price: [this.deliveryPlace?.price || null, [Validators.required]]
    });
  }

  store() {
    const data = {
      ...this.form.value,
      municipality_id: this.municipality.id
    };

    if(this.deliveryPlace) {
      data['id'] = this.deliveryPlace.id;
    }

    const response = this.deliveryPlace ? this.deliveryPlaceService.update(this.deliveryPlace.id, data) : this.deliveryPlaceService.store(data);

    response.subscribe(resp=>{
      const msg = `Lugar de entrega ${this.deliveryPlace ? 'actualizado' : 'añadido'} de forma correcta`;
      this.snackBar.open(msg, 'X');
      this.dialogRef.close();
    })
  }

}
