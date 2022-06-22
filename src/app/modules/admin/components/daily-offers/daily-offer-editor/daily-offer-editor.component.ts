import { GroupOfferWithOffersInterface } from './../../../interfaces';
import { OfferService, OfferGroupService, DailyOfferService } from './../../../services';
import { defaultImg } from './../../../tools/default.tool';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-daily-offer-editor',
  templateUrl: './daily-offer-editor.component.html',
  styleUrls: ['./daily-offer-editor.component.scss']
})
export class DailyOfferEditorComponent implements OnInit {

  form: FormGroup;
  offer/*: OfferInterface*/;
  mainOfferGroups: GroupOfferWithOffersInterface[] = [];

  offerImage: string | ArrayBuffer = defaultImg;
  selectedFiles

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(public dialogRef: MatDialogRef<DailyOfferEditorComponent>,
              private offerService: OfferService,
              private dailyOffer: DailyOfferService,
              private snackBar: MatSnackBar,
              private offerGroupService: OfferGroupService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data/*?: OfferInterface*/) {
    this.offer = data;
  }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.loadData()
  }

  loadData() {
    this.offerGroupService.getGroupsWithOffers().subscribe(
      response=>{
        this.prepareOfferGroupList(response.data)
      }
    );
  }

  prepareOfferGroupList(groupOffers: GroupOfferWithOffersInterface[]) {
    let mainOfferGroups = {};

    for(let go of groupOffers) {
      if(go.category_id === null){
        mainOfferGroups[go.id] = go;
      }
      else {
        mainOfferGroups[go.category_id].offers.concat(go['offers'])
      }
    }

    this.mainOfferGroups = Object.keys(mainOfferGroups).map(key=>{ return mainOfferGroups[key] });
    console.log(this.mainOfferGroups)
    for(let mainOffer of this.mainOfferGroups) {
      for(let offer of mainOffer.offers) {
        this.form.addControl(offer.id.toString(), new FormControl({}));
      }
    }
  }


  getServerData(event) {
    // this.loadData(event.previousPageIndex < event.pageIndex ? event.pageIndex + 1 : event.pageIndex - 1, this.pageSize);
  }

  save() {

    let offers = Object.keys(this.form.value).map(
      key=>{
        return {
          offer_id: Number(key),
          count_offer: typeof this.form.value[key] === 'object' ? 0 : this.form.value[key]
        }
      }
    );

    offers = offers.filter(item=>item.count_offer > 0);

    console.log(offers)

    if(offers.length > 0) {
      this.serverRequest(offers);
    }
  }

  serverRequest(data) {
    this.dailyOffer.store(data).subscribe(resp=>{
      const msg = `Oferta diaria almacenada de forma correcta`;
      this.snackBar.open(msg, 'X');
      this.dialogRef.close();
    })
  }

}
