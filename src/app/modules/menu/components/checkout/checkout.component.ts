import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ConfirmDialogService } from './../../../admin/services/confirm-dialog';

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
              private confirmDialogService: ConfirmDialogService,
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

 async Cancelar(){
   const msg = "¿Desea eliminar el pedido seleccionado?";
    const confirm = await this.confirmDialogService.confirmDialog(msg);

    if(confirm) {
      this.dialogRef.close(true);
    }
  }

 

}
