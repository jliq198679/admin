import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyOfferListComponent } from './daily-offer-list.component';

describe('DailyOfferListComponent', () => {
  let component: DailyOfferListComponent;
  let fixture: ComponentFixture<DailyOfferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyOfferListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
