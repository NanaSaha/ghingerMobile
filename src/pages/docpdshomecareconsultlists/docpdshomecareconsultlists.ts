import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';

import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
import { DocpdsvideoconsultDetailsPage } from '../docpdsvideoconsultdetails/docpdsvideoconsultdetails';
import { DocpdshomecareDetailsPage } from '../docpdshomecareconsultdetails/docpdshomecareconsultdetails';

@Component({
  selector: 'page-docpdshomecareconsultlists',
  templateUrl: 'docpdshomecareconsultlists.html',
})
export class DocpdshomecareconsultlistsPage {
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
  doc_pds_homecareconsults : any;

  constructor(
    // private keyboard: Keyboard, 
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController,public toastCtrl: ToastController,public storage: Storage) {

    // console.log("We are in Home Care Consult Appointments History page");
    this.get_records();
  }

  ionViewWillEnter() {
    this.get_records();
  }

  get_records(){
    this.storage.get('doctor_id').then((doctor_id) => {
      this.doctor_id = doctor_id;
      console.log(' docpdshomecareconsultlists page doctor_id = '+doctor_id);

      this.getgenhomecareconsultlists(this.doctor_id);
    });
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

  getgenhomecareconsultlists(data) {

    if(data){

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      setTimeout(() => {

        this.data.get_doc_pds_appointments_homecare(data)
          .then(result => {
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.doc_pds_homecareconsults = jsonBody;
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


  get_pds_homecareconsult_details(doc_pds_homecare) {
    this.navCtrl.push(DocpdshomecareDetailsPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers,doc_pds_homecare: doc_pds_homecare,doctor_id: this.doctor_id  });
    
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
