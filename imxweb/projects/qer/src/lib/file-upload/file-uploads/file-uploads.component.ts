import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileSelectorService, SnackBarService } from 'qbm';

@Component({
  selector: 'ccc-file-uploads',
  templateUrl: './file-uploads.component.html',
  styleUrls: ['./file-uploads.component.scss']
})
export class FileUploadsComponent implements OnInit {
  fileName: string = "";
  selectedFile: File = null;
  fileSelector: FileSelectorService;
  constructor(
    private http: HttpClient,
    private readonly snackbar: SnackBarService,
    ) { }

  ngOnInit(): void {
  }

  selectFileName(value){
    this.fileName = value;
  }
  
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.fileName);

    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'multipart/form-data' // Ensure this header is set
    //   })
    // };
    

    this.http.post('https://idmweb1wt2.rb.cz/api/upload', fd)
      .subscribe(res => {
        console.log(res);
        this.snackbar.open({ key: '#LDS#The file has been successfully uploaded.' });
      });
  }
}