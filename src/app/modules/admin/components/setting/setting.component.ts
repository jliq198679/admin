import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private settingService: SettingService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      exchange_rate: [null, [Validators.required]],
    });

    this.settingService.get().subscribe(setting=>{
      this.form.get('exchange_rate').setValue(setting.exchange_rate);
    })
  }

  update() {
    this.settingService.update(this.form.value).subscribe(resp=>{
      const msg = `Configuración actualizada de forma correcta`;
      this.snackBar.open(msg, 'X');
    })
  }

}
