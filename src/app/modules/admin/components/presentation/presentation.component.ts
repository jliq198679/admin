import { defaultImg } from './../../tools';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PayloadWebService, UploadService } from './../../services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

  presentationImage: string | ArrayBuffer = defaultImg;
  form: FormGroup;
  selectedFiles

  constructor(
    private fb: FormBuilder,
    private payloadWebService: PayloadWebService,
    private snackBar: MatSnackBar,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      image: [null],
    });

    this.payloadWebService.get('header').subscribe(resp=>{
     const data = resp.payload_frame;
      this.form.get('name').setValue(data.name);

      if(data.image) {
        this.presentationImage = data.image;
      }
    })

  }

  selectFile(event) {
    const fileReader = new FileReader();
    this.selectedFiles = event.target.files;

    fileReader.onload = () => {
      return this.presentationImage = fileReader.result;
    };

    fileReader.readAsDataURL(this.selectedFiles[0]);
  }

  update() {
    let data = {
      name: this.form.value.name
    };

    if(this.selectedFiles) {
      this.uploadService.upload(this.selectedFiles[0]).subscribe(imageUrl=>{
        data['image'] = imageUrl;
        this.updateRequest(data);
      })
    }
    else {
      this.updateRequest(data);
    }
  }

  updateRequest(data) {
    this.payloadWebService.update('header', data).subscribe(resp=>{
      const msg = `Presentación actualizada de forma correcta`;
      this.snackBar.open(msg, 'X');
    })
  }
}
