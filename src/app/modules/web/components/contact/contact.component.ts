import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContactInterface, FrameWebGetInterface } from '../../interfaces';

@Component({
  selector: 'shop-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() frameWeb: FrameWebGetInterface;

  constructor(public translateService: TranslateService) { }

  ngOnInit(): void {
  }

  get reservationPhone(): string {
    return this.contactData ? this.contactData.reservation_phone : this.loadText;
  }

  get addressLine1(): string {
    return this.contactData ? (this.lang === 'es' ? this.contactData.address_line1_es : this.contactData.address_line1_en) : this.loadText;
  }

  get addressLine2(): string {
    return this.contactData ? (this.lang === 'es' ? this.contactData.address_line2_es : this.contactData.address_line2_en) : this.loadText;
  }

  get openingHoursLine1(): string {
    return this.contactData ? (this.lang === 'es' ? this.contactData.opening_hours_line1_es : this.contactData.opening_hours_line1_en) : this.loadText;
  }

  get openingHoursLine2(): string {
    return this.contactData ? (this.lang === 'es' ? this.contactData.opening_hours_line2_es : this.contactData.opening_hours_line2_en) : this.loadText;
  }
  
  get lang() {
    return this.translateService.currentLang;
  }

  get loadText() {
    return this.lang === 'es' ? 'Cargando...' : 'Loading...'
  }

  get contactData(): ContactInterface {
    return this.frameWeb?.payload_frame as ContactInterface;
  }

}
