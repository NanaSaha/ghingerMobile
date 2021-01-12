import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ProfileEditPage } from '../profile-edit/profile-edit';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  user_details;
  jsonBody: any;
  body: any;
  username: any;
  params: any;
  reg_id: any;
  user_type: any;
  other_names: any;
  surname: any;
  mobile_number: any;
  email: any;

  constructor(public data: DataProvider,public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams) {

    this.user_details = this.navParams.get("user_details")
    console.log("USer DETAILS " + JSON.stringify(this.user_details))
    // this.username = this.user_details[0].username
    // this.reg_id = this.user_details[0].reg_id
    // this.user_type = this.user_details[0].user_type
    // this.other_names = this.user_details[0].other_names
    // this.surname = this.user_details[0].surname
    // this.mobile_number = this.user_details[0].mobile_number
    // this.email = this.user_details[0].email
    // console.log("USer DETAILS " + JSON.stringify(this.user_details))
    // console.log("Username " + JSON.stringify(this.username))
    // console.log("ID " + JSON.stringify(this.reg_id))
    // console.log("ID " + this.reg_id)

  

  
  //   this.params = {

  //     "reg_id": this.reg_id,
     

  //   }
    
  //   this.data.retrieve_edit(this.params).then((result) => {

  //     console.log(result);
  //     var jsonBody = result["_body"];
  //     console.log(jsonBody);
  //     this.user_details = JSON.parse(jsonBody)  
  //   });

   }

   edit(item) {

    this.navCtrl.push(ProfileEditPage, { user_details: this.user_details });

  }

   
  }

