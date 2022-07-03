import { DailyOfferInterface } from './../../../admin/interfaces/daily-offer/daily-offer.interface';
import { DailyOfferService } from './../../services/daily-offer/daily-offer.service';
import { AdminMenuCartComponent } from './../menu-cart/menu-cart.component';
import { MatDialog } from '@angular/material/dialog';
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

  categories: any[]
  subcategories: any[][] = []
  dailyOffers: DailyOfferInterface[][][] = [];


  headerFrameWeb: FrameWebGetInterface;
  contactFrameWeb: FrameWebGetInterface;
  ourStoryFrameWeb: FrameWebGetInterface;
  ourChefFrameWeb: FrameWebGetInterface;

  constructor(public translate: TranslateService,
              public translateService: TranslateService,
              private dailyOfferService: DailyOfferService,
              public dialog: MatDialog,
              private frameWebService: FrameWebService) { }

  ngOnInit(): void {
    this.loadFrameWebList();
/*
    $('document').ready(function() {
      setTimeout(() => {
        $('#exampleModal').modal('show')
      }, 2000);
    });*/
    this.showMenu()
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

  showModal(data?: any/*OfferInterface*/) {
    const dialogRef = this.dialog.open(AdminMenuCartComponent, {
      width: '100%',
      data: data
    });

    dialogRef.afterClosed().subscribe(() => {

    });
  }

  async showMenu() {
    this.dailyOfferService.getCategory().subscribe(categories=>{
      this.categories = categories;

      for(let category of categories) {
        this.dailyOfferService.getSubCategory(category.id).subscribe(subcategories=>{
          category['subcategories'] = subcategories;

          for(let subcategory of subcategories) {
            this.dailyOfferService.getSubCategoryOffers(subcategory.id).subscribe(dailyOffers=>{
              subcategory['dailyOffers'] = dailyOffers.data;
            })
          }
        })
      }

      if(categories.length > 0) {
        this.showModal(categories)
      }
    })
  }

}
