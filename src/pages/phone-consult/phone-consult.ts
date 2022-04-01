import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { Http } from "@angular/http";
// import { Keyboard } from '@ionic-native/keyboard';
import "rxjs/add/operator/map";
import { MenuPage } from "../menu/menu";
import { Storage } from "@ionic/storage";

@Component({
  selector: "page-phone-consult",
  templateUrl: "phone-consult.html",
})
export class PhoneConsultPage {
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];
  params2: any = [];
  from_login: any = [];
  from_login_doc: any = [];
  from_login_pers: any = [];
  sub_id: any;
  string: any;
  app_date: any;
  app_time: any;
  requester_id: any;
  minSelectabledate: any;
  date: any;
  token;

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public storage: Storage
  ) {
    this.from_login = this.navParams.get("value");
    this.from_login_doc = this.navParams.get("doc_value");
    this.from_login_pers = this.navParams.get("pers_value");

    this.storage.get("token").then((token) => {
      this.token = token;
      console.log("TOKEN IN MENu " + this.token);
    });

    this.date = new Date();
    this.minSelectabledate = this.formatDate(this.date);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PhoneConsultPage");
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  submit() {
    this.from_login = this.navParams.get("value");
    console.log("VALUE IN TABS CONSTRUCTOR IS" + this.from_login);
    this.body = Array.of(this.from_login);
    this.jsonBody = JSON.parse(this.body);
    this.requester_id = this.jsonBody[0].id;
    this.check = this.jsonBody[0];

    console.log("THIS IS THE REquester ID " + this.requester_id);
    console.log("THIS IS THE APP DATE " + this.app_date);
    console.log("THIS IS THE APP TIME " + this.app_time);

    this.params2 = {
      appointment_type_id: "PC",
      requester_id: this.requester_id,
      proposed_date: this.app_date + " " + this.app_time,
    };

    console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params2));

    console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params2));

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.data.phone_consult(this.params2, this.token).then(
      (result) => {
        console.log("THIS IS THE RESULT" + result);
        var jsonBody = result["_body"];
        console.log(jsonBody);

        jsonBody = JSON.parse(jsonBody);
        console.log(jsonBody);

        var desc = jsonBody["resp_desc"];
        var code = jsonBody["resp_code"];

        console.log(desc);
        console.log(code);

        this.messageList = desc;
        this.api_code = code;

        loader.dismiss();

        if (this.api_code == "000") {
          let alert = this.alertCtrl.create({
            title: "",
            subTitle: this.messageList,
            buttons: ["OK"],
          });

          this.navCtrl.setRoot(MenuPage, {
            value: this.from_login,
            doc_value: this.from_login_doc,
            pers_value: this.from_login_pers,
          });
          alert.present();
        }

        if (this.api_code == "555") {
          let alert = this.alertCtrl.create({
            title: "",
            subTitle: this.messageList,
            buttons: ["OK"],
          });

          alert.present();
        }
      },
      (err) => {
        loader.dismiss();
        this.toastCtrl
          .create({
            message: "Could not process this request successfully.",
            duration: 5000,
          })
          .present();

        console.log(err);
      }
    );
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    // console.log("year" + year + "and day = " + day);

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    console.log("year" + year + "and day = " + day);

    return [year, month, day].join("-");
  }

  formatDatemax(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + (d.getDate() - 14),
      year = d.getFullYear();

    console.log("year" + year + "and day = " + day);

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    console.log("year" + year + "and day = " + day);

    return [year, month, day].join("-");
  }
}
