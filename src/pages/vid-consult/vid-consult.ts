import { Component, ViewChild } from "@angular/core";
import {
  MenuController,
  NavController,
  NavParams,
  ViewController,
  App,
  Platform,
  normalizeURL,
} from "ionic-angular";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
  ActionSheetController,
  Loading,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { Http } from "@angular/http";
// import { Keyboard } from '@ionic-native/keyboard';
import "rxjs/add/operator/map";
import { MenuPage } from "../menu/menu";
import { getRootNav } from "../../utils/navUtils";
import { NgZone } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { PersonalWelPage } from "../personal-wel/personal-wel";
import { DomSanitizer } from "@angular/platform-browser";

import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { Transfer, TransferObject } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";
import { Storage } from "@ionic/storage";

import { WebView } from "@ionic-native/ionic-webview/ngx";
declare var cordova: any;

@Component({
  selector: "page-vid-consult",
  templateUrl: "vid-consult.html",
})
export class VidConsultPage {
  public videoappointForm: any;
  alph: any;
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];
  params2: any = [];
  params3: any = [];
  from_login: any = [];
  from_login_doc: any = [];
  from_login_pers: any = [];
  sub_id: any;
  string: any;
  app_date: any;
  app_time: any;
  requester_id: any;
  appointmentVal: any;
  submitAttempt: boolean = false;
  appointmentType: any;
  minSelectabledate: any;
  maxSelectabledate: any;
  date: any;
  appointmentType1: string;
  amount: any;
  lastImage1: string = null;
  appointment_type_id: string = "";
  appointment_id: string = "";
  converted;
  final_img_path: any;
  strip_url: any;
  targetPath: string;
  raw_file_path: any;
  lastImage: string = null;
  loading: Loading;
  token;

  constructor(
    public sanitizer: DomSanitizer,
    public webview: WebView,
    public fileTransfer: FileTransfer,
    public app: App,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    private zone: NgZone,
    public platform: Platform,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public _form: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {
    this.appointmentType = this.navParams.get("appointmentType");

    this.videoappointForm = this._form.group({
      delivery_format: [""],
      request_cat_id: ["", Validators.compose([Validators.required])],
      beneficiary_name: [""],
      beneficiary_phone_number: [""],
      beneficiary_age: [""],

      request_urgency_id: ["", Validators.compose([Validators.required])],
      proposed_date: ["", Validators.compose([Validators.required])],
      proposed_time: ["", Validators.compose([Validators.required])],
      apt_type_id: ["VC"],
      complaint: ["", Validators.compose([Validators.required])],
      prev_history: ["", Validators.compose([Validators.required])],
      current_medications: [""],
      allergies: [""],
    });

    this.from_login = this.navParams.get("value");
    this.token = this.navParams.get("token");

    this.date = new Date();
    this.minSelectabledate = this.formatDate(this.date);
    this.maxSelectabledate = this.formatDatemax(this.date);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PhoneConsultPage");
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  // IMAGES UPLOAD
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
          //this.appointForm.value.image_condition = "1";
          this.transformarDataUrl(newFileName);
          console.log(`lastImage1 = ${this.lastImage1}`);
        },
        (err) => {
          console.log("takePicture Error = " + JSON.stringify(err));
          this.presentToast("Error while storing file.");
        }
      );
  }

  // this.win.Ionic.WebView.convertFileSrc();

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "top",
    });
    toast.present();
  }

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
          title: "Lab Appointment",
          subTitle:
            "Your request for Lab Appointment has been made successfully. You would be contacted shortly. Thank you!",
          buttons: [
            {
              text: "OK",
              handler: () => {
                this.navCtrl.setRoot(MenuPage, {
                  value: this.from_login,
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

  showmessage(message) {
    let alert = this.alertCtrl.create({
      title: "Medical Order",
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

  // IMAGE UPLOAD COMPLETE

  submit() {
    this.appointmentVal = JSON.stringify(this.videoappointForm.value);

    this.jsonBody = JSON.parse(this.appointmentVal);

    console.log("THIS IS THE Appoint raw values VALUES" + this.appointmentVal);
    console.log("THIS IS THE Appoint VALUES " + this.jsonBody);
    console.log("THIS IS THE PROPOSED TIME" + this.jsonBody.proposed_time);

    console.log("THIS IS THE ALERGIES" + this.jsonBody.allergies);

    //NEW PARAMS -- TO SATISFY API
    this.params2 = {
      proposed_date: this.jsonBody.proposed_date,
      proposed_time: this.jsonBody.proposed_time,
      apt_type_id: this.jsonBody.apt_type_id,
      request_cat_id: this.jsonBody.request_cat_id,
      request_urgency_id: this.jsonBody.request_urgency_id,
      complaint: this.jsonBody.complaint,
      allergies: this.jsonBody.allergies,
      prev_history: this.jsonBody.prev_history,
      bene_name: this.jsonBody.beneficiary_name,
      bene_age: this.jsonBody.beneficiary_age,
      bene_contact: this.jsonBody.beneficiary_phone_number,
      current_medications: this.jsonBody.current_medications,
      delivery_format: this.jsonBody.delivery_format,
    };

    console.log("PARAMS FOR APPOINTMENT " + JSON.stringify(this.params2));
    let data_params = JSON.stringify(this.params2);
    let loader = this.loadingCtrl.create({
      content: "Booking appoinment. ...",
    });

    loader.present();

    this.data.phone_consult(this.params2, this.token).then(
      (result) => {
        console.log("THIS IS THE RESULT" + result);

        loader.dismiss();

        this.navCtrl.setRoot(MenuPage, {
          value: this.from_login,
        });

        let alert = this.alertCtrl.create({
          title: "GHinger Healthcare",
          subTitle:
            "Appointment has been booked successfully. The Ghinger team will call you shortly",
          buttons: ["OK"],
        });

        alert.present();
      },
      (err) => {
        loader.dismiss();
        this.toastCtrl
          .create({
            message: "Could not process this request. Kindly try again!",
            duration: 5000,
          })
          .present();

        console.log(err);
      }
    );
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    // console.log("year" + year + "and day = " + day);

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    console.log("year" + year + "and day = " + day);

    return [year, month, day].join("-");
  }

  formatDatemax(date) {
    var d = new Date(date),
      month = "" + d.getMonth(),
      day = "" + d.getDate(),
      year = d.getFullYear() + 1;

    console.log("year" + year + "and day = " + day);

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    console.log("year" + year + "and day = " + day);
    return [year, month, day].join("-");
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
