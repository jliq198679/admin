import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'menu-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class MenuCategoryComponent implements OnInit {

  @Input() category;

  constructor(public translateService: TranslateService) { }

  ngOnInit(): void {
  }

  name_group(category): string {
    return (this.lang === 'es' ? category?.name_group_es : category?.name_group_en);
  }

  get lang() {
    return this.translateService.currentLang;
  }

}
