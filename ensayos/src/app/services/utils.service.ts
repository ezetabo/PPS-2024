import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);

  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  async toast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  routerByUrl(url: string) {
    return this.router.navigateByUrl(url);
  }

saveinLocalStorage(key:string, value:any) {
  return localStorage.setItem(key, value);
}

getFromLocalStorage(key:string) {
  return localStorage.getItem(key);
}

}
