import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { GuarniWithGroupGuarniInterface} from './../../../admin/interfaces/guarni-with-group-guarni.interface';
import { GuarniInterface } from './../../../admin/interfaces';
import { SharedDailyOfferService } from './../../../shared/services';
import { MatInput } from '@angular/material/input';


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
  arrGuarniSelected=[];

  constructor(public dialogRef: MatDialogRef<AddGuarniCarComponent>,
              private dailyOfferService: SharedDailyOfferService,
   
              @Inject(MAT_DIALOG_DATA) public data?: typeGuarniWithGuarniInterface[]) {
                this.datadialog = data;
               }

  ngOnInit(): void {
    console.log(this.datadialog)
    for (let value of this.datadialog) {
      this.dailyOfferService.getGuarni(value.id).subscribe(response=>{
        value.arrGuarni = response.data;
        for (let i of value.arrGuarni){i.cant_selected = 1}
      })
    }
       
  }
  
  msg(event, guarni){
    console.log(event);
    if(event.checked==true){this.arrGuarniSelected.push(guarni)}
    else{this.arrGuarniSelected = this.arrGuarniSelected.filter(item => item.id != guarni.id);}
    console.log(this.arrGuarniSelected);

  }

  confirmarGuarni(){
    this.dialogRef.close(this.arrGuarniSelected);
  }



}


