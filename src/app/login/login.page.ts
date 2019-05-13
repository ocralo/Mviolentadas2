import { Component, OnInit } from "@angular/core";
import {
  ToastController,
  NavController,
  AlertController,
  Platform
} from "@ionic/angular";
import { User } from "../modules/user";
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase/app";
import { GooglePlus } from "@ionic-native/google-plus/ngx";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  user = {} as User;

  constructor(
    private afAuth: AngularFireAuth,
    public toastController: ToastController,
    public navCtrl: NavController,
    public alertController: AlertController,
    public gplus: GooglePlus,
    public platform: Platform
  ) {}
  async Login() {
    if (this.user.email == null || this.user.password == null) {
      const alert = await this.alertController.create({
        header: "OH-OH",
        subHeader: "Datos incorrectos",
        message: "Al parecer no has ingresado ningun dato",
        buttons: ["OK"]
      });
      await alert.present();
    }

    try {
      this.afAuth.auth
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(async (res: any) => {
          if (res) {
            this.navCtrl.navigateRoot("/home");
            const toast = await this.toastController.create({
              message: "Bienvenido",
              duration: 1000
            });
            toast.present();
          }
        })
        .catch(async (error: any) => {
          const alert = await this.alertController.create({
            header: "OH-OH",
            subHeader: "Datos incorrectos",
            message: "El usuario o la contraseña estan incorrectos",
            buttons: ["OK"]
          });
          await alert.present();
          console.error(error);
        });
    } catch (e) {
      const alert = await this.alertController.create({
        header: "Oh-OH",
        subHeader: "Datos incorrectos",
        message: "El usuario o la contraseña estan incorrectos",
        buttons: ["OK"]
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
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(async (res: any) => {
        if (res) {
          this.navCtrl.navigateRoot("/home");
          const toast = await this.toastController.create({
            message: "Bienvenido",
            duration: 1000
          });
          toast.present();
        }
      })
      .catch(async (error: any) => {
        const alert = await this.alertController.create({
          header: "OH-OH",
          subHeader: "Datos incorrectos",
          message: "El usuario o la contraseña estan incorrectos",
          buttons: ["OK"]
        });
        await alert.present();
        console.error(error);
      });
  }

  async nativeGoogleLogin() {
    const gplusUser = await this.gplus.login({
      webClientId:
        "436211545918-rfcgvhu3t3574vnu7e3kgiai6hem801p.apps.googleusercontent.com",
      offline: true,
      scopes: "profile email"
    });
    this.afAuth.auth
      .signInWithCredential(
        auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )
      .then(async (res: any) => {
        if (res) {
          this.navCtrl.navigateRoot("/home");
          const toast = await this.toastController.create({
            message: "Bienvenido",
            duration: 1000
          });
          toast.present();
        }
      })
      .catch(async (error: any) => {
        const alert = await this.alertController.create({
          header: "OH-OH",
          subHeader: "Datos incorrectos",
          message: "El usuario o la contraseña estan incorrectos",
          buttons: ["OK"]
        });
        await alert.present();
        console.error(error);
      });
  }

  googleLogin() {
    if (this.platform.is("cordova")) {
      this.nativeGoogleLogin();
    } else {
      this.LoginGoogle();
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {}
}
