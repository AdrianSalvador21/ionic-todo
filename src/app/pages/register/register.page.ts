import { Component, OnInit } from '@angular/core';
import {SecurityService} from '../../services/security.service';
import {Router} from '@angular/router';
import {LoadingController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerInfo: any  = {
    email: '',
    password: '',
    confirm_password: '',
    name: ''
  };
  constructor(public securityService: SecurityService,
              private nav: NavController,
              public router: Router,
              private loadingController: LoadingController) { }

  ngOnInit() {
  }

  async registerEmail(form) {
    if (form.valid) {
      if (this.registerInfo.password === this.registerInfo.confirm_password) {
        const loading = await this.loadingController.create({
          message: 'Cargando...'
        });
        await loading.present();
        this.securityService.registerUser(this.registerInfo).then(res => {
          console.log(res);
          loading.dismiss();
          this.nav.navigateForward('/login');
        });
      }
    }
  }

}
