import { Component, ViewChild } from "@angular/core";
import {
  MenuController,
  NavController,
  NavParams,
  App,
  Events,
} from "ionic-angular";
import { CompleteTestService } from "../../providers/complete-test-service/complete-test-service";
import { MedAppointPage } from "../med-appoint/med-appoint";
import { PersonalWelPage } from "../personal-wel/personal-wel";
import { VidConsultPage } from "../vid-consult/vid-consult";
import { LabHistoryPage } from "../lab-history/lab-history";
import { MedicationSearchPage } from "../medication-search/medication-search";
import { HomeSearchPage } from "../home-search/home-search";
import { DocHistoryPage } from "../doc-history/doc-history";
import { LocationPage } from "../location/location";
import { LoginPage } from "../login/login";
import { SearchPage } from "../search/search";
import { Search2Page } from "../search2/search2";
import { MedicationhistoryPage } from "../medicationhistory/medicationhistory";
import { LabSearchPage } from "../lab-search/lab-search";
import { DataProvider } from "../../providers/data/data";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { MedappointmentdetailsPage } from "../medappointmentdetails/medappointmentdetails";
import { Labhistory1Page } from "../labhistory1/labhistory1";
import { VideoconsulthistoryPage } from "../videoconsulthistory/videoconsulthistory";
import { HomecarehistoryPage } from "../homecarehistory/homecarehistory";
import { doctornewappointmentTabsPage } from "../doctornewappointment/doctornewappointment";
import { DoctorgeneralappointmentsTabsPage } from "../doctor_general_appointments/doctor_general_appointments";
import { DoctorpdsappointmentsTabsPage } from "../doctor_pds_appointments/doctor_pds_appointments";
import { Storage } from "@ionic/storage";

const NOT_PERMITTED =
  "Please your account has not been verified. Kindly be patient. An agent would speak to you soon to get your account active!";
const NOT_PERMITTED2 =
  "You are not allowed to order for personal doctor service.";

@Component({
  selector: "page-docappointmentmenu",
  templateUrl: "docappointmentmenu.html",
})
export class DocappointmentMenuPage {
  @ViewChild("searchbar")
  searchbar: any;
  from_login: any = [];
  from_login_doc: any = [];
  from_login_pers: any = [];
  messageList: any;
  person_type_id: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];
  parsed_name: any;
  requester_id: any;
  patient_id: any;
  doc_id: any;
  doc_id1: any;
  doc_id2: any;
  data1: any = [];
  email: any;
  retrieve: string;
  retrieve1: string;
  retrieve_pers: string;
  retrieve_doc: string;
  retrieve_doc3: string;
  body1: any;
  jsonBody1: any;
  person_type: any;
  person_type1: any;
  doctor_id: any;
  id: any;
  doctor_id2: any;
  doc_params: any = [];
  doc_params2: any = [];

  body2: any;
  retrieve2: any;
  jsonBody2: any;
  person_type2: any;
  doctor_id3: any;
  body3: any;
  retrieve3: any;
  jsonBody3: any;
  person_type3: any;
  body4: any;
  retrieve4: any;
  jsonBody4: any;
  body5: any;
  retrieve5: any;
  jsonBody5: any;

  myparams: any;
  newparams: any;
  appointment_statistics1: any = [];
  myjsonBody: any;
  my_person_type: string;

  doc_new_total_count_appoint_counter: any;
  doc_general_total_count_appoint_counter: any;
  total_doc_pds_appointment_count: any;

  overall_total_count_all_appointment: any;

  constructor(
    public app: App,
    public menuCtrl: MenuController,
    public data: DataProvider,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public completeTestService: CompleteTestService,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public events: Events
  ) {
    this.menuCtrl.enable(true);
    // this.from_login = this.navParams.get('value')
    this.from_login_doc = this.navParams.get("doc_value");
    this.from_login_pers = this.navParams.get("pers_value");
    this.from_login = this.navParams.get("from_login");

    this.storage.get("person_type").then((person_type) => {
      this.my_person_type = person_type;

      console.log("---------------------------------------------------------");

      if (this.my_person_type) {
        console.log(
          "Person Type VALUE IN DOC PAGE CONSTRUCTOR IS" + this.my_person_type
        );
      }
    });

    if (this.from_login) {
      console.log(
        "LOGIN DETAILS IN MENU PAGE CONSTRUCTOR IS" + this.from_login
      );
      console.log(
        "LOGIN DETAILS IN MENU PAGE CONSTRUCTOR IS" +
          JSON.stringify(this.from_login)
      );

      this.body2 = this.from_login;

      this.retrieve2 = this.body2;

      console.log("PADMORE, LETS SEE THE  BODY " + this.body2);
      console.log(
        "PADMORE, LETS SEE THE DATA RETRIEVED " + JSON.stringify(this.retrieve2)
      );

      if (this.retrieve2) {
        this.body2 = this.retrieve2;
        this.jsonBody2 = this.body2;
        console.log(JSON.stringify(this.jsonBody2));
        this.person_type2 = this.jsonBody2[0].user_type;
        this.doctor_id3 = this.jsonBody2[0].id;

        if (this.doctor_id3) {
          this.storage.set("doctor_id", this.doctor_id3);
        }

        console.log(
          "PADMORE, THIS JSON BODY IN MENU PAGE CONSTRUCTOR IS" + this.jsonBody2
        );
        console.log(
          "PADMORE, LETS SEE person_type2 RETRIEVED " + this.person_type2
        );
        console.log(
          "PADMORE, LETS SEE doctor_id3 RETRIEVED " + this.doctor_id3
        );
      }

      this.body3 = this.from_login;
      this.retrieve3 = this.body3;

      console.log("THIS.BODY IN MENU PAGE CONSTRUCTOR IS" + this.body3);
      this.jsonBody3 = this.body3;
      this.requester_id = this.jsonBody3[0].id;
      this.email = this.jsonBody3[0].email;

      if (this.email) {
        console.log("email HERE IS " + this.email);
      }

      if (this.requester_id) {
        console.log("VALUE of requester IN Menu  IS " + this.requester_id);
        this.myparams = {
          requester_id: this.requester_id,
        };

        this.newparams = JSON.stringify(this.myparams);
        console.log("line 185 - menu = newparams " + this.newparams);
        // this.appointment_statistics();
      }
    }

    if (this.from_login_doc) {
      console.log(
        "LOGIN DETAILS from LOGIN DOC IN MENU PAGE FOR CONSTRUCTOR IS" +
          this.from_login_doc
      );
    }

    if (this.from_login_pers) {
      console.log(
        "LOGIN PERS VALUE IN MENU PAGE CONSTRUCTOR IS" + this.from_login_pers
      );
      console.log("Padmore,Menu.ts line 149");
      //another badge
      console.log("this.from_login_pers = " + this.from_login_pers);
      // this.body4 = JSON.parse(this.from_login_pers);
      this.body4 = this.from_login_pers;
      // this.retrieve4 = JSON.stringify(this.body4);
      this.retrieve4 = this.body4;
      console.log("Padmore,Menu.ts line 153");
      // this.body4 = Array.of(this.retrieve4);
      // this.jsonBody4 = JSON.parse(this.body4);
      this.jsonBody4 = this.body4;
      console.log("Padmore,Menu.ts line 156");
      this.doc_id = this.jsonBody4[0].doctor_id;
      this.doc_id2 = this.jsonBody4[0].id;
      console.log("Padmore,Menu.ts line 159");
      this.person_type_id = this.jsonBody4[0].person_type_id;
      // this.check = this.jsonBody[0]
      if (this.person_type_id) {
        console.log(
          "Padmore,Menu.ts line 162 - person_type_id = " + this.person_type_id
        );
        console.log(
          "VALUE of PERSON TYPE VALUE IN Menu  IS " + this.person_type_id
        );
      }

      if (this.doc_id) {
        console.log("VALUE of DOCTOR ID IN Menu  IS " + this.doc_id);
      }

      if (this.doc_id2) {
        console.log(
          "VALUE of DOCTOR ID FROM DOC MODULE IN Menu  IS " + this.doc_id2
        );
      }
    }

    console.log(
      "-------------------------------BEGIN TEST-----------------------------------------------"
    );
    if (this.navParams.get) {
      console.log("PADMORE, Nav params values = " + this.navParams.get);
    }

    console.log(
      "-------------------------------END TEST-----------------------------------------------"
    );

    if (this.doctor_id3) {
      this.getnewappointments(this.doctor_id3);
    } else {
      this.storage.get("doctor_id").then((doctor_id) => {
        this.doctor_id = doctor_id;
        this.getnewappointments(this.doctor_id);
      });
    }
  }

  openMenu() {
    if (this.menuCtrl.isOpen()) {
      console.log("is open");
    }
    if (this.menuCtrl.isEnabled()) {
      console.log("is enabled");
    }

    this.menuCtrl.toggle();
    this.menuCtrl.open();
  }

  // ionViewDidLeave(){
  //     this.navCtrl.pop();
  // }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);

    this.events.subscribe("doc_total_new_appoint_counter:refreshpage", () => {
      if (this.doctor_id) {
        this.getnewappointments(this.doctor_id);
      } else {
        this.storage.get("doctor_id").then((doctor_id) => {
          this.doctor_id = doctor_id;
          console.log(
            " Docgeneralappointmentlists page doctor_id = " + doctor_id
          );

          this.getnewappointments(this.doctor_id);
        });
      }
    });
  }

  original_getnewappointments(data) {
    if (data) {
      let loading = this.loadingCtrl.create({
        content: "Please wait...",
      });

      loading.present();

      setTimeout(() => {
        this.data
          .get_new_general_appointments_count(data, this.my_person_type)
          .then(
            (result) => {
              console.log(result);
              var jsonBody = result["_body"];

              if (jsonBody) {
                jsonBody = JSON.parse(jsonBody);

                if (jsonBody["total_count"]) {
                  if (jsonBody["total_count"][0].counter) {
                    this.doc_new_total_count_appoint_counter =
                      jsonBody["total_count"][0].counter;
                  }
                }

                if (jsonBody["total_doc_gen_appointment_count"]) {
                  if (jsonBody["total_doc_gen_appointment_count"][0].counter) {
                    this.doc_general_total_count_appoint_counter =
                      jsonBody["total_doc_gen_appointment_count"][0].counter;
                  }
                }

                if (jsonBody["total_doc_pds_appointment_count"]) {
                  if (jsonBody["total_doc_pds_appointment_count"][0].counter) {
                    this.total_doc_pds_appointment_count =
                      jsonBody["total_doc_pds_appointment_count"][0].counter;
                  }
                }

                // console.log("get_new_general_appointments_count = "+JSON.stringify(jsonBody));

                // if(jsonBody["all_appointments_overall_total"]){
                //   console.log("all_appointments_overall_total = "+jsonBody["all_appointments_overall_total"])
                // }

                console.log(
                  JSON.stringify(this.doc_new_total_count_appoint_counter)
                );
                // this.storage.set("doc_new_total_count_appoint_counter", JSON.stringify(this.doc_new_gen_appoint_counter));
              }

              loading.dismiss();

              console.log("Jsson body " + jsonBody);
            },
            (err) => {
              loading.dismiss();
              console.log("error = " + JSON.stringify(err));
            }
          );
        loading.dismiss();
      }, 1);
    }
  }

  getnewappointments(data) {
    this.storage.get("person_type").then((person_type) => {
      this.my_person_type = person_type;

      console.log("---------------------------------------------------------");

      if (this.my_person_type) {
        console.log(
          "Person Type VALUE IN DOC PAGE CONSTRUCTOR IS" + this.my_person_type
        );

        if (data) {
          setTimeout(() => {
            this.data
              .get_new_general_appointments_count(data, this.my_person_type)
              .then(
                (result) => {
                  console.log(result);
                  var jsonBody = result["_body"];

                  if (jsonBody) {
                    jsonBody = JSON.parse(jsonBody);

                    if (jsonBody["total_count"]) {
                      if (jsonBody["total_count"][0].counter) {
                        this.doc_new_total_count_appoint_counter =
                          jsonBody["total_count"][0].counter;
                      }
                    }

                    if (jsonBody["total_doc_gen_appointment_count"]) {
                      if (
                        jsonBody["total_doc_gen_appointment_count"][0].counter
                      ) {
                        this.doc_general_total_count_appoint_counter =
                          jsonBody[
                            "total_doc_gen_appointment_count"
                          ][0].counter;
                      }
                    }

                    if (jsonBody["total_doc_pds_appointment_count"]) {
                      if (
                        jsonBody["total_doc_pds_appointment_count"][0].counter
                      ) {
                        this.total_doc_pds_appointment_count =
                          jsonBody[
                            "total_doc_pds_appointment_count"
                          ][0].counter;
                      }
                    }

                    // console.log("get_new_general_appointments_count = "+JSON.stringify(jsonBody));

                    // if(jsonBody["all_appointments_overall_total"]){
                    //   console.log("all_appointments_overall_total = "+jsonBody["all_appointments_overall_total"])
                    // }

                    console.log(
                      JSON.stringify(this.doc_new_total_count_appoint_counter)
                    );
                    // this.storage.set("doc_new_total_count_appoint_counter", JSON.stringify(this.doc_new_gen_appoint_counter));
                  }

                  console.log("Jsson body " + jsonBody);
                },
                (err) => {
                  console.log("error = " + JSON.stringify(err));
                }
              );
          }, 1);
        }
      }
    });
  }

  appointment_statistics() {
    console.log("newparams = " + this.newparams);
    this.myjsonBody = JSON.parse(this.newparams);

    // console.log("myjsonBody = "+this.myjsonBody);
    this.data.appointment_statistics(this.myjsonBody).then((result) => {});
  }

  new_appointments() {
    this.navCtrl.push(doctornewappointmentTabsPage, {
      from_login: this.from_login,
      my_person_type: this.my_person_type,
    });
  }

  gen_appointments() {
    this.navCtrl.push(DoctorgeneralappointmentsTabsPage, {
      from_login: this.from_login,
      my_person_type: this.my_person_type,
    });
  }

  pds_appointments() {
    this.navCtrl.push(DoctorpdsappointmentsTabsPage, {
      from_login: this.from_login,
      my_person_type: this.my_person_type,
    });
  }

  doc_history() {
    if (this.requester_id == null) {
      let alert = this.alertCtrl.create({
        title: "",
        subTitle: NOT_PERMITTED,
        buttons: ["OK"],
      });
      alert.present();
    }

    if (this.doc_id == null && this.person_type_id == "D") {
      let alert = this.alertCtrl.create({
        title: "",
        subTitle: NOT_PERMITTED2,
        buttons: ["OK"],
      });
      alert.present();
    }

    if (this.doc_id != null) {
      console.log("pushing to personalwelpage");

      this.navCtrl.push(PersonalWelPage, {
        value: this.from_login,
        doc_value: this.from_login_doc,
        pers_value: this.from_login_pers,
      });
    }

    if (
      this.requester_id != null &&
      this.doc_id == null &&
      this.person_type_id == "C"
    ) {
      console.log("pushing to locationpage");

      // this.navCtrl.push(LocationPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers });

      let modal = this.modalCtrl.create(LocationPage, {
        value: this.from_login,
        pers_value: this.from_login_pers,
        doc_value: this.from_login_doc,
      });

      modal.present();
    }
  }

  video(appointmentType) {
    // console.log(" appointmentType = "+appointmentType);
    if (this.requester_id == null) {
      let alert = this.alertCtrl.create({
        title: "",
        subTitle: NOT_PERMITTED,
        buttons: ["OK"],
      });
      alert.present();
    } else {
      this.navCtrl.push(VideoconsulthistoryPage, {
        value: this.from_login,
        doc_value: this.from_login_doc,
        pers_value: this.from_login_pers,
        appointmentType: appointmentType,
      });
    }
  }

  home(appointmentType) {
    if (this.requester_id == null) {
      let alert = this.alertCtrl.create({
        title: "",
        subTitle: NOT_PERMITTED,
        buttons: ["OK"],
      });
      alert.present();
    } else {
      this.navCtrl.push(HomecarehistoryPage, {
        value: this.from_login,
        doc_value: this.from_login_doc,
        pers_value: this.from_login_pers,
        appointmentType: appointmentType,
      });
    }
  }

  refresh() {
    this.from_login = this.navParams.get("value");
    // this.body = Array.of(this.from_login)
    this.body = this.from_login;
    // this.jsonBody = JSON.parse(this.body);
    this.jsonBody = this.body;
    this.requester_id = this.jsonBody[0].id;
    this.email = this.jsonBody[0].email;
    this.check = this.jsonBody[0];

    // this.body = Array.of(this.from_login_pers)
    // this.jsonBody = JSON.parse(this.body);
    this.body = this.from_login_pers;
    this.jsonBody = this.body;
    this.doc_id = this.jsonBody[0].doctor_id;
    this.check = this.jsonBody[0];

    console.log("email HERE IS " + this.email);
    console.log("VALUE of requester IN Menu  IS " + this.requester_id);
    console.log("VALUE of DOCTOR ID IN Menu  IS " + this.doc_id);

    console.log("THIS IS THE email " + this.email);
    //  console.log ("THIS IS THE JSON PARSED email " + this.parsed_name)

    this.params = {
      email: this.email,
    };

    let loader = this.loadingCtrl.create({
      content: "Refreshing ...",
    });

    loader.present();

    this.data.retrieve1(this.params).then((result) => {
      var body1 = result["_body"];
      body1 = JSON.parse(body1);

      this.retrieve1 = body1;
      this.retrieve1 = JSON.stringify(body1);

      console.log("LETS SEE THE  BODY " + body1);
      console.log("LETS SEE THE DATA RETRIEVED " + this.retrieve1);

      this.body1 = Array.of(this.retrieve1);
      this.jsonBody1 = JSON.parse(this.body1);
      this.person_type1 = this.jsonBody1[0].user_type;
      this.doctor_id2 = this.jsonBody1[0].id;

      console.log("-----------------------------------------------------");
      console.log("VALUE of USER TYPE  IS " + this.person_type1);
      console.log("VALUE of REGIS ID  IS " + this.doctor_id2);
      console.log("-----------------------------------------------------");
    });

    this.data.retrieve(this.params).then((result) => {
      var body = result["_body"];
      body = JSON.parse(body);

      this.retrieve = body;
      this.retrieve = JSON.stringify(body);

      console.log("-----------------------------------------------------");
      console.log(
        "-----------------THIS IS A LOG IN RETRIEVAL------------------------------------"
      );
      console.log("LETS SEE THE  BODY " + body);
      console.log("LETS SEE THE DATA RETRIEVED " + this.retrieve);
      console.log("-----------------------------------------------------");

      this.body = Array.of(this.retrieve);
      this.jsonBody = JSON.parse(this.body);
      this.person_type = this.jsonBody[0].person_type_id;
      this.requester_id = this.jsonBody[0].id;

      console.log("VALUE of PERSON TYPE  IS " + this.person_type);
      console.log("VALUE of requester IN Menu  IS " + this.requester_id);
    });

    this.data.retrieve_pers(this.params).then((result) => {
      var body = result["_body"];
      body = JSON.parse(body);

      this.from_login_pers = body;
      this.from_login_pers = JSON.stringify(body);

      console.log("LETS SEE THE  BODY " + body);
      console.log(
        "LETS SEE THE PERSON INFO DATA RETRIEVED " + this.from_login_pers
      );

      this.body = Array.of(this.from_login_pers);
      this.jsonBody = JSON.parse(this.body);
      this.doc_id = this.jsonBody[0].doctor_id;

      console.log("VALUE of DOCTOR ID IS " + this.doc_id);

      this.doc_id1 = JSON.stringify(this.doc_id);
      this.jsonBody1 = JSON.parse(this.doc_id1);
      console.log("THIS IS THE JSON VALUES " + this.jsonBody1);

      this.doc_params = {
        id: this.doctor_id2,
      };

      this.doc_params2 = {
        id: this.doc_id,
      };
      console.log("------------DOC PARAMS----------");
      console.log(this.doc_params);

      this.data.retrieve_doc(this.doc_params).then((result) => {
        var body = result["_body"];
        body = JSON.parse(body);

        this.retrieve_doc = body;
        this.retrieve_doc = JSON.stringify(body);
        console.log(
          "LETS SEE THE DOCTOR INFO DATA RETRIEVED " + this.retrieve_doc
        );
      });

      this.data.retrieve_doc(this.doc_params2).then((result) => {
        var body = result["_body"];
        console.log("LETS SEE BODY " + body);
        if (body == "") {
          console.log("BODY IS EMPTY");
        } else {
          body = JSON.parse(body);

          this.from_login_doc = body;
          this.from_login_doc = JSON.stringify(body);
          console.log(
            "LETS SEE THE DOCTOR INFO DATA RETRIEVED " + this.from_login_doc
          );
        }
      });
    });
    loader.dismiss();
  }
}
