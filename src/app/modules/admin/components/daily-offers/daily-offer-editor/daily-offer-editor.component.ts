import { GroupOfferWithOffersInterface, DailyOfferInterface } from './../../../interfaces';
import { OfferService, OfferGroupService, DailyOfferService } from './../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-daily-offer-editor',
  templateUrl: './daily-offer-editor.component.html',
  styleUrls: ['./daily-offer-editor.component.scss']
})
export class DailyOfferEditorComponent implements OnInit {

  form: FormGroup;
  dailyOffer: DailyOfferInterface;
  mainOfferGroups: GroupOfferWithOffersInterface[] = [];
  step = 0;

  constructor(public dialogRef: MatDialogRef<DailyOfferEditorComponent>,
              private offerService: OfferService,
              private dailyOfferService: DailyOfferService,
              private snackBar: MatSnackBar,
              private offerGroupService: OfferGroupService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data/*?: OfferInterface*/) {
    // this.offer = data;
  }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.loadGroupsData();

    if(this.data) {
      this.loadCurrentDailyOffers();
    }



    console.log(this.data)
  }

  loadGroupsData() {
    this.offerGroupService.getGroupsWithOffers().subscribe(
      response=>{
        this.prepareOfferGroupList(response.data)
      }
    );
  }

  loadCurrentDailyOffers() {
    this.dailyOfferService.get().subscribe(
      groups=>{
        for(let group of groups) {
          for(let offer of group.offers) {
            this.form.controls[offer.id].setValue(offer.offer_daily.count_offer);
          }
        }
      }
    );
  }

  prepareOfferGroupList(groupOffers: GroupOfferWithOffersInterface[]) {
    let mainOfferGroups = {};
    let mainGroupCounter = 0;

    for(let go of groupOffers) {

      if(this.data) {
        const index = go.offers.findIndex(item=>item.id === this.data.id);

        if(index !== -1) {
          this.setStep(mainGroupCounter);
          //this.form.controls[this.data.id]. TODO: Poner el foco en el plato correspondiente
        }
      }

      if(go.category_id === null){
        mainOfferGroups[go.id] = go;
        mainGroupCounter++;
      }
      else {
        mainOfferGroups[go.category_id].offers.concat(go['offers'])
      }
    }

    this.mainOfferGroups = Object.keys(mainOfferGroups).map(key=>{ return mainOfferGroups[key] });
    console.log(this.mainOfferGroups)
    for(let mainOffer of this.mainOfferGroups) {
      for(let offer of mainOffer.offers) {
        this.form.addControl(offer.id.toString(), new FormControl(null));
      }
    }
  }

  save() {

    let offers = Object.keys(this.form.value).map(
      key=>{
        return {
          offer_id: Number(key),
          count_offer: typeof this.form.value[key] === null ? 0 : this.form.value[key]
        }
      }
    );

    offers = offers.filter(item=>item.count_offer > 0);

    if(offers.length > 0) {
      this.serverRequest(offers);
    }
  }

  serverRequest(data) {
    this.dailyOfferService.store(data).subscribe(resp=>{
      const msg = `Oferta diaria almacenada de forma correcta`;
      this.snackBar.open(msg, 'X');
      this.dialogRef.close();
    })
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
