import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Http } from '@angular/http';
// import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
// import { AddRegisPage } from '../add-regis/add-regis';
import { PatientDetailsPage } from '../patient-details/patient-details'; 
// import { DocpagePersonalPage } from '../docpage-personal/docpage-personal';



@Component({
  selector: 'page-phone-cons-list',
  templateUrl: 'phone-cons-list.html',
})
export class PhoneConsListPage {
   from_login: any = [];
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  doc_details: any;
  params: any = [];
  doctor_id: any;
  data1: any = [];
  patient_id: any;
  retrieve: any;


  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController) {
    this.check = this.navParams.get('value');
    this.doc_details = this.navParams.get('doc_details');
    // this.doctor_id = "119";

    if(this.check){
      this.fetch_phoneconsult_list(this.check);

    }else{
      //fetching phone consult lists.
      //get this.doctor_id from session(login)
      if(this.doctor_id){

        this.params = {
          "id": this.doctor_id,
        }

        if(this.params){
          
          console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params) );
          console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params) );

          let loader = this.loadingCtrl.create({
            content: "Please wait ..."
    
          });
    
          loader.present();
      
          this.data.retrieve_phone_consult(this.params).then((result) => {
      
            console.log("THIS IS THE RESULT" + result);
            var jsonBody = result["_body"];
            console.log(jsonBody);
      
            jsonBody = JSON.parse(jsonBody);
            console.log(jsonBody)
      
            this.check = jsonBody;
            console.log("RESULTS IS " + this.check);
            this.body = Array.of(this.check)
      
            console.log("--------------------------------------------")
            console.log("-------------------WHats is the value check-------------------------")
            console.log(this.check)
            console.log("--------------------------------------------")
      
            var desc = jsonBody["resp_desc"];
            var code = jsonBody["resp_code"];
      
      
            console.log(desc);
            console.log(code);
      
            this.messageList = desc;
            this.api_code = code;
      
            loader.dismiss(); 

            this.fetch_phoneconsult_list(this.check);
              // this.navCtrl.push(PhoneConsListPage, { 'value': this.check , 'doc_details': this.from_login});

            if (this.api_code == "119") {
              let alert = this.alertCtrl.create({
                title: '',
                subTitle: this.messageList,
                buttons: ['OK']
              });
      
              alert.present();
            }
      
      
          }, (err) => {
            loader.dismiss();
            this.toastCtrl.create({
              message: "Could not process this request successfully.",
              duration: 5000
            }).present();
      
            console.log(err);
          });

        }
      

      }

    }

    if(this.doc_details){
      console.log('VALUE IN DOC DETAILS LIST ' + this.doc_details); 
    }

    
    
  
  }


  fetch_phoneconsult_list(check){
    console.log('VALUE IN PHONE CONS LIST CONSTRUCTOR IS' + check);
      console.log('VALUE IN PHONE CONS LIST STRINGIFY IS' + JSON.stringify(check));  

      if(check[0]){
        if(check[0].patient_id){
          //  this.body = JSON.parse(this.check)
          this.patient_id = check[0].patient_id;
  
          if(this.patient_id){
            
            console.log("THIS IS THE patient_id " + this.patient_id);
            
            this.params = {
              "patient_id": this.patient_id
              }
        
              let loader = this.loadingCtrl.create({
              content: "Please wait ..."
        
              });
        
            loader.present();
        
            this.data.retrieve_investigation(this.params).then((result) => {
        
              var body = result["_body"];
              body = JSON.parse(body);
        
              this.retrieve = body
              this.retrieve = JSON.stringify(body)
        
              console.log('-----------------------------------------------------');
              console.log('-----------------THIS IS A LOG IN RETRIEVAL------------------------------------');
              console.log('LETS SEE THE  BODY ' + body);
              console.log('LETS SEE THE DATA RETRIEVED ' + this.retrieve);
              console.log('-----------------------------------------------------');
        
              this.body = Array.of(this.retrieve)
              this.jsonBody = JSON.parse(this.body);
        
        
               var desc = body["resp_desc"];
              var code = body["resp_code"];
        
              console.log('-----------------RESP CODE------------------------------------');
              console.log(desc);
              console.log(code);
        
              this.messageList = desc;
              this.api_code = code;
              console.log('-----------------------------------------------------');
              loader.dismiss();
        
            });
  
          }
        }
      }
  }



  view(data){


    this.navCtrl.push(PatientDetailsPage, { 'value': this.check ,"user_data": data ,'doc_details': this.doc_details, 'retrieve': this.retrieve })
  }


  phonelists(){
    
  }

}
