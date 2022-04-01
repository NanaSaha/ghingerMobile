import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { CompleteTestService } from "../../providers/complete-test-service/complete-test-service";
// // import { Keyboard } from '@ionic-native/keyboard';
import "rxjs/add/operator/map";
import { MedicationdetailsPage } from "../medicationdetails/medicationdetails";
import { VidConsultPage } from "../vid-consult/vid-consult";
import { VideoconsultdetailsPage } from "../videoconsultdetails/videoconsultdetails";
import { HomeSearchPage } from "../home-search/home-search";
import { HomecaredetailsPage } from "../homecaredetails/homecaredetails";
import { Storage } from "@ionic/storage";
import { BilldetailsPage } from "../billdetails/billdetails";
import { MenuPage } from "../menu/menu";

@Component({
  selector: "page-homecarehistory",
  templateUrl: "homecarehistory.html",
})
export class HomecarehistoryPage {
  @ViewChild("searchbar") myInput;
  @ViewChild("input")
  // searchbar: any;
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];
  newparams: any;
  from_login: any = [];
  from_login2: any = [];
  from_login3: any = [];
  sub_id: any;
  string: any;

  requester_id: any;
  from_login_doc: any = [];
  from_login_pers: any = [];
  body1: any;
  retrieve1: any;
  jsonBody1: any;

  body2: any;
  jsonBod2: any;
  homecare_details: any = [];
  content: any = [];
  rowid: any;
  appointmentType: any;
  resp_code;
  no_appointments;
  token;

  history_list: any = [];

  constructor(
    // private keyboard: Keyboard,
    public navCtrl: NavController,
    public navParams: NavParams,
    public completeTestService: CompleteTestService,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public storage: Storage,
    public toastCtrl: ToastController
  ) {
    this.from_login = this.navParams.get("value");
    this.token = this.navParams.get("token");
    console.log("VALUE from Login " + this.from_login);

    var results_body = JSON.parse(this.from_login);
    var user_id = results_body["data"]["user_infos"][0].user_id;

    this.body = this.from_login;

    this.jsonBody = this.body;

    this.requester_id = user_id;
    this.check = this.jsonBody[0];

    console.log("VALUE IN medication history IS" + this.from_login);
    console.log(
      "VALUE of requester IN medication appointment history  IS " +
        this.requester_id
    );

    this.params = {
      requester_id: this.requester_id,
    };

    this.newparams = JSON.stringify(this.params);

    console.log("New params " + this.newparams);

    this.getHomeCareAppointmentHistory();
  }

  openNewAppointment() {
    let confirm = this.alertCtrl.create({
      title: "Home Consultation",
      message:
        "Fee: Ghc350 - GHc 500 . Do you please like to proceed to book the appointment?",

      buttons: [
        {
          text: "No",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: () => {
            let loader = this.loadingCtrl.create({
              content: "Please Hold on...",
              duration: 1000,
            });

            loader.present();

            setTimeout(() => {
              this.navCtrl.push(HomeSearchPage, {
                value: this.from_login,
                appointmentType: this.appointmentType,
                token: this.token,
              });
            }, 1000);

            setTimeout(() => {
              loader.dismiss();
            }, 800);
          },
        },
      ],
    });
    confirm.present();
  }

  public bill(data) {
    console.log(data);
    if (data) {
      this.storage.set("billdetails", JSON.stringify(data));
    } else {
      this.storage.set("billdetails", "empty");
    }
    this.navCtrl.push(BilldetailsPage, {
      value: this.from_login,
      doc_value: this.from_login_doc,
      pers_value: this.from_login_pers,
    });
  }

  getHomeCareAppointmentHistory() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      this.data.getHomeCareAppointmentHistory(this.token).then(
        (result) => {
          console.log("THIS IS THE RESULT" + result);
          console.log("THIS IS THE ONLY DATARESULT" + result["data"]);

          this.homecare_details = result["data"];

          console.log("LENTH " + this.homecare_details.length);

          let new_list = [];

          for (let x in this.homecare_details) {
            if (
              this.homecare_details[x]["appointment_type"].id == "HC" &&
              this.homecare_details[x]["apt_type_id"] == "HC"
            ) {
              new_list.push({
                title: this.homecare_details[x]["appointment_type"].title,
                price: this.homecare_details[x]["appointment_type"].price,
                date: this.homecare_details[x].created_at,
                status: this.homecare_details[x].confirm_status,
                complaint: this.homecare_details[x].complaint,
                id: this.homecare_details[x].id,
              });
            }
          }
          this.history_list = new_list;

          loading.dismiss();
        },
        (err) => {
          this.no_appointments = "no";

          this.showtoast("No Appointments");
          loading.dismiss();
        }
      );
    }, 1);
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
  }

  homecare_appointment_history_details(homecare_appoint_history_id) {
    this.navCtrl.push(HomecaredetailsPage, {
      value: this.from_login,

      homecare_appoint_history_id: homecare_appoint_history_id,
    });
    // rowid: rowid
  }

  showalertmessage(mainmsg) {
    let alert = this.alertCtrl.create({
      title: "Ghinger Health Care",
      subTitle: mainmsg,
      buttons: ["OK"],
    });
    alert.present();
  }

  showtoast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "bottom",
    });
    toast.present();
  }
}
