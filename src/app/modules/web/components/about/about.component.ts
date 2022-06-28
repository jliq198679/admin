import { defaultImg } from './../../tools';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CardInterface, FrameWebGetInterface } from '../../interfaces';

@Component({
  selector: 'shop-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @Input() frameWeb: FrameWebGetInterface;

  constructor(public translateService: TranslateService) { }

  ngOnInit(): void {
  }

  get name(): string {
    return this.ourStoryData ? (this.lang === 'es' ? this.ourStoryData.name_es : this.ourStoryData.name_en) : this.loadText;
  }

  get description(): string {
    return this.ourStoryData ? (this.lang === 'es' ? this.ourStoryData.description_es : this.ourStoryData.description_en) : this.loadText;
  }

  get image(): string {
    return this.ourStoryData?.image || defaultImg;
  }

  get lang() {
    return this.translateService.currentLang;
  }

  get loadText() {
    return this.lang === 'es' ? 'Cargando...' : 'Loading...'
  }

  get ourStoryData(): CardInterface {
    return this.frameWeb?.payload_frame as CardInterface;
  }

}
