import { Component, ViewChild } from "@angular/core";

import { PersonaldoctorserviceappointmentsPage } from "../personaldoctorserviceappointments/personaldoctorserviceappointments";
import { DocgeneralappointmentlistsPage } from "../docgeneralappointmentlists/docgeneralappointmentlists";
import { PersonaldoctorserviceappointmentlistsPage } from "../personaldoctorserviceappointmentlists/personaldoctorserviceappointmentlists";
import { Storage } from "@ionic/storage";
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
import { CompleteTestService } from "../../providers/complete-test-service/complete-test-service";

import "rxjs/add/operator/map";

@Component({
  templateUrl: "doctornewappointment.html",
})
export class doctornewappointmentTabsPage {
  public doc_new_gen_appoint_counter: any;
  gen_appoint_counter: any;
  doctor_id: any;
  doc_new_pds_appoint_counter: any;
  my_person_type: string;
  token;

  // tab1Root = HomePage;
  tab1Root = DocgeneralappointmentlistsPage;
  // tab3Root = PersonaldoctorserviceappointmentlistsPage;

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
    public toastCtrl: ToastController,
    public storage: Storage,
    public events: Events
  ) {
    this.storage.get("token").then((token) => {
      this.token = token;
      console.log("TOKEN IN MENu " + this.token);
    });

    // this.my_person_type = this.navParams.get("my_person_type");
    // console.log(
    //   "doctornewappointmentTabsPage my_person_type = " + this.my_person_type
    // );
    // if (!this.my_person_type){
    //   this.storage.get('person_type').then((person_type) => {
    //     this.my_person_type = person_type
    //     console.log("---------------------------------------------------------")
    //     if (this.my_person_type) {
    //       console.log('Person Type VALUE IN doctornewappointmentTabsPage = ' + this.my_person_type);
    //     }
    //   });
    // }
    // if (this.doctor_id) {
    //   this.getgeneralappointments(this.doctor_id);
    // } else {
    //   this.storage.get('doctor_id').then((doctor_id) => {
    //     this.doctor_id = doctor_id;
    //     console.log(' Docgeneralappointmentlists page doctor_id = ' + doctor_id);
    //     this.getgeneralappointments(this.doctor_id);
    //   });
    // }
    // this.events.subscribe('doc_new_appoint_counter:refreshpage', () => {
    //   if (this.doctor_id) {
    //     this.getgeneralappointments(this.doctor_id);
    //   } else {
    //     this.storage.get('doctor_id').then((doctor_id) => {
    //       this.doctor_id = doctor_id;
    //       console.log(' Docgeneralappointmentlists page doctor_id = ' + doctor_id);
    //       this.getgeneralappointments(this.doctor_id);
    //     });
    //   }
    // });
  }

  // ionViewWillEnter() {

  //   this.events.subscribe('doc_new_appoint_counter:refreshpage', () => {

  //     if (this.doctor_id) {
  //       this.getgeneralappointments(this.doctor_id);
  //     } else {
  //       this.storage.get('doctor_id').then((doctor_id) => {
  //         this.doctor_id = doctor_id;
  //         console.log(' Docgeneralappointmentlists page doctor_id = ' + doctor_id);

  //         this.getgeneralappointments(this.doctor_id);
  //       });
  //     }

  //   });

  // }

  // genappointments_func(data,my_person_type){

  //   this.events.publish('doc_total_new_appoint_counter:refreshpage');

  //   if (data) {

  //     setTimeout(() => {

  //       this.data.get_new_general_appointments_count(data,my_person_type)
  //         .then(result => {
  //           console.log(result);
  //           var jsonBody = result["_body"];
  //           console.log("jsonBody = " + JSON.stringify(jsonBody));
  //           if (jsonBody) {

  //             jsonBody = JSON.parse(jsonBody);

  //             console.log("jsonBody['general_count'] = " + JSON.stringify(jsonBody["general_count"]));

  //             if (jsonBody["general_count"]) {

  //               this.doc_new_gen_appoint_counter = jsonBody["general_count"][0];

  //               console.log(JSON.stringify(this.doc_new_gen_appoint_counter));
  //               this.storage.set("doc_new_gen_appoint_counter", JSON.stringify(this.doc_new_gen_appoint_counter));

  //             }

  //             else {
  //               this.doc_new_gen_appoint_counter = 0;
  //               this.storage.set("doc_new_gen_appoint_counter", "");
  //             }

  //             if (jsonBody["pds_count"][0]) {
  //               this.doc_new_pds_appoint_counter = jsonBody["pds_count"][0].counter;
  //             }
  //             else if (jsonBody["pds_count"]){
  //               this.doc_new_pds_appoint_counter = jsonBody["pds_count"];
  //             }else {
  //               this.doc_new_pds_appoint_counter = 0;
  //             }

  //           }

  //           console.log("Jsson body " + jsonBody);
  //         }, (err) => {

  //           console.log("error = " + JSON.stringify(err));
  //         });

  //     }, 1);
  //   }

  // }

  // getgeneralappointments(data) {

  //   if (!this.my_person_type){
  //     this.storage.get('person_type').then((person_type) => {
  //       this.my_person_type = person_type
  //       this.genappointments_func(data,this.my_person_type);

  //       if (this.my_person_type) {
  //         console.log('Person Type VALUE IN doctornewappointmentTabsPage = ' + this.my_person_type);
  //       }
  //     });
  //   }else{
  //     this.genappointments_func(data,this.my_person_type);
  //   }

  // }
}
