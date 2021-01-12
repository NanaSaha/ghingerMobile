import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { MedappointmentdetailsPage } from "../medappointmentdetails/medappointmentdetails";
import { SearchPage } from "../search/search";
import { CompleteTestService } from "../../providers/complete-test-service/complete-test-service";
import "rxjs/add/operator/map";
import { Storage } from "@ionic/storage";
import { BilldetailsPage } from "../billdetails/billdetails";
import { MenuPage } from "../menu/menu";

@Component({
  selector: "page-search2",
  templateUrl: "search2.html",
})
export class Search2Page {
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
  person_details: any = [];
  person_details_code: any;
  content: any = [];

  medappointmentdetails = { id: "" };
  rowid: any;

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public completeTestService: CompleteTestService,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {
    console.log("We are in Medical Appointments History page");
    this.from_login = this.navParams.get("value");
    this.from_login2 = this.navParams.get("pers_value");
    this.from_login3 = this.navParams.get("doc_value");

    console.log("VALUE from Login " + this.from_login);
    console.log("VALUE from login-doc " + this.from_login3);
    console.log("VALUE from login-person " + this.from_login2);

    this.body = this.from_login;

    this.jsonBody = this.body;

    this.requester_id1 = this.jsonBody[0].id;
    this.check = this.jsonBody[0];

    console.log("VALUE IN medical history IS" + this.from_login);
    console.log(
      "VALUE of requester IN medical appointment history  IS " +
        this.requester_id1
    );

    this.params = {
      requester_id: this.requester_id1,
    };

    this.newparams = this.params;

    console.log("New params " + this.newparams);

    this.getAppointmentHistory();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
  }

  openNewAppointment() {
    // let confirm = this.alertCtrl.create({
    //   title: 'Medical Appointment Bill',
    //   message: 'Hi, The cost of Medical appointment is GHC50. Do you please like to proceed to book the appointment?',
    //   buttons: [
    //     {
    //       text: 'No',
    //       handler: () => { }
    //     },
    //     {
    //       text: 'Yes',
    //       handler: () => {
    //         let loader = this.loadingCtrl.create({
    //           content: "Please Hold on...",
    //           duration: 1000
    //         });

    //         loader.present();

    //         setTimeout(() => {

    //           this.navCtrl.push(SearchPage, {
    //             value: this.from_login, doc_value: this.from_login3, pers_value: this.from_login2
    //           });

    //         }, 1000);

    //         setTimeout(() => {
    //           loader.dismiss();
    //         }, 800);

    //       }
    //     }
    //   ]
    // });
    // confirm.present();

    this.navCtrl.push(SearchPage, {
      value: this.from_login,
      doc_value: this.from_login3,
      pers_value: this.from_login2,
    });
  }

  getAppointmentHistory() {
    this.jsonBody = this.newparams;
    // this.jsonBody = JSON.parse(this.newparams);
    this.data.med_appointment_history(this.jsonBody).then((result) => {
      console.log(result);

      var jsonBody = result["_body"];
      jsonBody = JSON.parse(jsonBody);
      this.person_details = jsonBody;
      this.person_details_code = JSON.stringify(this.person_details.resp_code);

      console.log("Jsson body " + this.person_details_code);
      console.log("LAB " + JSON.stringify(jsonBody));
    });
  }

  medical_appointment_history_details(medappointhistory) {
    this.navCtrl.push(MedappointmentdetailsPage, {
      value: this.from_login,
      doc_value: this.from_login_doc,
      pers_value: this.from_login_pers,
      medappointhistory: medappointhistory,
    });
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
