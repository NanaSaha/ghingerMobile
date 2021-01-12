import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
// import { SearchPage } from '../search/search';
import { CompleteTestService } from "../../providers/complete-test-service/complete-test-service";
// // import { Keyboard } from '@ionic-native/keyboard';
import "rxjs/add/operator/map";
import { LabSearchPage } from "../lab-search/lab-search";
import { LabdetailsPage } from "../labdetails/labdetails";
import { BilldetailsPage } from "../billdetails/billdetails";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the Labhistory1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-labhistory1",
  templateUrl: "labhistory1.html",
})
export class Labhistory1Page {
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
  labappointmentdetails = { id: "" };
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
    console.log("We are in Lab Appointments History page");
    this.from_login = this.navParams.get("value");

    this.from_login2 = this.navParams.get("pers_value");
    this.from_login3 = this.navParams.get("doc_value");
    // console.log('VALUE IN TABS CONSTRUCTOR IS' + this.from_login);

    this.body = this.from_login; //this.body = Array.of(this.from_login);

    this.jsonBody = this.body; // this.jsonBody = JSON.parse(this.body);

    this.requester_id1 = this.jsonBody[0].id;
    this.check = this.jsonBody[0];

    console.log("VALUE IN Lab history IS" + this.from_login);
    console.log(
      "VALUE of requester IN Lab appointment history  IS " + this.requester_id1
    );

    this.params = {
      requester_id: this.requester_id1,
    };

    this.newparams = JSON.stringify(this.params);

    console.log("New params " + this.newparams);

    this.getLabAppointmentHistory();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  openNewAppointment() {
    let confirm = this.alertCtrl.create({
      title: "Lab Request",
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
              this.navCtrl.push(LabSearchPage, {
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
  //suppose to open the new lab appointment modal page
  //   console.log("Open new Lab page");
  //   this.navCtrl.push(LabSearchPage, {
  //     value: this.from_login,
  //     doc_value: this.from_login3,
  //     pers_value: this.from_login2,
  //   });
  // }

  getLabAppointmentHistory() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      this.jsonBody = JSON.parse(this.newparams);

      this.data.getLabAppointmentHistory(this.jsonBody).then((result) => {
        // this.contacts = result;
        console.log(result);

        var jsonBody = result["_body"];
        jsonBody = JSON.parse(jsonBody);
        this.person_details = jsonBody;
        // loading.dismiss();

        console.log("Jsson body " + jsonBody);
        console.log("LAB " + JSON.stringify(jsonBody));
      });
      loading.dismiss();
    }, 1);
  }

  lab_appointment_history_details(lab_appoint_history) {
    console.log("in lab history page: rowid = " + lab_appoint_history);

    this.navCtrl.push(LabdetailsPage, {
      value: this.from_login,
      doc_value: this.from_login3,
      pers_value: this.from_login2,
      lab_appoint_history: lab_appoint_history,
    });
    // rowid: rowid
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
}
