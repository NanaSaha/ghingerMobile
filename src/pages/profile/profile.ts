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

  constructor(
    public storage: Storage,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    let type = this.navParams.get("type");
    console.log("type" + type);

    if (type == "edit") {
      this.user_details = this.navParams.get("user_details");
      console.log("USer DETAILS " + JSON.stringify(this.user_details));
      this.user_type = this.user_details[0].user_type;
    } else {
      this.storage.get("value").then((value) => {
        this.user_details = value;
        console.log("this.user_details " + JSON.stringify(this.user_details));
        this.user_type = this.user_details[0].user_type;
      });
    }

    // this.user_details = this.navParams.get("user_details")
    // this.email = this.user_details[0].email
    // this.reg_id = this.user_details[0].reg_id
    // this.user_type = this.user_details[0].user_type
    // console.log("USer DETAILS " + JSON.stringify(this.user_details))
    // console.log("email " + JSON.stringify(this.email))
    // console.log("ID " + JSON.stringify(this.reg_id))
    // console.log("ID " + this.reg_id)

    // let loader = this.loadingCtrl.create({
    //   content: "Refreshing..."
    // });
    // loader.present();

    // this.params = {

    //   "reg_id": this.reg_id,

    // }

    // this.data.retrieve_edit(this.params).then((result) => {

    //   console.log(result);
    //   var jsonBody = result["_body"];
    //   console.log(jsonBody);
    //   this.user_details = JSON.parse(jsonBody)
    //   loader.dismiss();

    // });
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

  edit(item) {
    this.navCtrl.push(ProfileEditPage, { user_details: this.user_details });
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
  }
}
