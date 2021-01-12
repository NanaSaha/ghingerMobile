import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController,Events } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
// // import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
import {HomeSearchPage} from "../home-search/home-search";
import { DocgeneralappointmentDetailsPage } from '../docgeneralappointmentdetails/docgeneralappointmentdetails';
import { DocgeneralvidconsultPage } from '../docgeneralvidconsult/docgeneralvidconsult';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-docgeneralvidconsultlists',
  templateUrl: 'docgeneralvidconsultlists.html',
})
export class DocgeneralvideoconsultlistsPage {
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
  doctor_id: string;
  doc_gen_vidconsults : any;

  constructor(
    // private keyboard: Keyboard, 
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController,public toastCtrl: ToastController,public storage: Storage,public events: Events) {

    // console.log("We are in Home Care Consult Appointments History page");
   
    this.get_records();

  }

  ionViewWillEnter() {
    this.get_records();

    this.events.subscribe('docgeneralappointmentlists:refreshpage', () => {

      if (this.doctor_id) {
        this.event_getgenvidconsultlists(this.doctor_id);
      } else {
        this.storage.get('doctor_id').then((doctor_id) => {
          this.doctor_id = doctor_id;  
          this.event_getgenvidconsultlists(this.doctor_id);
        });
      }
    });

  }

  get_records(){

    if (this.doctor_id) {
      this.getgenvidconsultlists(this.doctor_id);
    } else {
      this.storage.get('doctor_id').then((doctor_id) => {
        this.doctor_id = doctor_id;  
        this.getgenvidconsultlists(this.doctor_id);
      });
    }
  }


  closeModal() {
    this.viewCtrl.dismiss();
  }

  accept_pds_appt(appt_id){
    //make request to accept pds appt with id= appt_id
    this.showalertmessage("Ghinger","This action cannot be taken at the moment.");

    //the desired action: show this prompt: You are about to accept the selected appointment, do you want to continue?
  }

  decline_pds_appt(appt_id){
    //make request to decline pds appt with id= appt_id
    this.showalertmessage("Ghinger","This action cannot be taken at the moment.");
  }

  getgenvidconsultlists(data) {

    this.events.publish('doc_gen_appoint_counter:refreshpage'); //various doc general appointments counter on gen appointments tab for vc, hc and md
    if(data){

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      setTimeout(() => {

        this.data.get_general_appointments_videoconsult(data)
          .then(result => {
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.doc_gen_vidconsults = jsonBody["records"];
            console.log(this.doc_gen_vidconsults);
            loading.dismiss();

            console.log("Jsson body " +jsonBody);
          }, (err) => {

            loading.dismiss();
            this.showalertmessage("Ghinger","Please ensure all details provided are correct.");
            this.toastCtrl.create({
              message: "Please ensure all details provided are correct.",
              duration: 5000
            }).present();
            // loader.dismiss();
            console.log("error = "+JSON.stringify(err));
          });
  
        }, 1);
    } 

  }


  event_getgenvidconsultlists(data) {
    
    this.events.publish('doc_gen_appoint_counter:refreshpage'); //various doc general appointments counter on gen appointments tab for vc, hc and md
    if(data){

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      setTimeout(() => {

        this.data.get_general_appointments_videoconsult(data)
          .then(result => {
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.doc_gen_vidconsults = jsonBody["records"];
            loading.dismiss();

            console.log("Jsson body " +jsonBody);
          }, (err) => {

            loading.dismiss();
            this.showalertmessage("Ghinger","Please ensure all details provided are correct.");
            this.toastCtrl.create({
              message: "Please ensure all details provided are correct.",
              duration: 5000
            }).present();
            // loader.dismiss();
            console.log("error = "+JSON.stringify(err));
          });
  
        }, 1);
    } 

  }


  public doRefresh(refresher) {
    // console.log('Begin async operation');

    setTimeout(() => {
      // console.log('Async operation has ended');

      this.get_records();
      this.events.publish('doc_gen_appoint_counter:refreshpage'); //various doc general appointments counter on gen appointments tab for vc, hc and md

      this.events.publish('doc_total_new_appoint_counter:refreshpage');
      this.events.publish('doc_new_appoint_counter:refreshpage');
      this.events.publish('docgeneralappointmentlists:refreshpage');

      refresher.complete();
    }, 1);
  }


  get_gen_vidconsult_details(doc_gen_vidconsult) {
    this.navCtrl.push(DocgeneralvidconsultPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers,doc_gen_vidconsult: doc_gen_vidconsult  });
    // rowid: rowid
  }

  showmessage(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  showalertmessage(titlemsg, mainmsg){
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: ['OK']
    });
    alert.present();
  }


}
