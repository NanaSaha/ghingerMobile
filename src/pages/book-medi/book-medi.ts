import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ToastController,
  LoadingController,
  AlertController,
  ActionSheetController,
  Platform,
  Loading,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";

import { File } from "@ionic-native/file";
import { Transfer, TransferObject } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";

import { MenuPage } from "../menu/menu";
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";

import "rxjs/add/operator/map";
import { IonicSelectableComponent } from "ionic-selectable";

import { WebView } from "@ionic-native/ionic-webview/ngx";
import { DomSanitizer } from "@angular/platform-browser";

class Port {
  public id: number;
  public name: string;
  public price: string;
}

declare var cordova: any;

@Component({
  selector: "page-book-medi",
  templateUrl: "book-medi.html",
})
export class BookMediPage {
  ports: Port[];
  port: Port;

  lastImage: string = null;
  loading: Loading;

  public appointForm: any;
  from_hosp: any;
  from_login: any;
  from_login2: any;
  from_login3: any;
  raw: any;
  submitAttempt: boolean = false;
  messageList: any;
  api_code: any;
  appointmentVal: any;
  jsonBody: any;
  params: any;
  body: any;
  requester_id: any;
  check: any;
  sub_id: any;
  public proposed_date: string = new Date().toISOString();
  items: any;
  filtereditems: any;
  searchTerm: string = "";
  appointment_id: string = "";
  appointment_type_id: string = "";
  lastImage1: string = null;
  medications: any;
  final_img_path: any;
  strip_url: any;
  targetPath: string;
  raw_file_path: any;
  token;

  constructor(
    public sanitizer: DomSanitizer,
    public webview: WebView,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public navCtrl: NavController,
    public data: DataProvider,
    public _form: FormBuilder,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {
    this.appointment_type_id = "MD";

    this.appointForm = this._form.group({
      request_cat_id: ["", Validators.compose([Validators.required])],
      beneficiary_name: [
        "",
        ExtraValidators.conditional(
          (group) => group.controls.request_cat_id.value == "T",
          Validators.compose([Validators.required])
        ),
      ],
      beneficiary_phone_number: [
        "",
        ExtraValidators.conditional(
          (group) => group.controls.request_cat_id.value == "T",
          Validators.compose([Validators.maxLength(10)])
        ),
      ],
      beneficiary_age: [
        "",
        ExtraValidators.conditional(
          (group) => group.controls.request_cat_id.value == "T",
          Validators.compose([Validators.required])
        ),
      ],
      proposed_date: ["", Validators.compose([Validators.required])],
      proposed_time: ["", Validators.compose([Validators.required])],

      request_urgency_id: ["", Validators.compose([Validators.required])],
      apt_type_id: ["MD"],
      medication: [""],

      prev_history: ["", Validators.compose([Validators.required])],
      allergies: [""],
    });

    this.from_hosp = this.navParams.get("value");
    this.from_login = this.navParams.get("another");
    this.sub_id = this.navParams.get("sub_id");
    this.token = this.navParams.get("token");

    console.log("THIS IS THE SUB ID IN MED BOOK" + this.sub_id);

    var results_body = JSON.parse(this.from_login);
    var user_id = results_body["data"]["user_infos"][0].user_id;

    this.body = this.from_login;
    this.jsonBody = this.body;
    this.requester_id = user_id;

    console.log("THIS IS THE requester_id ID is " + this.requester_id);

    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      this.data.get_drug_services(this.token).then(
        (result) => {
          var string_results = JSON.stringify(result);
          console.log("SUBSCRIPTION HISTORY RESULTS " + string_results);

          this.check = result["data"];

          console.log("LETS SEE ARRAY OF MEDICAINE " + this.check);
          console.log(
            "LETS SEE STRINGIFY OF MEDICINE " + JSON.stringify(this.check)
          );
          this.body = Array.of(this.check);

          loading.dismiss();
        },
        (err) => {
          loading.dismiss();
          console.log(err);
        }
      );
    }, 1);
  }

  portChange(event: { component: IonicSelectableComponent; value: any }) {
    console.log("port:", event.value);
  }

  options() {
    console.log("THIS IS THE LAB SERVICES VALUE" + this.appointForm.value);
    let item = JSON.stringify(this.appointForm.value);
    console.log("LETS SEE VALUES " + item);
  }

  ionViewDidLoad() {}

  public event = {
    month: "Year-Month-Day",
    // timeStarts: '07:43',
    timeStarts: "",
    timeEnds: "1990-02-20",
  };

  book_appoint() {
    this.appointmentVal = JSON.stringify(this.appointForm.value);

    this.jsonBody = JSON.parse(this.appointmentVal);

    console.log("THIS IS THE Appoint raw values VALUES" + this.appointmentVal);
    console.log("THIS IS THE Appoint VALUES " + this.jsonBody);
    console.log("THIS IS THE REQUESTER ID" + this.requester_id);
    console.log("THIS IS THE PROPOSED TIME" + this.jsonBody.proposed_time);

    console.log("THIS IS MEDICATION LIST" + this.jsonBody.medication);
    console.log(
      "THIS IS MEDICATION LIST" + JSON.stringify(this.jsonBody.medication)
    );

    let med_details = this.jsonBody.medication;
    let orders = {};
    let new_med_list = [];

    for (let x in med_details) {
      new_med_list.push(med_details[x]["id"]);
      console.log("NEW MEDICAL LST::", new_med_list);
    }

    orders = new_med_list;

    console.log(new_med_list);
    console.log(JSON.stringify(orders));

    this.appointment_type_id = this.jsonBody.appointment_type_id;

    if (!this.jsonBody.medication) {
      if (!this.lastImage) {
        this.showmessage(
          "Kindly provide your list of medication by either selecting from the list in the textfield or uploading a picture of the medication"
        );
        return;
      }
    }

    //NEW PARAMS -- TO SATISFY API

    this.params = {
      proposed_date: this.jsonBody.proposed_date,
      proposed_time: this.jsonBody.proposed_time,
      apt_type_id: this.jsonBody.apt_type_id,
      request_cat_id: this.jsonBody.request_cat_id,
      request_urgency_id: this.jsonBody.request_urgency_id,
      allergies: this.jsonBody.allergies,
      prev_history: this.jsonBody.prev_history,
      bene_name: this.jsonBody.beneficiary_name,
      bene_age: this.jsonBody.beneficiary_age,
      bene_contact: this.jsonBody.beneficiary_phone_number,
      medications: new_med_list,
      suburb_id: this.sub_id,
      complaint: "Medication",
    };

    console.log("this.params = " + JSON.stringify(this.params));

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.data.medication(this.params, this.token).then(
      (result) => {
        console.log("THIS IS THE RESULT" + result);

        loader.dismiss();

        this.navCtrl.setRoot(MenuPage, {
          value: this.from_login,
        });

        let alert = this.alertCtrl.create({
          title: "GHinger Healthcare",
          subTitle:
            "Your Medication request has been received successfully. The Ghinger team will call you shortly",
          buttons: ["OK"],
        });

        alert.present();
      },
      (err) => {
        loader.dismiss();
        this.showmessage("Could not process this request. Please try again!");

        console.log(JSON.stringify(err));
      }
    );
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Select Image Source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      targetWidth: 900,
      targetHeight: 600,
    };

    // Get the data of an image
    this.camera.getPicture(options).then(
      (imagePath) => {
        // Special handling for Android library
        if (
          this.platform.is("android") &&
          sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
        ) {
          this.filePath.resolveNativePath(imagePath).then((filePath) => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
            let currentName = imagePath.substring(
              imagePath.lastIndexOf("/") + 1,
              imagePath.lastIndexOf("?")
            );
            this.copyFileToLocalDir(
              correctPath,
              currentName,
              this.createFileName()
            );
          });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          );
        }
      },
      (err) => {
        console.log("takePicture Error = " + JSON.stringify(err));
        this.presentToast("Error while selecting image.");
      }
    );
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(
        (success) => {
          this.lastImage = newFileName;
          this.appointForm.value.image_condition = "1";
          this.transformarDataUrl(newFileName);
          // this.lastImage1 = cordova.file.dataDirectory + this.lastImage;
          console.log(`lastImage1 = ${this.lastImage1}`);
        },
        (err) => {
          console.log("takePicture Error = " + JSON.stringify(err));
          this.presentToast("Error while storing file.");
        }
      );
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "top",
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  // public pathForImage(img) {
  //   console.log("pathForImage img = " + img);
  //   if (img === null) {
  //     return "";
  //   } else {
  //     return cordova.file.dataDirectory + img;
  //   }
  // }

  public pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      this.raw_file_path = cordova.file.dataDirectory + img;
      console.log("FILE PATH ------" + this.raw_file_path);
      this.strip_url = (<any>window).Ionic.WebView.convertFileSrc(
        this.raw_file_path
      );
      console.log("strip_url -------- " + this.strip_url);

      this.final_img_path = this.sanitizer.bypassSecurityTrustUrl(
        this.strip_url
      );
      console.log("final_img_path -------- " + this.final_img_path);
      return this.final_img_path;
    }
  }

  getimage() {
    if (this.lastImage) {
      var targetPath1 = this.pathForImage(this.lastImage);
      if (targetPath1) {
        console.log(`returning getimage(): targetPath1 = ${targetPath1}`);
        return targetPath1;
      }
    }
  }

  transformarDataUrl(imageName) {
    this.file.readAsDataURL(cordova.file.dataDirectory, imageName).then(
      (dataurl) => {
        this.lastImage1 = dataurl;
      },
      (error) => {
        this.presentToast(error.message);
      }
    );
  }

  public uploadImage(requester_id, appointment_type_id, appointment_id) {
    // Destination URL
    // var url = encodeURI("https://api.ghingerhealth.com/saveImage");
    var url = encodeURI("https://api.ghingerhealth.com/saveImage");
    console.log("LETS API PATH" + url);

    // File for Upload
    //var targetPath = this.pathForImage(this.lastImage);
    console.log("LETS SEE THE TARGET PATH " + this.strip_url);

    console.log("LETS SEE THE TARGET PATH 2" + this.final_img_path);
    console.log("LETS SEE THE raw_file_path" + this.raw_file_path);

    this.targetPath = this.raw_file_path;

    // File name only
    var filename = this.lastImage;
    console.log("LETS SEE THE FILE ABOUT TO BE UPLOADED " + filename);

    //options

    var options = {
      fileKey: "fileName",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        fileName: filename,
        // file_type: 'P',
        //  applicant_id: this.applicant_id,
        requester_id: requester_id,
        appointment_type_id: appointment_type_id,
        appointment_id: appointment_id,
      },
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: "Uploading...",
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(this.targetPath, url, options).then(
      (data) => {
        console.log("LETS SEE THE DATA COMING" + data);
        console.log("LETS SEE THE DATA COMING IN JSON" + JSON.stringify(data));
        this.loading.dismissAll();

        // data = JSON.parse(data.response);
        // console.log(data);

        // var desc = data["resp_desc"];
        // var code = data["resp_code"];

        // console.log("CODE FOR IMAGE IS " + code);
        console.log("ALERT PART ----------------------------");

        let alert = this.alertCtrl.create({
          title: "Medication Order",
          subTitle:
            "Your request for medication has been made successfully. You would be contacted shortly. Thank you!",
          buttons: [
            {
              text: "OK",
              handler: () => {
                this.navCtrl.setRoot(MenuPage, {
                  value: this.from_login,
                  doc_value: this.from_login3,
                  pers_value: this.from_login2,
                });
              },
            },
          ],
        });
        alert.present();
        this.presentToast("Upload Successful.");
      },
      (err) => {
        this.loading.dismissAll();
        console.log("takePicture Error = " + JSON.stringify(err));
        this.presentToast("Error while uploading file.");
      }
    );
  }

  cancelImage() {
    this.lastImage = "";
    this.lastImage1 = null;
  }

  showmessage(message) {
    let alert = this.alertCtrl.create({
      title: "Medication Order",
      subTitle: message,
      buttons: [
        {
          text: "OK",
          handler: () => {},
        },
      ],
    });
    alert.present();
  }
}

export class ExtraValidators {
  static conditional(conditional, validator) {
    return function (control) {
      revalidateOnChanges(control);

      if (control && control._parent) {
        if (conditional(control._parent)) {
          return validator(control);
        }
      }
    };
  }
}

function revalidateOnChanges(control): void {
  if (control && control._parent && !control._revalidateOnChanges) {
    control._revalidateOnChanges = true;
    control._parent.valueChanges
      .distinctUntilChanged((a, b) => {
        // These will always be plain objects coming from the form, do a simple comparison
        if ((a && !b) || (!a && b)) {
          return false;
        } else if (a && b && Object.keys(a).length !== Object.keys(b).length) {
          return false;
        } else if (a && b) {
          for (let i in a) {
            if (a[i] !== b[i]) {
              return false;
            }
          }
        }
        return true;
      })
      .subscribe(() => {
        control.updateValueAndValidity();
      });

    control.updateValueAndValidity();
  }
  return;
}
