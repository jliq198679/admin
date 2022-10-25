import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { GuarniWithGroupGuarniInterface} from './../../../admin/interfaces/guarni-with-group-guarni.interface';
import { GuarniInterface } from './../../../admin/interfaces';
import { SharedDailyOfferService } from './../../../shared/services';

export interface typeGuarniWithGuarniInterface extends GuarniInterface {
  id: number;
  name_type_side_dish_es: string;
  name_type_side_dish_en: string;
  arrGuarni: GuarniInterface[];
}

@Component({
  selector: 'app-add-guarni-car',
  templateUrl: './add-guarni-car.component.html',
  styleUrls: ['./add-guarni-car.component.scss']
})
export class AddGuarniCarComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  //datadialog: GuarniWithGroupGuarniInterface[];
  datadialog: typeGuarniWithGuarniInterface[];

  constructor(public dialogRef: MatDialogRef<AddGuarniCarComponent>,
              private dailyOfferService: SharedDailyOfferService,
   
              @Inject(MAT_DIALOG_DATA) public data?: typeGuarniWithGuarniInterface[]) {
                this.datadialog = data;
               }

  ngOnInit(): void {
    console.log(this.datadialog)
    for (let value of this.datadialog) {
      this.dailyOfferService.getGuarni(value.id).subscribe(response=>{value.arrGuarni = response.data})
    }
    console.log(this.datadialog[0].arrGuarni)
  }
  
  msg(){}

}
