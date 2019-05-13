import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { User } from '../modules/user';
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase/app";




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  user = {} as User;


  constructor(private afAuth: AngularFireAuth, public toastController: ToastController, public navCtrl: NavController, public alertController: AlertController) { }
  async Login(user: User) {
    if (this.user.email == null || this.user.password == null) {
      const alert = await this.alertController.create({
        header: 'OH-OH',
        subHeader: 'Datos incorrectos',
        message: 'Al parecer no has ingresado ningun dato',
        buttons: ['OK']

      });
      await alert.present();
    }

    try {
      this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(async (res: any) => {
        if (res) {
          this.navCtrl.navigateRoot('/home');
          const toast = await this.toastController.create({
            message: "Bienvenido",
            duration: 1000
          });
          toast.present();
        }
      })
        .catch(async (error: any) => {
          const alert = await this.alertController.create({
            header: 'OH-OH',
            subHeader: 'Datos incorrectos',
            message: 'El usuario o la contraseña estan incorrectos',
            buttons: ['OK']
          });
          await alert.present();
          console.error(error);
        });
    } catch (e) {
      const alert = await this.alertController.create({
        header: 'Oh-OH',
        subHeader: 'Datos incorrectos',
        message: 'El usuario o la contraseña estan incorrectos',
        buttons: ['OK']
      });
      console.error(e);
    }

  }
  async Register() {
    const toast = await this.toastController.create({
      message: "Registrate",
      duration: 1000
    });
    toast.present();
    //this.navCtrl.push('RegistrerPage');
  }
  LoginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(async (res: any) => {
      if (res) {
        this.navCtrl.navigateRoot('/home');
        const toast = await this.toastController.create({
          message: "Bienvenido",
          duration: 1000
        });
        toast.present();
      }
    })
      .catch(async (error: any) => {
        const alert = await this.alertController.create({
          header: 'OH-OH',
          subHeader: 'Datos incorrectos',
          message: 'El usuario o la contraseña estan incorrectos',
          buttons: ['OK']
        });
        await alert.present();
        console.error(error);
      });;

  }

  ngOnInit() {
    this.afAuth.auth.signOut();
  }

}