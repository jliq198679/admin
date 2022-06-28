import { defaultImg } from './../../tools/default.tool';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CardInterface, FrameWebGetInterface } from '../../interfaces';


@Component({
  selector: 'shop-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.scss']
})
export class ChefComponent implements OnInit {

  @Input() frameWeb: FrameWebGetInterface;

  constructor(public translateService: TranslateService) { }

  ngOnInit(): void {

  }

  get name(): string {
    return this.ourChefData ? (this.lang === 'es' ? this.ourChefData.name_es : this.ourChefData.name_en) : this.loadText;
  }

  get description(): string {
    return this.ourChefData ? (this.lang === 'es' ? this.ourChefData.description_es : this.ourChefData.description_en) : this.loadText;
  }

  get image(): string {
    return this.ourChefData?.image || defaultImg;
  }

  get lang() {
    return this.translateService.currentLang;
  }

  get loadText() {
    return this.lang === 'es' ? 'Cargando...' : 'Loading...'
  }

  get ourChefData(): CardInterface {
    return this.frameWeb?.payload_frame as CardInterface;
  }

}
