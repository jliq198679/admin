import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'menu-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class MenuCheckoutComponent implements OnInit {

  form: FormGroup;
  smallScreen: boolean;

  isLinear = false;

  constructor(public dialogRef: MatDialogRef<MenuCheckoutComponent>,
              public translateService: TranslateService,
              private breakpointObserver: BreakpointObserver,
              @Inject(MAT_DIALOG_DATA) public selectionCar) {
      breakpointObserver.observe([
          Breakpoints.XSmall,
          Breakpoints.Small
        ]).subscribe(result => {
          this.smallScreen = result.matches;
      });
  }

  ngOnInit(): void {
    console.log(this.selectionCar)
  }

  save() {

  }

  get lang() {
    return this.translateService.currentLang;
  }

  name_offer(offer): string {
    return (this.lang === 'es' ? offer.name_offer_es : offer.name_offer_en);
  }

}
