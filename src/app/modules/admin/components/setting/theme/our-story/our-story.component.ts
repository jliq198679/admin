import { FrameWebIdEnum } from './../../../../enums/frame-web-id.enum';
import { UploadService } from './../../../../services/upload/upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PayloadWebService } from './../../../../services';
import { defaultImg } from './../../../../tools/default.tool';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-setting-our-story',
  templateUrl: './our-story.component.html',
  styleUrls: ['./our-story.component.scss']
})
export class AdminSettingOurStoryComponent implements OnInit {

  storyImage: string | ArrayBuffer = defaultImg;
  form: FormGroup;
  selectedFiles
  frameWeb: FrameWebIdEnum = FrameWebIdEnum.OUR_STORY;

  constructor(
    private fb: FormBuilder,
    private payloadWebService: PayloadWebService,
    private snackBar: MatSnackBar,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      description_es: [null, [Validators.required]],
      description_en: [null, [Validators.required]],
      image: [null],
    });

    this.payloadWebService.get(this.frameWeb).subscribe(resp=>{
     const data = resp.payload_frame;
      this.form.get('description_es').setValue(data.description_es);
      this.form.get('description_en').setValue(data.description_en);

      if(data.image) {
        this.storyImage = data.image;
      }
    })

  }

  selectFile(event) {
    const fileReader = new FileReader();
    this.selectedFiles = event.target.files;

    fileReader.onload = () => {
      return this.storyImage = fileReader.result;
    };

    fileReader.readAsDataURL(this.selectedFiles[0]);
  }

  update() {
    let data = {
      description_es: this.form.value.description_es,
      description_en: this.form.value.description_en
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
    this.payloadWebService.update(this.frameWeb, data).subscribe(resp=>{
      const msg = `Historia actualizada de forma correcta`;
      this.snackBar.open(msg, 'X');
    })
  }
}
