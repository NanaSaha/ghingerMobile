import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import 'rxjs/add/operator/map';

import { PatientDetailsPage } from '../patient-details/patient-details'; 

import { Storage } from '@ionic/storage';
import { PrescriptiondetailsPage } from '../prescriptiondetails/prescriptiondetails';
import { DocpdsprescriptionDetailsPage } from '../docpdsprescriptiondetails/docpdsprescriptiondetails';



@Component({
  selector: 'page-prescription-cons-list',
  templateUrl: 'prescription-cons-list.html',
})
export class PrescriptionConsListPage {
   from_login: any = [];
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];

  doctor_id: any;
  data1: any = [];
  pds_prescription_details : any;


  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController,public storage: Storage) {
    this.check = this.navParams.get('value')
    console.log('VALUE IN PHONE CONS LIST CONSTRUCTOR IS' + this.check); 

    this.storage.get('doctor_id').then((doctor_id) => {
      this.doctor_id = doctor_id;
      console.log(' Docgeneralpdsappointmentlists page doctor_id = '+doctor_id);

      this.getpdsprescription(this.doctor_id);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneConsListPage');
  }

  view(data){

    this.navCtrl.push(PatientDetailsPage, { 'value': this.check ,"user_data": data })
  }


  getpdsprescription(data) {

    if(data){

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      setTimeout(() => {

        this.data.get_doc_pds_appointments_prescription(data)
          .then(result => {
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.pds_prescription_details = jsonBody;
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

  get_pds_prescription_details(pds_prescription) {
    this.navCtrl.push(DocpdsprescriptionDetailsPage, { pds_prescription: pds_prescription, doctor_id: this.doctor_id });
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


