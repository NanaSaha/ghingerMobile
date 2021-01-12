import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { Http } from "@angular/http";
import {
  ToastController,
  LoadingController,
  AlertController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { BookLabPage } from "../../pages/book-lab/book-lab";
import { MenuPage } from "../menu/menu";

import "rxjs/add/operator/map";

@Component({
  selector: "page-hospital-list1",
  templateUrl: "hospital-list1.html",
})
export class HospitalList1Page {
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  from_login: any = [];
  from_login2: any = [];
  from_login3: any = [];
  body: any;
  jsonBody: any;
  params: any = [];
  raw: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.from_menu = this.navParams.get("value");
    this.from_login = this.navParams.get("another");

    this.from_login2 = this.navParams.get("pers_value");
    this.from_login3 = this.navParams.get("doc_value");

    this.raw = JSON.stringify(this.from_menu);

    console.log("Raw values from location" + this.raw);
    console.log("from location" + this.from_menu);

    console.log("from login" + this.from_login);

    this.params = {
      location: this.from_menu,
    };
    console.log("PARAMETERS" + this.params);

    this.data.hospitals(this.params).then(
      (result) => {
        console.log("RESULTS IS " + result);
        console.log("RESULTS IS" + this.data.hospitals(this.params));
        var body = result["_body"];
        body = JSON.parse(body);
        this.check = body;
        console.log("RESULTS IS " + this.check);
        this.body = Array.of(this.check);

        var desc = body["resp_desc"];
        var code = body["resp_code"];

        console.log(desc);
        console.log(code);

        this.messageList = desc;
        this.api_code = code;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HospitalListPage");
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
  }

  book(location) {
    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    console.log("SELECTED CLINIC IS" + location.provider_name);
    console.log("SELECTED CLINIC ID IS" + location.service_prov_id);
    let serv_id = location.service_prov_id;

    setTimeout(() => {
      this.navCtrl.push(BookLabPage, {
        value: serv_id,
        another: this.from_login,
        doc_value: this.from_login3,
        pers_value: this.from_login2,
      });
    }, 3);

    setTimeout(() => {
      loader.dismiss();
    }, 3);
  }
}
