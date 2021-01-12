import { AutoCompleteService } from "ionic2-auto-complete";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Storage } from "@ionic/storage";

@Injectable()
export class SuburbLocationService implements AutoCompleteService {
  labelAttribute = "suburb_name";

  city_id: any;

  constructor(private http: Http, public storage: Storage) {
    this.storage.get("city_id").then((city_id) => {
      this.city_id = city_id;
      console.log(" SuburbLocationService : city_id = " + city_id);
    });
  }
  getResults(keyword: string) {
    this.storage.get("city_id").then((city_id) => {
      this.city_id = city_id;
      console.log(" SuburbLocationService : city_id = " + city_id);
    });

    return this.http
      .get(
        " https://api.ghingerhealth.com/get_suburbs_by_city_type_along?city_id=" +
          this.city_id +
          "&location=" +
          keyword
      )
      .map((result) => {
        console.log("THIS IS THE RESULTS " + result);
        return result.json().filter((item) => item.suburb_name);
      });
  }
}
