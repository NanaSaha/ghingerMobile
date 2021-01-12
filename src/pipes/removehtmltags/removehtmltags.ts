import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'removehtmltags',
})
export class RemovehtmltagsPipe implements PipeTransform {



   transform(value: string) {
           if(value){
               var result = value.replace(/<\/?[^>]+>/gi, ""); //removing html tag using regex pattern
              return result;
           }
           else{}


  }
}
