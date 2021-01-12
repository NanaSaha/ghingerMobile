import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { SignupPage } from "../signup/signup";
import { LoginPage } from "../login/login";
import { SplashScreen } from "@ionic-native/splash-screen";

@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html",
})
export class WelcomePage {
  splash = true;

  constructor(
    public splashScreen: SplashScreen,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    // setTimeout(() => (this.splash = false), 100);
    this.splashScreen.hide();
    console.log("Im in SLider Page");
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  login() {
    this.navCtrl.push(LoginPage);
  }
}
