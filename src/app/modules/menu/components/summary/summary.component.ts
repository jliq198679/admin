import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'menu-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class MenuSummaryComponent implements OnInit {

  @Input() category;
  @Output() selected = new EventEmitter<void>();

  constructor(public translateService: TranslateService) { }

  ngOnInit(): void {
  }

  onCategorySelect() {
    this.selected.emit();
  }

  name_group(category): string {
    return (this.lang === 'es' ? category.name_group_es : category.name_group_en);
  }

  get lang() {
    return this.translateService.currentLang;
  }

  public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }

}
