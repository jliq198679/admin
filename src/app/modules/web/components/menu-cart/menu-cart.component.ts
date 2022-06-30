import { DailyOfferInterface } from './../../../admin/interfaces/daily-offer/daily-offer.interface';
import { TranslateService } from '@ngx-translate/core';
import { DailyOfferService } from './../../services/daily-offer/daily-offer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'admin-menu-cart',
  templateUrl: './menu-cart.component.html',
  styleUrls: ['./menu-cart.component.scss']
})
export class AdminMenuCartComponent implements OnInit {

  form: FormGroup;

  step = -1;

  constructor(public dialogRef: MatDialogRef<AdminMenuCartComponent>,
              public translateService: TranslateService,
              private dailyOfferService: DailyOfferService,

              /*private offerService: OfferService,
              private offerGroupService: OfferGroupService,
              private dailyOfferService: DailyOfferService,*/
              /*private snackBar: MatSnackBar,
              private fb: FormBuilder,*/
              @Inject(MAT_DIALOG_DATA) public categories/*?: OfferInterface*/) {
    // this.offer = data;
  }

  ngOnInit(): void {

  }

  save() {

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

  name_group(category): string {
    return (this.lang === 'es' ? category.name_group_es : category.name_group_en);
  }

  get lang() {
    return this.translateService.currentLang;
  }


}
