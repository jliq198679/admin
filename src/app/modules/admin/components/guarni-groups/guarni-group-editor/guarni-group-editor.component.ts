import { GuarniGroupService } from './../../../services';
//import { GroupOfferInterface } from './../../../interfaces';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GroupGuarniInterface } from './../guarni-group-list/guarni-group-list.component';

@Component({
  selector: 'app-guarni-group-editor',
  templateUrl: './guarni-group-editor.component.html',
  styleUrls: ['./guarni-group-editor.component.scss']
})
export class GuarniGroupEditorComponent implements OnInit {

  form: FormGroup;
  parentGroupGuarni: GroupGuarniInterface;
  groupGuarni: GroupGuarniInterface;

  constructor(public dialogRef: MatDialogRef<GuarniGroupEditorComponent>,
              private garniGroupService: GuarniGroupService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data?: any) {
    this.parentGroupGuarni = data.parent;
    this.groupGuarni = data.category;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name_side_dish_es	: [this.groupGuarni?.name_side_dish_es || null, [Validators.required]],
      name_side_dish_en	: [this.groupGuarni?.name_side_dish_en || null, [Validators.required]]
    });
  }

  store() {
    const data = {
      ...this.form.value,
      id: this.groupGuarni?.id || this.parentGroupGuarni?.id || null
    };
    
    if(this.groupGuarni) {
      data['id'] = this.groupGuarni.id;
    }
    
    const response = this.groupGuarni ? this.garniGroupService.update(data) : this.garniGroupService.store(data);

    response.subscribe(resp=>{
      const msg = `${this.parentGroupGuarni ? 'Subcategoría' : 'Categoría'} de guarnicion ${this.groupGuarni ? 'actualizada' : 'añadida'} de forma correcta`;
      this.snackBar.open(msg, 'X');
      this.dialogRef.close();
    })
  }

  get categoryText() {
    return this.parentGroupGuarni ? 'subcategoría' : 'categoría';
  }

}
