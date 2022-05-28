import { OfferGroupService } from './../../../services/group-offer/offer-group.service';
import { GroupOfferInterface } from './../../../interfaces/group-offer/group-offer.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-offer-group-editor',
  templateUrl: './offer-group-editor.component.html',
  styleUrls: ['./offer-group-editor.component.scss']
})
export class OfferGroupEditorComponent implements OnInit {

  form: FormGroup;
  groupOffer: GroupOfferInterface;

  constructor(public dialogRef: MatDialogRef<OfferGroupEditorComponent>,
              private groupOfferService: OfferGroupService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data?: GroupOfferInterface) {
    this.groupOffer = data;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name_group_es: [this.groupOffer?.name_group_es || null, [Validators.required]],
      name_group_en: [this.groupOffer?.name_group_en || null, [Validators.required]],
    });
  }

  store() {
    const data = this.form.value;
    this.groupOfferService.store(data).subscribe(resp=>{
      this.snackBar.open("Categoría de oferta añadida de forma correcta", 'X');
      this.dialogRef.close();
    })
  }

}
