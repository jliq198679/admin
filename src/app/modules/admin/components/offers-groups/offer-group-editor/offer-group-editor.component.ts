import { OfferGroupService } from './../../../services';
import { GroupOfferInterface } from './../../../interfaces';
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
  parentGroupOffer: GroupOfferInterface;
  groupOffer: GroupOfferInterface;

  constructor(public dialogRef: MatDialogRef<OfferGroupEditorComponent>,
              private groupOfferService: OfferGroupService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data?: any) {
    this.parentGroupOffer = data.parent;
    this.groupOffer = data.category;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name_group_es: [this.groupOffer?.name_group_es || null, [Validators.required]],
      name_group_en: [this.groupOffer?.name_group_en || null, [Validators.required]]
    });
  }

  store() {
    const data = {
      ...this.form.value,
      category_id: this.groupOffer?.category_id || this.parentGroupOffer?.id || null
    };

    if(this.groupOffer) {
      data['id'] = this.groupOffer.id;
    }

    const response = this.groupOffer ? this.groupOfferService.update(data) : this.groupOfferService.store(data);

    response.subscribe(resp=>{
      const msg = `${this.parentGroupOffer ? 'Subcategoría' : 'Categoría'} de oferta ${this.groupOffer ? 'actualizada' : 'añadida'} de forma correcta`;
      this.snackBar.open(msg, 'X');
      this.dialogRef.close();
    })
  }

  get categoryText() {
    return this.parentGroupOffer ? 'subcategoría' : 'categoría';
  }

}
