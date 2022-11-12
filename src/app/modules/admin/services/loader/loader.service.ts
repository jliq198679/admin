import { Injectable } from "@angular/core";
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AdminLoaderOverlayComponent } from "../../components";
import { finalize, share } from 'rxjs/operators';
import { NEVER, defer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminLoaderService {

  private overlayRef: OverlayRef = undefined;

  public readonly spinner$ = defer(() => {
    this.show();
    return NEVER.pipe(
      finalize(() => {
        this.hide();
      })
    );
  }).pipe(share());

  constructor(private overlay: Overlay) {

  }

  public show(): void {
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        hasBackdrop: true,
      });
      this.overlayRef.attach(new ComponentPortal(AdminLoaderOverlayComponent));
    });
  }

  public hide(): void {
    this.overlayRef.detach();
    this.overlayRef = undefined;
  }

}
