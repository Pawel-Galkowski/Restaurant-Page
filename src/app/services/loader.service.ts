import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { defer, NEVER } from 'rxjs';
import { finalize, share } from 'rxjs/operators';
import { LoaderComponent } from '../components/loader/loader.component';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private overlayRef?: OverlayRef;

  constructor(private overlay: Overlay) {}

  show(): void {
    // Hack avoiding `ExpressionChangedAfterItHasBeenCheckedError` error
    Promise.resolve(null).then(() => {
      if (!this.overlayRef) {
        this.overlayRef = this.overlay.create({
          hasBackdrop: true,
          positionStrategy: this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically(),
        });
        this.overlayRef.attach(new ComponentPortal(LoaderComponent));
      }
    });
  }

  public readonly spinner$ = defer(() => {
    this.show();
    return NEVER.pipe(finalize(() => this.hide()));
  }).pipe(share());

  hide(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = undefined;
    }
  }
}
