import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
    console.log(this.selectionCar,"seleccion del carro")
  }

  save() {

  }

}
