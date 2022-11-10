import { GuarniWithGroupGuarniInterface } from './../../../interfaces/guarni-with-group-guarni.interface';
import { GroupGuarniInterface } from './../../../interfaces/group-guarni.Interface';
import { GuarniGroupService } from './../../../services/group-guarni/guarni-group.service';
import { GuarniService } from './../../../services/guarni/guarni.service';

import { UploadService } from './../../../services/upload/upload.service';
import { defaultImg } from './../../../tools/default.tool';

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-guarni-editor',
  templateUrl: './guarni-editor.component.html',
  styleUrls: ['./guarni-editor.component.scss']
})
export class GuarniEditorComponent implements OnInit {

  form: FormGroup;
  guarni: GuarniWithGroupGuarniInterface;
  guarniGroup: GroupGuarniInterface[];

 /* mainOfferGroups: GroupOfferInterface[];
  subOfferGroups: GroupOfferInterface[] = [];
  offerImage: string | ArrayBuffer = defaultImg;*/

  //guarniImage: string | ArrayBuffer = defaultImg;
  selectedFiles

  constructor(public dialogRef: MatDialogRef<GuarniEditorComponent>,
              private guarniService: GuarniService,
              private snackBar: MatSnackBar,
              private guarniGroupService: GuarniGroupService,
              private uploadService: UploadService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data?: GuarniWithGroupGuarniInterface) {
    this.guarni = data;
  //  console.log(data);
 //   console.log(this.guarni);
  }

   ngOnInit(): void {
    const type_side_dish_id = this.guarni?.type_side_dish.id || null;

    this.form = this.fb.group({
      name_side_dish_es: [this.guarni?.name_side_dish_es || null, [Validators.required]],
      name_side_dish_en: [this.guarni?.name_side_dish_en || null, [Validators.required]],
      price_cup: [this.guarni?.price_cup || null, [Validators.required]],
     // price_usd: [this.guarni?.price_usd || null, [Validators.required]],
      type_side_dish_id: [ type_side_dish_id, [Validators.required]],
      url_imagen: [null]
    });

   /* if(this.offer?.url_imagen) {
      this.offerImage = this.offer.url_imagen;
    } */

    this.guarniGroupService.get().subscribe(resp=>{
      this.guarniGroup = resp.data;
    })

   /* if(this.guarni && group_guarni_id) {
      this.loadSubcategories(main_group_offer_id.toString())
    }

    this.form.controls['group_guarni_id'].valueChanges.subscribe(id=>{
      this.loadSubcategories(id)
    })  */
   }

  /* loadSubcategories(id: string) {
    this.offerGroupService.getSubcategories(id).subscribe(subCatResp=>{
      this.subOfferGroups = subCatResp.data;
    })
   }*/

  save() {
    const data = this.form.value;

    if(this.guarni) {
      data['id'] = this.guarni.id;
      

     /* if(data.url_imagen === null) {
        delete data.url_imagen
      }*/
    }
    this.serverRequest(data);
    /*if(!data.group_offer_id) {
      data.group_offer_id = data.main_group_offer_id;
    }

    if(this.selectedFiles) {
      this.uploadService.upload(this.selectedFiles[0]).subscribe(imageUrl=>{
        data['url_imagen'] = imageUrl;
        this.serverRequest(data);
      })
    }
    else {
      this.serverRequest(data);
    }*/
  }

 /* selectFile(event) {
    const fileReader = new FileReader();
    this.selectedFiles = event.target.files;

    fileReader.onload = () => {
      return this.offerImage = fileReader.result;
    };

    fileReader.readAsDataURL(this.selectedFiles[0]);
  }*/

  serverRequest(data) {
    const response = this.guarni ? this.guarniService.update(data) : this.guarniService.store(data);

    response.subscribe(resp=>{
      const msg = `Guarnición ${this.guarni ? 'actualizada' : 'añadida'} de forma correcta`;
      this.snackBar.open(msg, 'X');
      this.dialogRef.close();
    })
  }

 /* get offerImageUrl(): string {
    return this.offerImage !== 'null' ? this.offerImage as string : defaultImg;
  }*/

  compareWithFunc = (a: any, b: any) => a == b;
}
