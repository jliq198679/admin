import { MenuOfferItemInterface } from './../../../shared/interfaces';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'menu-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class MenuCategoryComponent implements OnInit {

  @Input() category;
  @Output() selected = new EventEmitter<MenuOfferItemInterface>()

  constructor(public translateService: TranslateService) { }

  ngOnInit(): void {
  }

  onAddOfferToCard(selectedOffer: MenuOfferItemInterface) {
    this.selected.emit(selectedOffer);
  }

  name_group(category): string {
    return (this.lang === 'es' ? category?.name_group_es : category?.name_group_en);
  }

  get lang() {
    return this.translateService.currentLang;
  }

}
