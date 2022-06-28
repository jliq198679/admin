import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FrameWebIdEnum } from '../../enums';
import { ContactInterface, FrameWebGetInterface } from '../../interfaces';
import { FrameWebService } from '../../services';
declare var $: any;

@Component({
  selector: 'shop-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  headerFrameWeb: FrameWebGetInterface;
  contactFrameWeb: FrameWebGetInterface;
  ourStoryFrameWeb: FrameWebGetInterface;
  ourChefFrameWeb: FrameWebGetInterface;

  constructor(public translate: TranslateService,
              public translateService: TranslateService,
              private frameWebService: FrameWebService) { }

  ngOnInit(): void {
    this.loadFrameWebList();

    $('document').ready(function() {
      setTimeout(() => {
        $('#exampleModal').modal('show')
      }, 2000);
    });
  }

  switchLang(lang: 'es' | 'en') {
    this.translate.use(lang);
  }

  loadFrameWebList() {
    this.frameWebService.get().subscribe((frameWebList: FrameWebGetInterface[])=>{
      this.headerFrameWeb = frameWebList.find(item=>item.frame_name === FrameWebIdEnum.HEADER);
      this.contactFrameWeb = frameWebList.find(item=>item.frame_name === FrameWebIdEnum.CONTACT);
      this.ourStoryFrameWeb = frameWebList.find(item=>item.frame_name === FrameWebIdEnum.OUR_STORY);
      this.ourChefFrameWeb = frameWebList.find(item=>item.frame_name === FrameWebIdEnum.CHEF);
    })
  }

  get reservationPhone() {
    return this.contactData?.reservation_phone || this.loadText;
  }

  get contactData(): ContactInterface {
    return this.contactFrameWeb?.payload_frame as ContactInterface;
  }

  get loadText() {
    return this.lang === 'es' ? 'Cargando...' : 'Loading...'
  }

  get lang() {
    return this.translateService.currentLang;
  }

  showMenuModal() {
    alert("YESS")
  }
}
