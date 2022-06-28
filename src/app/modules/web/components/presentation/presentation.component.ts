import { defaultImg } from './../../tools';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FrameWebGetInterface, HeaderInterface } from '../../interfaces';

@Component({
  selector: 'shop-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

  @Input() frameWeb: FrameWebGetInterface;
  @Input() reservationPhone: string;

  constructor(public translateService: TranslateService) { }

  ngOnInit(): void {
  }

  get name(): string {
    return this.headerData ? this.headerData.name : this.loadText;
  }

  get image(): string {
    return this.headerData?.image || defaultImg;
  }

  get lang() {
    return this.translateService.currentLang;
  }

  get loadText() {
    return this.lang === 'es' ? 'Cargando...' : 'Loading...'
  }

  get headerData(): HeaderInterface {
    return this.frameWeb?.payload_frame as HeaderInterface;
  }
}
