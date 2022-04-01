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
// import { Keyboard } from '@ionic-native/keyboard';
import "rxjs/add/operator/map";
import { MedicationSearchPage } from "../medication-search/medication-search";
import { MedicationdetailsPage } from "../medicationdetails/medicationdetails";
import { Storage } from "@ionic/storage";
import { BilldetailsPage } from "../billdetails/billdetails";

@Component({
  selector: "page-medicationhistory",
  templateUrl: "medicationhistory.html",
})
export class MedicationhistoryPage {
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
  resp_code;
  no_appointments;
  history_list: any = [];

  // person_type3: any;

  person_details: any = [];
  content: any = [];
  // items: any = [];
  medappointmentdetails = { id: "" };
  rowid: any;
  token;

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
    console.log("VALUE from Login " + this.from_login);
    this.token = this.navParams.get("token");
    console.log("TOKEN " + this.token);

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

    this.getMedicationAppointmentHistory();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  openNewAppointment() {
    let confirm = this.alertCtrl.create({
      title: "Medication Order",
      message:
        "Delivery Fee: GH¢ 15 (within Tema) :: GH¢ 20 (within Accra). Would you want to proceed to book the appointment?",

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
              this.navCtrl.push(MedicationSearchPage, {
                value: this.from_login,
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

  getMedicationAppointmentHistory() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      this.jsonBody = JSON.parse(this.newparams);

      this.data.getMedicationHistory(this.token).then(
        (result) => {
          console.log("THIS IS THE RESULT" + result);
          console.log("THIS IS THE ONLY DATARESULT" + result["data"]);
          this.person_details = result["data"];

          let new_list = [];

          for (let x in this.person_details) {
            if (
              this.person_details[x]["appointment_type"].id == "MD" &&
              this.person_details[x]["apt_type_id"] == "MD"
            ) {
              new_list.push({
                title: this.person_details[x]["appointment_type"].title,
                price: this.person_details[x]["appointment_type"].price,
                date: this.person_details[x].created_at,
                status: this.person_details[x].confirm_status,
                complaint: this.person_details[x].complaint,
                id: this.person_details[x].id,
              });
            }
          }
          this.history_list = new_list;
          loading.dismiss();
        },
        (err) => {
          loading.dismiss();
          this.no_appointments = "no";

          this.showtoast("No Appointments");
        }
      );
    }, 1);
  }

  medication_appointment_history_details(medication_appoint_history) {
    this.navCtrl.push(MedicationdetailsPage, {
      value: this.from_login,
      medication_appoint_history: medication_appoint_history,
      token: this.token,
    });
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
