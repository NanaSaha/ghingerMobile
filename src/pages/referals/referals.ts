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
      var results_body = JSON.parse(this.user_details);
      this.mobile_number = results_body["data"]["user_infos"][0].phone;
      this.email = results_body["data"]["email"];
      console.log("iEMAIL" + this.email);
      console.log("Phone" + this.mobile_number);
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ReferalsPage");
  }
}
