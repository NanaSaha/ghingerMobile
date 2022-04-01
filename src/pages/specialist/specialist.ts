import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Events } from "ionic-angular";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { SpecialistDetailsPage } from "../specialist-details/specialist-details";
import { MenuPage } from "../menu/menu";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicSelectableComponent } from "ionic-selectable";
import { DataProvider } from "../../providers/data/data";
import { SpecialistHistoryDetailsPage } from "../specialist-history-details/specialist-history-details";
import { BookSpecialistPage } from "../book-specialist/book-specialist";

@Component({
  selector: "page-specialist",
  templateUrl: "specialist.html",
})
export class SpecialistPage {
  @ViewChild("searchbar") myInput;
  @ViewChild("input")
  searchbar: any;
  specialityForm;
  specialists;
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
  person_details: any = [];
  content: any = [];
  medappointmentdetails = { id: "" };
  rowid: any;
  specialist_id;
  token;
  history_list: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _form: FormBuilder,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {
    this.token = this.navParams.get("token");
    this.specialityForm = this._form.group({
      specialists_id: [""],
    });

    this.data.get_all_specialists(this.token).then(
      (result) => {
        console.log(result);
        var jsonBody = result;

        this.specialists = jsonBody["data"];
        console.log("specialists " + JSON.stringify(this.specialists));
      },
      (err) => {
        console.log("error = " + JSON.stringify(err));
      }
    );

    this.getSpecialistsAppointmentHistory();
  }

  getSpecialistsAppointmentHistory() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      this.data.getSpecialistHistory(this.token).then(
        (result) => {
          console.log("THIS IS THE RESULT" + result);
          console.log("THIS IS THE ONLY DATARESULT" + JSON.stringify(result));
          this.person_details = result["data"];

          let new_list = [];

          for (let x in this.person_details) {
            if (
              this.person_details[x]["appointment_type"].id == "SR" &&
              this.person_details[x]["apt_type_id"] == "SR"
            ) {
              new_list.push({
                title: this.person_details[x]["appointment_type"].title,
                price: this.person_details[x]["appointment_type"].price,
                date: this.person_details[x].created_at,
                status: this.person_details[x].confirm_status,
                complaint:
                  this.person_details[x].specialist_apt_extras[0]
                    .specialist_master.name,
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

          this.showtoast("No Appointments");
        }
      );
    }, 1);
  }

  specialist_appointment_history_details(specialist_appoint_history) {
    this.navCtrl.push(SpecialistHistoryDetailsPage, {
      value: this.from_login,
      specialist_appoint_history: specialist_appoint_history,
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

  home() {
    this.navCtrl.setRoot(MenuPage);
  }

  get_specialist(specialists_id) {
    console.log("SPECIALIST ID " + specialists_id.id);
    this.specialist_id = specialists_id.id;
  }

  bookSpecialist() {
    this.navCtrl.push(BookSpecialistPage, {
      value: this.from_login,
      specialist_id: this.specialist_id,
      token: this.token,
    });
    // let confirm = this.alertCtrl.create({
    //   title: "Video / Phone Consultation",
    //   message:
    //     "Video Consultation Fee :: GHc 80.<br> Phone Consultation Fee :: GHc 60 Would you want to proceed to book the appointment?",

    //   buttons: [
    //     {
    //       text: "No",
    //       handler: () => {},
    //     },
    //     {
    //       text: "Yes",
    //       handler: () => {
    //         let loader = this.loadingCtrl.create({
    //           content: "Please Hold on...",
    //           duration: 1000,
    //         });

    //         loader.present();

    //         setTimeout(() => {
    //           this.navCtrl.push(BookSpecialistPage, {
    //             value: this.from_login,
    //             specialist_id: this.specialist_id,
    //           });
    //         }, 1000);

    //         setTimeout(() => {
    //           loader.dismiss();
    //         }, 800);
    //       },
    //     },
    //   ],
    // });
    // confirm.present();
  }
  // details() {
  //   this.navCtrl.push(SpecialistDetailsPage);
  // }
}
