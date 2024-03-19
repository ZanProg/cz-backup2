import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadsComponent } from './file-uploads/file-uploads.component';



@NgModule({
  declarations: [
    FileUploadsComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FileUploadsComponent,
  ]
})
export class FileUploadModule { }
