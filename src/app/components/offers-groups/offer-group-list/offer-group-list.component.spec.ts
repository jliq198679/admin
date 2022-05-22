import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferGroupListComponent } from './offer-group-list.component';

describe('OfferGroupListComponent', () => {
  let component: OfferGroupListComponent;
  let fixture: ComponentFixture<OfferGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferGroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
