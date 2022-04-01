import { Component } from "@angular/core";
import {
  ToastController,
  LoadingController,
  AlertController,
} from "ionic-angular";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { ProfileEditPage } from "../profile-edit/profile-edit";
import { DataProvider } from "../../providers/data/data";
import { Storage } from "@ionic/storage";
import { MenuPage } from "../menu/menu";

@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
})
export class ProfilePage {
  user_details;
  jsonBody: any;
  body: any;
  email: any;
  params: any;
  reg_id: any;
  user_type: any;
  from_login: any = [];
  first_name;
  surname;
  phone;

  profile_details;
  token;

  constructor(
    public storage: Storage,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.storage.get("value").then((value) => {
      this.profile_details = value;
      var profile_to_json = JSON.stringify(this.profile_details);

      this.user_details = JSON.parse(JSON.parse(profile_to_json));
      var results_body = JSON.parse(this.profile_details);

      console.log("PRFILE RAW VALUE " + this.profile_details);
      console.log("PROFILE STRINGIFY " + profile_to_json);
      console.log("PROFILE STRINGIFY PARSED " + this.user_details);
      console.log("PROFILE STRINGIFY PARSED VAR " + results_body);

      this.phone = results_body["data"]["user_infos"][0].phone;
      this.user_type = results_body["data"]["role"]["id"];
      this.surname = results_body["data"]["user_infos"][0].surname;
      this.first_name = results_body["data"]["user_infos"][0].first_name;
      this.email = results_body["data"]["email"];

      console.log("PROFILE user_type " + this.user_type);
    });

    this.storage.get("token").then((token) => {
      this.token = token;
      console.log("TOKEN IN MENu " + this.token);
    });
  }

  openMenu() {
    if (this.menuCtrl.isOpen()) {
      console.log("is open");
    }
    if (this.menuCtrl.isEnabled()) {
      console.log("is enabled");
    }

    this.menuCtrl.toggle();
    this.menuCtrl.open();
  }

  edit() {
    this.navCtrl.push(ProfileEditPage, {
      user_details: this.profile_details,
      token: this.token,
    });
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
  }
}
