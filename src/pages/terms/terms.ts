import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";

@Component({
  selector: "page-terms",
  templateUrl: "terms.html",
})
export class TermsPage {
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
