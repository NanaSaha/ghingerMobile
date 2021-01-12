import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
// // import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
import { MedicationdetailsPage } from "../medicationdetails/medicationdetails";
import { VidConsultPage } from "../vid-consult/vid-consult";
import { VideoconsultdetailsPage } from "../videoconsultdetails/videoconsultdetails";
import { HomeSearchPage } from "../home-search/home-search";
import { HomecaredetailsPage } from "../homecaredetails/homecaredetails";
import { DocgeneralappointmentDetailsPage } from '../docgeneralappointmentdetails/docgeneralappointmentdetails';
import { Storage } from '@ionic/storage';
import { ForkJoinObservable } from 'rxjs/observable/ForkJoinObservable';

@Component({
  selector: 'page-docgeneralappointmentlists',
  templateUrl: 'docgeneralappointmentlists.html',
})
export class DocgeneralappointmentlistsPage {
  @ViewChild('searchbar') myInput;
  @ViewChild('input')
  // searchbar: any;

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
  pds_appointments: any = [];
  content: any = [];
  rowid: any;
  appointmentType: any;
  doctor_id: any;
  gen_appoint_details: any;
  gen_appoint_counter: any;
  gen_appointment_msg : any;
  my_person_type : string;

  constructor(
    // private keyboard: Keyboard,
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController, public toastCtrl: ToastController, public storage: Storage, public events: Events) {

    // console.log("We are in Home Care Consult Appointments History page");
    this.get_genappointment_records();

    // events.subscribe('docgeneralappointmentlists:refreshpage', () => {
    //   this.get_genappointment_records();
    // });

    this.storage.get('person_type').then((person_type) => {
      this.my_person_type = person_type
    });

  }

  get_genappointment_records() {
    this.from_login = this.navParams.get('value');

    this.from_login2 = this.navParams.get('pers_value');
    this.from_login3 = this.navParams.get('doc_value');
    this.appointmentType = this.navParams.get("appointmentType");
    // console.log('VALUE IN TABS CONSTRUCTOR IS' + this.from_login);

    if (this.doctor_id && this.my_person_type) {
      this.getgeneralappointments(this.doctor_id,this.my_person_type);
    } else {
      this.storage.get('doctor_id').then((doctor_id) => {
        console.log(`doctor_id = ${doctor_id}`);
        this.doctor_id = doctor_id;
        this.storage.get('person_type').then((person_type) => {
          this.my_person_type = person_type
          this.getgeneralappointments(this.doctor_id,person_type);
        });

        
      });
    }

    if (this.from_login) {
      this.body = Array.of(this.from_login);
      this.jsonBody = JSON.parse(this.body);

      if (this.jsonBody[0]) {
        if (this.jsonBody[0].id) {
          this.requester_id1 = this.jsonBody[0].id;
        }
      }
    }


    // this.check = this.jsonBody[0];

    if (this.requester_id1) {
      if (this.appointmentType) {
        this.params = {
          "requester_id": this.requester_id1,
          "appointment_type_id": this.appointmentType
        }

        if (this.params) {
          this.newparams = JSON.stringify(this.params);
          console.log("New params " + this.newparams);
        }
      }
    }
  }

  ionViewWillEnter() {
    this.get_genappointment_records();
    this.events.subscribe('docgeneralappointmentlists:refreshpage', () => {
      // this.get_genappointment_records();
      if (this.my_person_type){
        // this.event_getgeneralappointments(this.doctor_id,this.my_person_type);
      }else{
        this.storage.get('person_type').then((person_type) => {
          this.my_person_type = person_type
          // this.event_getgeneralappointments(this.doctor_id,person_type);
        });
      }
      
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  accept_pds_appt(appt_id) {
    //make request to accept pds appt with id= appt_id
    this.showalertmessage("Ghinger", "This action cannot be taken at the moment.");

    //the desired action: show this prompt: You are about to accept the selected appointment, do you want to continue?
  }

  decline_pds_appt(appt_id) {
    //make request to decline pds appt with id= appt_id
    this.showalertmessage("Ghinger", "This action cannot be taken at the moment.");
  }

  openNewAppointment() {

    this.navCtrl.push(HomeSearchPage, {
      value: this.from_login, doc_value: this.from_login3, pers_value: this.from_login2, appointmentType: this.appointmentType
    });
  }

  getgeneralappointments(data,my_person_type) {

    if (data) {

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      setTimeout(() => {

        this.data.get_new_general_appointments(data,my_person_type)
          .then(result => {
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);

            if(jsonBody){
              if(jsonBody["resp_code"]){
                if(jsonBody["resp_code"] == "119"){
                  this.gen_appointment_msg = jsonBody["resp_desc"];

                  this.gen_appoint_details = "";
                  this.gen_appoint_counter = "";
                  this.storage.set("doc_new_gen_appoint_counter", "");
                }else{
                  if(jsonBody["records"]){
                    this.gen_appoint_details = jsonBody["records"];
      
                    this.gen_appoint_counter = jsonBody["count"];
                    // console.log(JSON.stringify(this.gen_appoint_counter));
                    this.storage.set("doc_new_gen_appoint_counter", JSON.stringify(this.gen_appoint_counter));
                  }
                }
              }
              console.log("Jsson body " + jsonBody);
            }

            loading.dismiss();
            

          }, (err) => {
            loading.dismiss();
            this.showalertmessage("Ghinger", "Please ensure all details provided are correct.");
            this.toastCtrl.create({
              message: "Please ensure all details provided are correct.",
              duration: 5000
            }).present();
            // loader.dismiss();
            console.log("error = " + JSON.stringify(err));
          });

      }, 1);
    }

  }

  event_getgeneralappointments(data,my_person_type) {

    if (data) {

      setTimeout(() => {

        this.data.get_new_general_appointments(data,my_person_type)
          .then(result => {
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);

            if(jsonBody["resp_code"]){
              if(jsonBody["resp_code"] == "119"){
                this.gen_appointment_msg = jsonBody["resp_desc"];

                this.gen_appoint_details = "";
    
                  this.gen_appoint_counter = "";
              }else{
                if(jsonBody["records"]){
                  this.gen_appoint_details = jsonBody["records"];
    
                  this.gen_appoint_counter = jsonBody["count"];
                  // console.log(JSON.stringify(this.gen_appoint_counter));
                  this.storage.set("doc_new_gen_appoint_counter", JSON.stringify(this.gen_appoint_counter));
                }
              }
            }

          }, (err) => {
            this.showalertmessage("Ghinger", "Please ensure all details provided are correct.");
            this.toastCtrl.create({
              message: "Please ensure all details provided are correct.",
              duration: 5000
            }).present();
            // loader.dismiss();
            console.log("error = " + JSON.stringify(err));
          });

      }, 1);
    }

  }


  public doRefresh(refresher) {
    // console.log('Begin async operation');

    setTimeout(() => {
      // console.log('Async operation has ended');

      this.get_genappointment_records();
      this.events.publish('doc_total_new_appoint_counter:refreshpage');
      this.events.publish('doc_new_appoint_counter:refreshpage');
      this.events.publish('docgeneralappointmentlists:refreshpage');

      refresher.complete();
    }, 1);
  }


  gen_appointment_history_details(gen_appoint_history) {
    this.navCtrl.push(DocgeneralappointmentDetailsPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers, gen_appoint_history: gen_appoint_history });
    // rowid: rowid
  }

  // gen_appt_details(){
  //   let modal = this.modalCtrl.create(DocgeneralappointmentDetailsPage,{
  //     appt_id : '1'
  //   });

  //     modal.present();
  // }


  showmessage(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  showalertmessage(titlemsg, mainmsg) {
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: ['OK']
    });
    alert.present();
  }


}
