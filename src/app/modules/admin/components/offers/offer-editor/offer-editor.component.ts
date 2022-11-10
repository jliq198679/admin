import { OfferWithGroupOffersInterface } from './../../../interfaces/offer/offer-with-group-offers.interface';
import { GroupOfferInterface } from './../../../interfaces/group-offer/group-offer.interface';
import { OfferGroupService } from './../../../services/group-offer/offer-group.service';
import { UploadService } from './../../../services/upload/upload.service';
import { defaultImg } from './../../../tools/default.tool';
import { OfferService } from './../../../services/offer';
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
  offer: OfferWithGroupOffersInterface;
  mainOfferGroups: GroupOfferInterface[];
  subOfferGroups: GroupOfferInterface[] = [];

  offerImage: string | ArrayBuffer = defaultImg;
  selectedFiles

  constructor(public dialogRef: MatDialogRef<OfferEditorComponent>,
              private offerService: OfferService,
              private snackBar: MatSnackBar,
              private offerGroupService: OfferGroupService,
              private uploadService: UploadService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data?: OfferWithGroupOffersInterface) {
    this.offer = data;
  }

  ngOnInit(): void {
    const main_group_offer_id = this.offer?.group_offer?.category_id || this.offer?.group_offer_id || null;

    this.form = this.fb.group({
      name_offer_es: [this.offer?.name_offer_es || null, [Validators.required]],
      name_offer_en: [this.offer?.name_offer_en || null, [Validators.required]],
      description_offer_es: [this.offer?.description_offer_es || null, [Validators.required]],
      description_offer_en: [this.offer?.description_offer_en || null, [Validators.required]],
      price_cup: [this.offer?.price_cup || null, [Validators.required]],
     // price_usd: [this.offer?.price_usd || null, [Validators.required]],
      main_group_offer_id: [ main_group_offer_id, [Validators.required]],
      group_offer_id: [this.offer?.group_offer_id || null],
      url_imagen: [null]
    });

    if(this.offer?.url_imagen) {
      this.offerImage = this.offer.url_imagen;
    }

    this.offerGroupService.get().subscribe(resp=>{
      this.mainOfferGroups = resp.data;
    })

    if(this.offer && main_group_offer_id) {
      this.loadSubcategories(main_group_offer_id.toString())
    }

    this.form.controls['main_group_offer_id'].valueChanges.subscribe(id=>{
      this.loadSubcategories(id)
    })
  }

  loadSubcategories(id: string) {
    this.offerGroupService.getSubcategories(id).subscribe(subCatResp=>{
      this.subOfferGroups = subCatResp.data;
    })
  }

  save() {
    const data = this.form.value;

    if(this.offer) {
      data['id'] = this.offer.id;

      if(data.url_imagen === null) {
        delete data.url_imagen
      }
    }

    if(!data.group_offer_id) {
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
    }
  }

  selectFile(event) {
    const fileReader = new FileReader();
    this.selectedFiles = event.target.files;

    fileReader.onload = () => {
      return this.offerImage = fileReader.result;
    };

    fileReader.readAsDataURL(this.selectedFiles[0]);
  }

  serverRequest(data) {
    const response = this.offer ? this.offerService.update(data) : this.offerService.store(data);

    response.subscribe(resp=>{
      const msg = `Plato ${this.offer ? 'actualizado' : 'añadido'} de forma correcta`;
      this.snackBar.open(msg, 'X');
      this.dialogRef.close();
    })
  }

  get offerImageUrl(): string {
    return this.offerImage !== 'null' ? this.offerImage as string : defaultImg;
  }

  compareWithFunc = (a: any, b: any) => a == b;
}
