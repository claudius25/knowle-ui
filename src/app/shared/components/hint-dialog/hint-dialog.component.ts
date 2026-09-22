import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UiTextService } from '../../services/ui-text.service';

export interface HintDialogData {
  hint: string;
}

@Component({
  selector: 'app-hint-dialog',
  standalone: true,
  imports: [MatDialogModule, MatIconModule],
  templateUrl: './hint-dialog.component.html',
  styleUrl: './hint-dialog.component.css',
})
export class HintDialogComponent {
  protected readonly data = inject<HintDialogData>(MAT_DIALOG_DATA);
  protected readonly uiText = inject(UiTextService);

  private readonly dialogRef = inject(MatDialogRef<HintDialogComponent>);

  protected close(): void {
    this.dialogRef.close();
  }
}
