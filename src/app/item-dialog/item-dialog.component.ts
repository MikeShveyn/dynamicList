import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {SignalsService} from "../services/signals.service";
import {FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import {Data} from "../data.model";
@Component({
  selector: 'app-item-dialog',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './item-dialog.component.html',
  styleUrl: './item-dialog.component.css'
})
export class ItemDialogComponent {
  itemForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: Data, index: number },
    private signalService: SignalsService,
    private fb: FormBuilder,
  ) {
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      color: ['#000000', Validators.required],
      createdBy: ['', Validators.required],
      createdDate: ['', Validators.required],
      lastUpdate: ['', Validators.required]
    });

    if (this.data) {
      this.itemForm.patchValue(this.data.item);
    } else {
      const currentDate = new Date();
      this.itemForm.patchValue({
        createdDate: currentDate,
        lastUpdate: currentDate
      });
    }
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const formValue = this.itemForm.value;
      if (this.data) {
        this.signalService.updateItem(this.data.index, formValue);
      } else {
        this.signalService.addItem(formValue);
      }
      this.dialogRef.close(formValue);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
