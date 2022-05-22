import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferGroupEditorComponent } from './offer-group-editor.component';

describe('OfferGroupEditorComponent', () => {
  let component: OfferGroupEditorComponent;
  let fixture: ComponentFixture<OfferGroupEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferGroupEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferGroupEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
