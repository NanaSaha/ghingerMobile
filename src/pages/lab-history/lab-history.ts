import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { CompleteTestService } from "../../providers/complete-test-service/complete-test-service";
import { Http } from "@angular/http";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { HospitalListPage } from "../hospital-list/hospital-list";
import { LabSearchPage } from "../lab-search/lab-search";
// // import { Keyboard } from '@ionic-native/keyboard';
import { MenuPage } from "../menu/menu";

import "rxjs/add/operator/map";

@Component({
  selector: "page-lab-history",
  templateUrl: "lab-history.html",
})
export class LabHistoryPage {
  @ViewChild("searchbar") myInput;
  @ViewChild("input")
  searchbar: any;

  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];
  from_login: any = [];
  from_login2: any = [];
  from_login3: any = [];
  requester_id: any;
  data1: any = [];

  constructor(
    public toastCtrl: ToastController,
    // , private keyboard: Keyboard,
    public navCtrl: NavController,
    public navParams: NavParams,
    public completeTestService: CompleteTestService,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {
    this.from_login = this.navParams.get("value");
    this.from_login2 = this.navParams.get("pers_value");
    this.from_login3 = this.navParams.get("doc_value");
    console.log("VALUE IN TABS CONSTRUCTOR IS" + this.from_login);

    this.body = Array.of(this.from_login);

    this.jsonBody = JSON.parse(this.body);

    this.requester_id = this.jsonBody[0].id;
    this.check = this.jsonBody[0];

    console.log("VALUE IN medical history IS" + this.from_login);
    console.log(
      "VALUE of requester IN medical history  IS " + this.requester_id
    );

    this.params = {
      requester_id: this.requester_id,
    };

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.data.appointment_history(this.params).then(
      (result) => {
        console.log("RESULTS IS " + result);
        var body = result["_body"];
        body = JSON.parse(body);
        console.log("LESTS SEE BODY " + body);
        this.data1 = body;
        console.log("RESULTS IS " + this.data1);
        this.body = Array.of(this.data1);

        var desc = body["resp_desc"];
        var code = body["resp_code"];

        console.log(desc);
        console.log(code);

        this.messageList = desc;
        this.api_code = code;

        if (this.api_code == "119") {
          let alert = this.alertCtrl.create({
            title: "",
            subTitle: this.messageList,
            buttons: ["OK"],
          });

          this.toastCtrl
            .create({
              message: "Appointment History not available..",
              duration: 5000,
            })
            .present();
          alert.present();
        }
        loader.dismiss();

        if (this.api_code == "555") {
          let alert = this.alertCtrl.create({
            title: "",
            subTitle: this.messageList,
            buttons: ["OK"],
          });

          //      this.toastCtrl.create({
          //         message: "Appointment History not available.." ,
          //          duration: 5000
          //  }).present();
          alert.present();
        }
      },
      (err) => {
        loader.dismiss();

        let alert = this.alertCtrl.create({
          title: "",
          subTitle: "Could not process this request successfully.",
          buttons: ["OK"],
        });

        alert.present();
      }
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LabHistoryPage");
  }

  presentModal() {
    let modal = this.modalCtrl.create(LabSearchPage, {
      value: this.from_login,
      doc_value: this.from_login3,
      pers_value: this.from_login2,
    });
    modal.present();
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
  }
}
