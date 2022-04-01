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

  requester_id: any;
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
  resp_code;
  no_appointments;
  token;
  history_list: any = [];

  kofi = "2";

  medappointmentdetails = { id: "" };
  rowid: any;

  constructor(
    public toastCtrl: ToastController,
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
    console.log("VALUE from Login " + this.from_login);
    this.token = this.navParams.get("token");

    var results_body = JSON.parse(this.from_login);
    var user_id = results_body["data"]["user_infos"][0].user_id;

    this.body = this.from_login;

    this.jsonBody = this.body;

    this.requester_id = user_id;
    this.check = this.jsonBody[0];

    console.log("VALUE IN medical history IS" + this.from_login);
    console.log(
      "VALUE of requester IN medical appointment history  IS " +
        this.requester_id
    );

    this.params = {
      requester_id: this.requester_id,
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
      token: this.token,
    });
  }

  getAppointmentHistory() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();
    this.data.med_appointment_history(this.token).then(
      (result) => {
        console.log("THIS IS THE RESULT" + result);
        console.log("THIS IS THE ONLY DATARESULT" + result["data"]);
        this.person_details = result["data"];
        let new_list = [];

        for (let x in this.person_details) {
          if (
            this.person_details[x]["appointment_type"].id == "MA" &&
            this.person_details[x]["apt_type_id"] == "MA"
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

        console.log("NEW LIST" + JSON.stringify(new_list));
        this.history_list = new_list;
        loading.dismiss();
      },

      (err) => {
        loading.dismiss();
        this.no_appointments = "no";

        let toast = this.toastCtrl.create({
          message: "No Appointments Found",
          duration: 5000,
          position: "bottom",
        });
        toast.present();
        console.log(JSON.stringify(err));
      }
    );
  }

  medical_appointment_history_details(medappointhistory) {
    this.navCtrl.push(MedappointmentdetailsPage, {
      value: this.from_login,
      medappointhistory: medappointhistory,
      token: this.token,
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
