import { OfferService } from './../../../services/offer';
import { OfferInterface } from './../../../interfaces';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-offer-editor',
  templateUrl: './offer-editor.component.html',
  styleUrls: ['./offer-editor.component.scss']
})
export class OfferEditorComponent implements OnInit {

  form: FormGroup;
  offer: OfferInterface;

  constructor(public dialogRef: MatDialogRef<OfferEditorComponent>,
              private offerService: OfferService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data?: OfferInterface) {
    this.offer = data;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name_offer_es: [this.offer?.name_offer_es || null, [Validators.required]],
      name_offer_en: [this.offer?.name_offer_en || null, [Validators.required]],
    });
  }

  store() {
    const data = this.form.value;

    if(this.offer) {
      data['id'] = this.offer.id;
    }

    const response = this.offer ? this.offerService.update(data) : this.offerService.store(data);

    response.subscribe(resp=>{
      const msg = `Plato ${this.offer ? 'actualizado' : 'añadido'} de forma correcta`;
      this.snackBar.open(msg, 'X');
      this.dialogRef.close();
    })
  }

}
