import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ViewController,
  Events,
} from "ionic-angular";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";

import { Http } from "@angular/http";
// // import { Keyboard } from '@ionic-native/keyboard';
import "rxjs/add/operator/map";
import { AcceptedAppPage } from "../accepted-app/accepted-app";
import { AcceptedApp2Page } from "../accepted-app2/accepted-app2";
import { AddRegisPage } from "../add-regis/add-regis";
import { ReferPage } from "../refer/refer";
import { DocpagePersonalPage } from "../docpage-personal/docpage-personal";
import { Storage } from "@ionic/storage";
import { DocappointmentMenuPage } from "../docappointmentmenu/docappointmentmenu";
import { ReferpatientlistsPage } from "../referpatientlists/referpatientlists";
import { InvoicePage } from "../invoice/invoice";
import { MedicalrecordPage } from "../medicalrecord/medicalrecord";

import { SubscriptionHistoryDocPage } from "../subscription-history-doc/subscription-history-doc";

@Component({
  selector: "page-doctorhome",
  templateUrl: "doctorhome.html",
})
export class DoctorHomePage {
  from_login: any = [];
  from_login_doc: any = [];
  from_login_pers: any = [];
  from_regis_id: any = [];
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  body1: any;
  jsonBody: any;
  jsonBody1: any;
  params: any = [];
  requester_id: any;
  registration_number: any;
  email: any;
  data1: any = [];
  reg_id: any;
  doc_id: any;
  Phonenumber: string;
  PIN: string;
  retrieve: string;
  retrieve1: string;
  retrieve_pers: string;
  retrieve_doc: string;
  retrieve_doc3: string;

  searchbar: any;

  person_type: any;
  person_type1: any;
  my_person_type: string;
  doctor_id: any;
  id: any;
  doctor_id2: any;
  doc_params: any = [];
  doc_params2: any = [];
  newparams: any;
  login_doc_values: any;

  body2: any;
  jsonBody2: any;
  resp_code: any;
  checkdocprofinfo: any;
  surname: string = "";
  other_names: string = "";
  full_name: string = "";
  body3: any;
  jsonBody3: any;
  doc_all_total_count_appoint_counter: any;
  retrieve_user_status: any;
  jsonBody4: any;
  active_status: any;
  welcome_msg: string;
  token;
  CurrentHrs;
  greetings;

  constructor(
    public event: Events,
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
    this.user_greetings();

    this.storage.get("token").then((token) => {
      this.token = token;
      console.log("TOKEN IN MENu " + this.token);
    });

    this.storage.get("value").then((value) => {
      this.from_login = value;
      console.log("FROM LOGIN VALYE " + JSON.stringify(this.from_login));
      this.event.publish("user_details", this.from_login);

      var results_body = JSON.parse(this.from_login);

      let user_mobile_number = results_body["data"]["user_infos"][0].phone;
      var role = results_body["data"]["role"]["id"];
      var user_id = results_body["data"]["user_infos"][0].user_id;
      this.surname = results_body["data"]["user_infos"][0].surname;
      this.other_names = results_body["data"]["user_infos"][0].first_name;
      this.email = results_body["data"]["email"];

      console.log("results_body " + JSON.stringify(results_body));
      console.log("user_mobile_number " + JSON.stringify(user_mobile_number));

      this.jsonBody = this.from_login;

      if (results_body) {
        console.log("EMAIL  " + this.email);

        if (user_id) {
          this.requester_id = user_id;
          this.storage.set("requester_id", this.requester_id);
          console.log("requester ID = " + this.requester_id);
        }
        if (this.surname && this.other_names) {
          this.storage.set(
            "patient_name",
            this.surname + " " + this.other_names
          );
        }
      }
    });
  }

  user_greetings() {
    this.CurrentHrs = new Date().getHours();
    console.log("HOURS " + this.CurrentHrs);

    if (this.CurrentHrs >= 1 && this.CurrentHrs <= 12) {
      this.greetings = "Good Morning";
      console.log(this.greetings);
    } else if (this.CurrentHrs >= 12 && this.CurrentHrs <= 16) {
      this.greetings = "Good Afternoon";
      console.log(this.greetings);
    } else if (this.CurrentHrs >= 16 && this.CurrentHrs <= 21) {
      this.greetings = "Good Evening";
      console.log(this.greetings);
    } else if (this.CurrentHrs >= 21 && this.CurrentHrs <= 24) {
      this.greetings = "Good Night";
      console.log(this.greetings);
    }
  }

  ionViewWillEnter() {
    this.user_greetings();
    // if (this.doctor_id) {
    //   this.getallappointments(this.doctor_id);
    // } else {
    //   this.storage.get("doctor_id").then((doctor_id) => {
    //     this.doctor_id = doctor_id;

    //     this.getallappointments(this.doctor_id);
    //   });
  }

  ionViewDidLoad() {
    this.user_greetings();
    console.log("ionViewDidLoad DoctorPage");
  }

  subscriptions() {
    this.navCtrl.push(SubscriptionHistoryDocPage, {
      from_login: this.from_login,
    });
  }

  appointments() {
    // if (this.active_status == false) {
    //   this.showalertmessage_default(
    //     "Ghinger",
    //     "Your registration has to be confirmed for you to access this menu."
    //   );
    // } else if (this.active_status == true) {

    //   this.navCtrl.push(DocappointmentMenuPage, {
    //     from_login: this.from_login,
    //   });
    // } else {
    this.navCtrl.push(DocappointmentMenuPage, {
      from_login: this.from_login,
      token: this.token,
    });
    //}
  }

  // personal() {
  //   this.checkdocprofinfo = this.checkdocprofesionalinfo(this.reg_id);

  //   console.log(
  //     "Personal this.checkdocprofinfo = " +
  //       this.checkdocprofinfo +
  //       " this.resp_code" +
  //       this.resp_code
  //   );

  //   if (this.resp_code == "220") {
  //     let alert = this.alertCtrl.create({
  //       title: "",
  //       subTitle:
  //         "Please complete your registration before you use the service",
  //       buttons: ["OK"],
  //     });
  //     alert.present();
  //     this.navCtrl.push(AddRegisPage, {
  //       value: this.from_login,
  //       doc_value: this.from_regis_id,
  //     });
  //   } else {
  //     this.navCtrl.push(AcceptedApp2Page, { value: this.from_login_pers });
  //   }
  // }

  // pds() {
  //   if (this.active_status == false) {
  //     this.showalertmessage_default(
  //       "Ghinger",
  //       "Your registration has to be confirmed for you to access this menu."
  //     );
  //   } else if (this.active_status == true) {
  //     this.checkdocprofinfo = this.checkdocprofesionalinfo(this.reg_id);
  //     if (this.reg_id && this.from_login_pers) {
  //       console.log("Doctor Home this.reg_id = " + this.reg_id);
  //       this.navCtrl.push(AcceptedApp2Page, { value: this.from_login_pers });
  //     }
  //   }
  // }

  invoice() {
    // if (this.active_status == false) {
    //   this.showalertmessage_default(
    //     "Ghinger",
    //     "Your registration has to be confirmed for you to access this menu."
    //   );
    // } else if (this.active_status == true) {
    //   this.storage.get("doctor_id").then((doctor_id) => {
    //     this.doctor_id = doctor_id;
    //     console.log(
    //       " REFER PATient button before click : DoctorPage doctor_id = " +
    //         doctor_id
    //     );
    //   });

    this.navCtrl.push(InvoicePage, {
      from_login: this.from_login,
      token: this.token,
    });
  }

  medRecord() {
    this.navCtrl.push(MedicalrecordPage, {
      token: this.token,
    });
  }

  referpatient() {
    if (this.active_status == false) {
      this.showalertmessage_default(
        "Ghinger",
        "Your registration has to be confirmed for you to access this menu."
      );
    } else if (this.active_status == true) {
      //pass doc id to appointments page
      this.storage.get("doctor_id").then((doctor_id) => {
        this.doctor_id = doctor_id;
        console.log(
          " REFER PATient button before click : DoctorPage doctor_id = " +
            doctor_id
        );
      });

      this.navCtrl.push(ReferpatientlistsPage, {
        doctor_id: this.doctor_id,
      });
    }
  }

  bills() {
    this.showalertmessage_default(
      "Ghinger",
      "This service is unavailable at the moment. Thank you."
    );
  }

  showmessage(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "top",
    });

    toast.present();
  }

  showalertmessage_default(titlemsg, mainmsg) {
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: ["OK"],
    });
    alert.present();
  }

  // checkdocprofesionalinfo(doc_id) {

  //   if (doc_id) {
  //     this.newparams = {
  //       doc_id: doc_id,
  //     };

  //     this.data.get_professional_info(this.newparams).then(
  //       (result) => {
  //         console.log(result);
  //         var jsonBody = result["_body"];
  //         // console.log(jsonBody);
  //         jsonBody = JSON.parse(jsonBody);
  //         // console.log(jsonBody);
  //         // var desc = jsonBody["resp_desc"];
  //         this.resp_code = jsonBody["resp_code"];

  //         if (this.resp_code) {
  //           console.log("get professional info Result = " + this.resp_code);
  //         } else {
  //           this.resp_code = "";
  //         }
  //         return this.resp_code;
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //   }
  // }

  // getallappointments(data) {
  //   if (data) {
  //     setTimeout(() => {
  //       this.data
  //         .get_new_general_appointments_count(data, this.my_person_type)
  //         .then(
  //           (result) => {
  //             console.log(result);
  //             var jsonBody = result["_body"];

  //             if (jsonBody) {
  //               jsonBody = JSON.parse(jsonBody);

  //               if (jsonBody["appointments_total_without_pds"]) {
  //                 this.doc_all_total_count_appoint_counter =
  //                   jsonBody["appointments_total_without_pds"];
  //                 console.log(
  //                   "appointments_total_without_pds = " +
  //                     jsonBody["appointments_total_without_pds"]
  //                 );
  //               }
  //             }

  //             console.log("Jsson body " + jsonBody);
  //           },
  //           (err) => {
  //             console.log("error = " + JSON.stringify(err));
  //           }
  //         );
  //     }, 1);
  //   }
  //}
}
