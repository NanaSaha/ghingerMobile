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

  requester_id1: any;
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
    public storage: Storage
  ) {
    // console.log("We are in Home Care Consult Appointments History page");
    this.from_login = this.navParams.get("value");

    this.from_login2 = this.navParams.get("pers_value");
    this.from_login3 = this.navParams.get("doc_value");
    this.appointmentType = navParams.get("appointmentType");

    this.body = this.from_login;

    this.jsonBody = this.body;

    this.requester_id1 = this.jsonBody[0].id;

    this.params = {
      requester_id: this.requester_id1,
      appointment_type_id: this.appointmentType,
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
      //message: 'Standard Fee: GH¢ 0.1 :: Express Fee: GH¢ 0.1. <br> Would you want to proceed to book the appointment?',

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
                doc_value: this.from_login3,
                pers_value: this.from_login2,
                appointmentType: this.appointmentType,
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
      this.jsonBody = JSON.parse(this.newparams);

      this.data.getHomeCareAppointmentHistory(this.jsonBody).then(
        (result) => {
          // this.contacts = result;
          console.log(result);

          var jsonBody = result["_body"];
          jsonBody = JSON.parse(jsonBody);
          this.homecare_details = jsonBody;

          console.log("Jsson body " + jsonBody);
        },
        (err) => {
          loading.dismiss();
          this.showalertmessage(
            "Sorry. An Error occured. Kindly refresh and try again."
          );
          console.log("error = " + JSON.stringify(err));
        }
      );

      loading.dismiss();
    }, 1);
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
  }

  homecare_appointment_history_details(
    homecare_appoint_history_id,
    appointmentType
  ) {
    this.navCtrl.push(HomecaredetailsPage, {
      value: this.from_login,
      doc_value: this.from_login_doc,
      pers_value: this.from_login_pers,
      homecare_appoint_history_id: homecare_appoint_history_id,
      appointmentType: appointmentType,
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
}
