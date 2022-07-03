import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}

@Component({
  selector: 'shared-star-rate',
  templateUrl: './star-rate.component.html',
  styleUrls: ['./star-rate.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SharedStarRateComponent implements OnInit {

  @Input('rating') rating: number = 5;
  @Input('starCount') starCount: number = 5;
  @Input('color') color: string = 'accent';
  @Output() ratingUpdated = new EventEmitter();

  snackBarDuration: number = 2000;
  ratingArr = [];

  constructor(public translateService: TranslateService) { }

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating:number) {
    this.ratingUpdated.emit(rating.toString());
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  ratingEval(i: number) {

    let evalString = this.lang === 'es' ? 'Excelente' : 'Excelent';

    switch(i) {
      case 0: evalString = this.lang === 'es' ? 'Malo' : 'Bad'; break;
      case 1: evalString = this.lang === 'es' ? 'Regular' : 'Regular'; break;
      case 2: evalString = this.lang === 'es' ? 'Bueno' : 'Good'; break;
      case 3: evalString = this.lang === 'es' ? 'Muy bueno' : 'Very Good'; break;
    }

    return evalString;
  }

  get lang() {
    return this.translateService.currentLang;
  }

}
