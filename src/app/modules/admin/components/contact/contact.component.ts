import { FrameWebIdEnum } from './../../enums/frame-web-id.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PayloadWebService } from '../../services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup;
  frameWeb: FrameWebIdEnum = FrameWebIdEnum.CONTACT;

  constructor(
    private fb: FormBuilder,
    private payloadWebService: PayloadWebService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      reservation_phone: [null, [Validators.required]],
      address_line1_es: [null, [Validators.required]],
      address_line2_es: [null],
      address_line1_en: [null, [Validators.required]],
      address_line2_en: [null],
      opening_hours_line1_es: [null, [Validators.required]],
      opening_hours_line2_es: [null],
      opening_hours_line1_en: [null, [Validators.required]],
      opening_hours_line2_en: [null]
    });

    this.payloadWebService.get(this.frameWeb).subscribe(resp=>{
      const data = resp.payload_frame;
      this.form.patchValue(data);
    })

  }

  update() {
    if(this.form.valid) {
      this.updateRequest(this.form.value);
    }
  }

  updateRequest(data) {
    this.payloadWebService.update(this.frameWeb, data).subscribe(resp=>{
      const msg = `Información de contacto actualizada de forma correcta`;
      this.snackBar.open(msg, 'X');
    })
  }
}
