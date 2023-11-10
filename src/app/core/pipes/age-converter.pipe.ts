import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageConverter'
})
export class AgeConverterPipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      if (today.getMonth() < birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    return null;
  }

}
