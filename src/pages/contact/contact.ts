import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { NavController, NavParams, App } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ToastController,
  LoadingController,
  AlertController,
  ActionSheetController,
  Platform,
  Loading,
} from "ionic-angular";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer";
import { File, FileEntry } from "@ionic-native/file";
import { Transfer, TransferObject } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";
import { Storage } from "@ionic/storage";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { text } from "@angular/core/src/render3/instructions";

const STORAGE_KEY = "my_images";

@Component({
  selector: "page-contact",
  templateUrl: "contact.html",
})
export class ContactPage implements OnInit {
  images = [];

  constructor(
    private ref: ChangeDetectorRef,
    public webview: WebView,
    public fileTransfer: FileTransfer,
    public app: App,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {}

  ngOnInit() {}
}
