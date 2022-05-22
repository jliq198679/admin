import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyOfferEditorComponent } from './daily-offer-editor.component';

describe('DailyOfferEditorComponent', () => {
  let component: DailyOfferEditorComponent;
  let fixture: ComponentFixture<DailyOfferEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyOfferEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyOfferEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
