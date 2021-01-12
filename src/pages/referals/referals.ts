import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "page-referals",
  templateUrl: "referals.html",
})
export class ReferalsPage {
  user_details;
  email;
  mobile_number;
  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.storage.get("value").then((value) => {
      this.user_details = value;
      console.log("this.user_details " + JSON.stringify(this.user_details));
      this.email = this.user_details[0].email;
      this.mobile_number = this.user_details[0].mobile_number;
      console.log("iEMAIL" + this.email);
      console.log("Phone" + this.mobile_number);
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ReferalsPage");
  }
}
