import { Component, OnInit } from '@angular/core';
import {SecurityService} from '../../services/security.service';
import {LoadingController, NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginInfo: any  = {
    email: '',
    password: ''
  };

  constructor(
    public securityService: SecurityService,
    private nav: NavController,
    public storage: Storage,
    private loadingController: LoadingController
    ) {
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.storage.get('uid').then(value => {
      if (value) {
        // this.nav.navigateRoot('/home');
        this.nav.navigateRoot('/dashboard-menu-tabs');
      }
      loading.dismiss();
    });
  }

  async googleLogin() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.securityService.loginGoogle().then(res => {
      this.storage.set('uid', res.user.uid).then(() => {
        loading.dismiss();
        this.nav.navigateRoot('/dashboard-menu-tabs');
      });
    });
  }

  async emailLogin(form: NgForm) {
    if (form.valid) {
      const loading = await this.loadingController.create({
        message: 'Cargando...'
      });
      await loading.present();
      this.securityService.loginEmail(this.loginInfo).then(res => {
        this.storage.set('uid', res.user.uid).then(() => {
          loading.dismiss();
          this.nav.navigateRoot('/dashboard-menu-tabs');
        });
      });
    }
  }

}
