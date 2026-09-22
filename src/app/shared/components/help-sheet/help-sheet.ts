import { Component, inject } from '@angular/core';
import { MatBottomSheetRef, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-help-sheet',
  templateUrl: 'help-sheet.html',
  imports: [MatListModule, MatBottomSheetModule],
})
export class HelpSheetComponent {
  private _bottomSheetRef = inject<MatBottomSheetRef<HelpSheetComponent>>(MatBottomSheetRef);

  openLink(option: number): void {
    this._bottomSheetRef.dismiss();
  }
}
