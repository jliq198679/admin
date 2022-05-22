import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialOfferEditorComponent } from './special-offer-editor.component';

describe('SpecialOfferEditorComponent', () => {
  let component: SpecialOfferEditorComponent;
  let fixture: ComponentFixture<SpecialOfferEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialOfferEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialOfferEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
