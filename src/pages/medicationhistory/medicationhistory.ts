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

  requester_id1: any;
  from_login_doc: any = [];
  from_login_pers: any = [];
  body1: any;
  retrieve1: any;
  jsonBody1: any;

  body2: any;
  jsonBod2: any;

  // person_type3: any;

  person_details: any = [];
  content: any = [];
  // items: any = [];
  medappointmentdetails = { id: "" };
  rowid: any;

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
    console.log("We are in Medication Appointments History page");
    this.from_login = this.navParams.get("value");

    this.from_login2 = this.navParams.get("pers_value");
    this.from_login3 = this.navParams.get("doc_value");
    console.log("VALUE IN TABS CONSTRUCTOR IS" + this.from_login);

    this.body = this.from_login; //this.body = Array.of(this.from_login);

    this.jsonBody = this.body; // this.jsonBody = JSON.parse(this.body);

    console.log("JSON BODY IS" + this.jsonBody);
    this.requester_id1 = this.jsonBody[0].id;
    this.check = this.jsonBody[0];

    console.log("VALUE IN medication history IS" + this.from_login);
    console.log(
      "VALUE of requester IN medication appointment history  IS " +
        this.requester_id1
    );

    this.params = {
      requester_id: this.requester_id1,
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
                doc_value: this.from_login3,
                pers_value: this.from_login2,
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

  //suppose to open the new medication appointment modal page
  //   console.log("Open new medication page");
  //   console.log('---------------- Medication History ------------------');
  //   console.log("this.from_login = "+this.from_login);
  //   console.log("doc_value = "+this.from_login3);
  //   console.log("this.from_login_pers = "+this.from_login2);
  //   console.log('---------------- Medication History End ------------------');
  //   this.navCtrl.push(MedicationSearchPage, {
  //     value: this.from_login, doc_value: this.from_login3, pers_value: this.from_login2
  //   });
  // }

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

      this.data.getMedicationHistory(this.jsonBody).then(
        (result) => {
          // this.contacts = result;
          console.log(result);

          var jsonBody = result["_body"];
          jsonBody = JSON.parse(jsonBody);

          if (this.jsonBody) {
            this.person_details = jsonBody;
          } else {
            this.person_details = "0";
          }
          loading.dismiss();

          console.log("Jsson body " + jsonBody);
          console.log("Jsson body " + JSON.stringify(jsonBody));
        },
        (err) => {
          loading.dismiss();
          this.showalertmessage(
            "Sorry. An Error occured. Kindly refresh and try again."
          );
          console.log("error = " + JSON.stringify(err));
        }
      );
    }, 1);
  }

  medication_appointment_history_details(medication_appoint_history) {
    console.log(
      "in medication history page: rowid = " + medication_appoint_history
    );

    this.navCtrl.push(MedicationdetailsPage, {
      value: this.from_login,
      doc_value: this.from_login_doc,
      pers_value: this.from_login_pers,
      medication_appoint_history: medication_appoint_history,
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
