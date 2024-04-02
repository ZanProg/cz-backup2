import { HttpClient, HttpClientModule, HttpClientXsrfModule, HttpHeaders } from '@angular/common/http';
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

    let url = window.location.hostname;

    const fd = new FormData();
    fd.append('file', this.selectedFile, this.fileName);


    const xsrfToken = document.cookie
			.split('; ')
			.find(cookie => cookie.startsWith('XSRF-TOKEN='))
			.split('=')[1];

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
				'X-XSRF-TOKEN': xsrfToken
      })
    };

    // this.http.post('https://localhost:8182/portal/uniteplugin/upload', fd, options)
    this.http.post(`https://${url}/ApiServer/portal/uniteplugin/upload`, fd, options)
      .subscribe(res => {
        console.log(res);
        this.snackbar.open({ key: '#LDS#The file has been successfully uploaded.' });
      },
      error =>{
        console.error(error);
        this.snackbar.open({ key: '#LDS#An error occurred while uploading the file.' });
      });
  }
}