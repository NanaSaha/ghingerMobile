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
    // this.from_login = this.navParams.get("value");
    // this.event.publish("user_details", this.from_login);

    // this.storage.get("value").then((value) => {
    //   this.from_login_doc = value;
    //   console.log("USer Event DETAILS IN DOC HOME " + this.from_login_doc);

    //   this.event.publish("user_details", this.from_login_doc);
    // });

    this.storage.get("person_type").then((person_type) => {
      this.my_person_type = person_type;
    });

    this.storage.get("person_type").then((person_type) => {
      this.my_person_type = person_type;

      console.log("---------------------------------------------------------");

      if (this.my_person_type) {
        console.log(
          "Person Type VALUE IN DOC PAGE CONSTRUCTOR IS" + this.my_person_type
        );
      }
    });

    this.storage.get("doc_value").then((doc_value) => {
      this.from_login_doc = doc_value;

      // this.event.publish("user_details", this.from_login_doc);

      console.log(
        "--------------------DOC VALUE-------------------------------------" +
          this.from_login_doc
      );

      if (this.from_login_doc) {
        console.log(
          "DOC VALUE IN DOC PAGE CONSTRUCTOR IS" + this.from_login_doc
        );
      }
    });

    this.storage.get("pers_value").then((pers_value) => {
      this.from_login_pers = pers_value;
      // console.log("USer Event DETAILS " + this.event.publish('user_details',this.from_login_pers))

      console.log("---------------------------------------------------------");
      if (this.from_login_pers) {
        console.log(
          "FROM LOGIN PERS IN DOC PAGE CONSTRUCTOR IS" +
            JSON.stringify(this.from_login_pers)
        );
        // this.body1 = Array.of(this.from_login_pers)
        this.jsonBody1 = this.from_login_pers; // this.jsonBody1 = JSON.parse(this.body1);

        console.log("this.jsonBody1  = " + JSON.stringify(this.jsonBody1[0]));
        this.doc_id = this.jsonBody1[0].id;
        console.log("this.doc_id  = " + this.doc_id);

        if (this.doc_id) {
          console.log("VALUE of CONFIRMED DOC REGIS ID IS " + this.doc_id);
        }
      }
    });
    this.storage.get("doc_value2").then((doc_value2) => {
      this.from_regis_id = doc_value2;

      console.log("---------------------------------------------------------");
      if (this.from_regis_id) {
        console.log("FROM LOGIN REGIS ID  IS" + this.from_regis_id);
      }
    });

    this.storage.get("retrieve_user_status").then((retrieve_user_status) => {
      this.retrieve_user_status = retrieve_user_status;

      if (this.retrieve_user_status) {
        console.log(
          "FROM retrieve_user_statusIN DOC PAGE CONSTRUCTOR IS" +
            JSON.stringify(this.retrieve_user_status)
        );
        // this.body1 = Array.of(this.from_login_pers)
        this.jsonBody4 = this.retrieve_user_status; // this.jsonBody1 = JSON.parse(this.body1);

        console.log("this.jsonBody4  = " + JSON.stringify(this.jsonBody4[0]));
        this.active_status = this.jsonBody4[0].active_status;
        console.log("this.active_status  = " + this.active_status);
      }
    });

    console.log("---------------------------------------------------------");

    this.storage.get("value").then((value) => {
      this.from_login = value;
      // this.from_login = this.navParams.get("value");
      this.event.publish("user_details", this.from_login);

      if (this.from_login) {
        console.log(
          "LOGIN DETAILS IN DOC PAGE CONSTRUCTOR IS" + this.from_login
        );
        // this.body = Array.of(this.from_login)
        this.jsonBody = this.from_login; // this.jsonBody = JSON.parse(this.body);

        if (this.jsonBody) {
          if (this.jsonBody[0]) {
            this.registration_number = this.jsonBody[0].registration_number;
            this.email = this.jsonBody[0].id;
            // this.doctor_id = this.jsonBody[0].id;
            console.log(
              "DOctor's Home page this.jsonBody[0].id (doctor_id) = " +
                this.jsonBody[0].id
            );
            this.storage.set("doctor_id", this.jsonBody[0].id);
            this.reg_id = this.jsonBody[0].reg_id;

            if (this.jsonBody[0].surname) {
              this.surname = this.jsonBody[0].surname;
            }
            if (this.jsonBody[0].other_names) {
              this.other_names = this.jsonBody[0].other_names;
            }

            if (this.surname && this.other_names) {
              this.storage.set(
                "doctor_name",
                this.surname + " " + this.other_names
              );
              this.welcome_message(
                this.my_person_type,
                this.surname,
                this.other_names
              );
            }

            if (this.registration_number) {
              console.log(
                "VALUE of registration_number  IS " + this.registration_number
              );
            }
            if (this.jsonBody[0].licence_number) {
              this.storage.set(
                "doctor_licence_number",
                this.jsonBody[0].licence_number
              );
            } else {
              this.storage.set("doctor_licence_number", "");
            }

            if (this.jsonBody[0].email) {
              this.storage.set("doctor_email", this.jsonBody[0].email);
            } else {
              this.storage.set("doctor_email", "");
            }

            if (this.jsonBody[0].mobile_number) {
              this.storage.set(
                "doctor_mobile_number",
                this.jsonBody[0].mobile_number
              );
            } else {
              this.storage.set("doctor_mobile_number", "");
            }

            if (this.email) {
              console.log("VALUE of DOCTOR ID IS " + this.email);
            }
            if (this.reg_id) {
              this.storage.set("reg_id", this.reg_id);
              console.log("VALUE of REG ID IS " + this.reg_id);
            }
          }
        }
      }
    });

    //
    this.storage.get("doctor_id").then((doctor_id) => {
      this.doctor_id = doctor_id;
      console.log(" DoctorPage doctor_id = " + doctor_id);

      if (this.doctor_id) {
        this.getallappointments(this.doctor_id);
      } else {
        this.storage.get("doctor_id").then((doctor_id) => {
          this.doctor_id = doctor_id;

          this.getallappointments(this.doctor_id);
        });
      }
    });
  }

  welcome_message(my_person_type, surname, other_names) {
    if (surname && other_names) {
      if (my_person_type) {
        switch (my_person_type) {
          case "D":
            this.welcome_msg = `Welcome, Dr. ${surname} ${other_names}`;
            break;

          case "N":
            this.welcome_msg = `Welcome, ${surname} ${other_names}`;
            break;

          default:
            this.welcome_msg = `Welcome, ${surname} ${other_names}`;
            break;
        }
      } else {
        this.welcome_msg = `Welcome, ${surname} ${other_names}`;
      }
    } else {
      this.showmessage("Error retrieving User's info");
    }
  }

  ionViewWillEnter() {
    if (this.doctor_id) {
      this.getallappointments(this.doctor_id);
    } else {
      this.storage.get("doctor_id").then((doctor_id) => {
        this.doctor_id = doctor_id;

        this.getallappointments(this.doctor_id);
      });
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DoctorPage");
  }

  subscriptions() {
    this.navCtrl.push(SubscriptionHistoryDocPage, {
      from_login: this.from_login,
    });
  }

  appointments() {
    if (this.active_status == false) {
      this.showalertmessage_default(
        "Ghinger",
        "Your registration has to be confirmed for you to access this menu."
      );
    } else if (this.active_status == true) {
      //pass doc id to appointments page
      this.navCtrl.push(DocappointmentMenuPage, {
        from_login: this.from_login,
      });
    } else {
      this.navCtrl.push(DocappointmentMenuPage, {
        from_login: this.from_login,
      });
    }
  }

  personal() {
    this.checkdocprofinfo = this.checkdocprofesionalinfo(this.reg_id);

    console.log(
      "Personal this.checkdocprofinfo = " +
        this.checkdocprofinfo +
        " this.resp_code" +
        this.resp_code
    );

    if (this.resp_code == "220") {
      let alert = this.alertCtrl.create({
        title: "",
        subTitle:
          "Please complete your registration before you use the service",
        buttons: ["OK"],
      });
      alert.present();
      this.navCtrl.push(AddRegisPage, {
        value: this.from_login,
        doc_value: this.from_regis_id,
      });
    } else {
      this.navCtrl.push(AcceptedApp2Page, { value: this.from_login_pers });
    }
  }

  pds() {
    if (this.active_status == false) {
      this.showalertmessage_default(
        "Ghinger",
        "Your registration has to be confirmed for you to access this menu."
      );
    } else if (this.active_status == true) {
      this.checkdocprofinfo = this.checkdocprofesionalinfo(this.reg_id);
      if (this.reg_id && this.from_login_pers) {
        console.log("Doctor Home this.reg_id = " + this.reg_id);
        this.navCtrl.push(AcceptedApp2Page, { value: this.from_login_pers });
      }
    }
  }

  invoice() {
    if (this.active_status == false) {
      this.showalertmessage_default(
        "Ghinger",
        "Your registration has to be confirmed for you to access this menu."
      );
    } else if (this.active_status == true) {
      this.storage.get("doctor_id").then((doctor_id) => {
        this.doctor_id = doctor_id;
        console.log(
          " REFER PATient button before click : DoctorPage doctor_id = " +
            doctor_id
        );
      });

      this.navCtrl.push(InvoicePage, {
        doctor_id: this.doctor_id,
      });
    }
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

  refresh() {
    this.from_login = this.navParams.get("value");

    this.body = Array.of(this.from_login);
    this.jsonBody = JSON.parse(this.body);
    this.email = this.jsonBody[0].email;

    console.log("THIS IS THE email " + this.email);

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
      this.person_type = this.jsonBody[0].person_type;

      console.log("VALUE of PERSON TYPE  IS " + this.person_type);
    });

    this.data.retrieve_pers(this.params).then((result) => {
      var body = result["_body"];
      body = JSON.parse(body);

      this.retrieve_pers = body;
      this.retrieve_pers = JSON.stringify(body);

      console.log("LETS SEE THE  BODY " + body);
      console.log(
        "LETS SEE THE PERSON INFO DATA RETRIEVED " + this.retrieve_pers
      );

      this.body = Array.of(this.retrieve_pers);
      this.jsonBody = JSON.parse(this.body);
      this.doctor_id = this.jsonBody[0].doctor_id;

      console.log("VALUE of DOCTOR ID IS " + this.doctor_id);

      this.doc_id = JSON.stringify(this.doctor_id);
      this.jsonBody1 = JSON.parse(this.doc_id);
      console.log("THIS IS THE JSON VALUES " + this.jsonBody1);

      this.doc_params = {
        id: this.doctor_id2,
      };

      this.doc_params2 = {
        id: this.doctor_id,
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

          this.retrieve_doc3 = body;
          this.retrieve_doc3 = JSON.stringify(body);
          console.log(
            "LETS SEE THE DOCTOR INFO DATA RETRIEVED " + this.retrieve_doc3
          );
        }
      });
    });

    loader.dismiss();
  }

  checkdocprofesionalinfo(doc_id) {
    // licence_number
    //pass doc id to api to check if licence_number is empty.

    if (doc_id) {
      this.newparams = {
        doc_id: doc_id,
      };

      this.data.get_professional_info(this.newparams).then(
        (result) => {
          console.log(result);
          var jsonBody = result["_body"];
          // console.log(jsonBody);
          jsonBody = JSON.parse(jsonBody);
          // console.log(jsonBody);
          // var desc = jsonBody["resp_desc"];
          this.resp_code = jsonBody["resp_code"];

          if (this.resp_code) {
            console.log("get professional info Result = " + this.resp_code);
          } else {
            this.resp_code = "";
          }
          return this.resp_code;
        },
        (err) => {
          console.log(err);
        }
      );
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

  getallappointments(data) {
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

                if (jsonBody["appointments_total_without_pds"]) {
                  this.doc_all_total_count_appoint_counter =
                    jsonBody["appointments_total_without_pds"];
                  console.log(
                    "appointments_total_without_pds = " +
                      jsonBody["appointments_total_without_pds"]
                  );
                }
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

  showalertmessage_default(titlemsg, mainmsg) {
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: ["OK"],
    });
    alert.present();
  }
}
