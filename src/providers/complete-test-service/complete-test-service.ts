import {AutoCompleteService} from 'ionic2-auto-complete';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class CompleteTestService implements AutoCompleteService {
  labelAttribute = "suburb_name";

  constructor(private http:Http) {
    

  }
  getResults(keyword:string) {
   
    //  return this.http.get("http://5.153.40.138:6099/location_search?location="+keyword)
    return this.http.get("http://5.153.40.138:6099/location_search?location="+keyword)

    
      .map(
        result =>
        {
          console.log("THIS IS THE RESULTS " + result);
          return  result.json().filter(item => item.suburb_name)
           // .filter(item => item.suburb_name.toLowerCase().startsWith(keyword.toLowerCase()))
        });
        
  }
  
}

