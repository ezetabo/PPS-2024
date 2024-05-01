import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {


  myForm = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })

  firebaseSrv = inject(FirebaseService);
  utilsSrv = inject(UtilsService);


  async submit() {
    if (this.myForm.valid) {

      const loading = await this.utilsSrv.loading();
      await loading.present();

      this.firebaseSrv.singUp(this.myForm.value as User).then(async res => {
        await this.firebaseSrv.updateUser(this.myForm.value.name);
        let uid = res.user.uid
        this.myForm.controls.uid.setValue(uid);
        this.setUserInfo(uid);
      }).catch(error => {
        console.log(error);

        this.utilsSrv.toast({
          message: error.message,
          duration: 3500,
          color: 'warning',
          position: 'middle',
          icon: 'alert-circle-outline',
        });

      }).finally(() => {
        loading.dismiss();
        this.myForm.reset();
      });
    }
  }

  async setUserInfo(uid: string) {
    if (this.myForm.valid) {

      let path = `users/${uid}`;

      const loading = await this.utilsSrv.loading();
      await loading.present();

      this.firebaseSrv.setDocument(path, this.myForm.value).then(async res => {
        delete this.myForm.value.password;
        this.utilsSrv.saveinLocalStorage('user',this.myForm.value);
        this.utilsSrv.routerByUrl('/main/home')
      }).catch(error => {
        console.log(error);

        this.utilsSrv.toast({
          message: error.message,
          duration: 3500,
          color: 'warning',
          position: 'middle',
          icon: 'alert-circle-outline',
        });

      }).finally(() => {
        loading.dismiss();
        this.myForm.reset();
      });
    }
  }


}
