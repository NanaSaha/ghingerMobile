import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
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

@Component({
  selector: "page-doctor",
  templateUrl: "doctor.html",
})
export class DoctorPage {
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
  doctor_id: any;
  id: any;
  doctor_id2: any;
  doc_params: any = [];
  doc_params2: any = [];
  newparams: any;

  body2: any;
  jsonBody2: any;
  resp_code: any;
  checkdocprofinfo: any;

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {
    this.from_login = this.navParams.get("value");
    this.from_login_doc = this.navParams.get("doc_value");
    this.from_login_pers = this.navParams.get("pers_value");
    this.from_regis_id = this.navParams.get("doc_value2");

    console.log("---------------------------------------------------------");
    console.log("LOGIN DETAILS IN DOC PAGE CONSTRUCTOR IS" + this.from_login);
    console.log("---------------------------------------------------------");
    console.log("DOC VALUE IN DOC PAGE CONSTRUCTOR IS" + this.from_login_doc);
    console.log("---------------------------------------------------------");
    console.log(
      "FROM LOGIN PERS IN DOC PAGE CONSTRUCTOR IS" + this.from_login_pers
    );
    console.log("---------------------------------------------------------");
    console.log("FROM LOGIN REGIS ID  IS" + this.from_regis_id);
    console.log("---------------------------------------------------------");

    this.body = Array.of(this.from_login);
    this.jsonBody = JSON.parse(this.body);
    this.registration_number = this.jsonBody[0].registration_number;
    this.email = this.jsonBody[0].id;
    this.reg_id = this.jsonBody[0].reg_id;

    this.body1 = Array.of(this.from_login_pers);
    this.jsonBody1 = JSON.parse(this.body1);
    this.doc_id = this.jsonBody1[0].id;

    console.log("VALUE of registration_number  IS " + this.registration_number);
    console.log("VALUE of DOCTOR ID IS " + this.email);
    console.log("VALUE of REG ID IS " + this.reg_id);
    console.log("VALUE of CONFIRMED DOC REGIS ID IS " + this.doc_id);

    // this.body2 = Array.of(this.from_regis_id);
    // this.jsonBody2 = JSON.parse(this.body2);
    // // this.email = this.jsonBody[0].id

    // console.log(" Doc ID DATA = "+this.jsonBody[0].id + " Actual ID = "+this.reg_id);

    // this.checkdocprofesionalinfo(this.reg_id);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DoctorPage");
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
    }
    // if (this.reg_id == null) {
    //   let alert = this.alertCtrl.create({
    //     title: "",
    //     subTitle: "Your registration has to be confirmed for you to access these menus",
    //     buttons: ['OK']
    //   });
    //   alert.present();

    // }
    else {
      this.navCtrl.push(AcceptedApp2Page, { value: this.from_login_pers });
    }
  }

  accept() {
    this.checkdocprofinfo = this.checkdocprofesionalinfo(this.reg_id);

    if (this.resp_code == "220") {
      // if (this.registration_number == null) {
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
    }
    if (this.reg_id == null) {
      let alert = this.alertCtrl.create({
        title: "",
        subTitle:
          "Your registration has to be confirmed for you to access these menus",
        buttons: ["OK"],
      });
      alert.present();
    } else {
      this.navCtrl.push(AcceptedAppPage, { value: this.from_login_pers });
    }
  }

  refer() {
    let modal = this.modalCtrl.create(ReferPage);

    modal.present();
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

        console.log("get professional info Result = " + this.resp_code);

        return this.resp_code;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
