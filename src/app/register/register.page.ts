import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor( 
    private menuCtrl:MenuController,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
  }
  Cancel(){
    this.navCtrl.navigateRoot('/login');
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}
