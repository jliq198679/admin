import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'menu-delivery-data',
  templateUrl: './delivery-data.component.html',
  styleUrls: ['./delivery-data.component.scss']
})
export class MenuDeliveryDataComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', {validators: Validators.required}],
      telefono: ['', {validators: Validators.required}],
      municipio: ['', {validators: Validators.required}],
      direccion: ['', {validators: Validators.required}],
      fhentrega: ''
    })
  }

}
