import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  firebaseSrv = inject(FirebaseService);
  utilsSrv = inject(UtilsService);

  ngOnInit() {
  }

  async submit() {
    if (this.myForm.valid) {

      const loading = await this.utilsSrv.loading();

      await loading.present();

      this.firebaseSrv.singIn(this.myForm.value as User).then(res => {
        this.utilsSrv.routerByUrl('/main/home')
      }).catch(error =>{
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
