import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmiComponent } from './emi/emi.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EmiComponent],
  exports: [EmiComponent]
})
export class ExportModule { }
