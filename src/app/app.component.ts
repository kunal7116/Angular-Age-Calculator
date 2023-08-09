import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { monthValidator } from 'src/custom-validator/dayMonthVaidator';

import { yearValidator } from 'src/custom-validator/yearValidator';
import { UtilService } from 'src/service/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private UtilService: UtilService) {}
  title = 'angularAgeCalculator';

  addDate = new FormGroup({
    day: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(31),
    ]),
    month: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(12),
      monthValidator(),
    ]),
    year: new FormControl('', [Validators.required, yearValidator()]),
  });

  ageResult: { years: string; months: string; days: string } = {
    years: '',
    months: '',
    days: '',
  };

  get f(): { [key: string]: AbstractControl } {
    return this.addDate.controls;
  }

  onCalculateAge() {
    if (this.addDate.invalid) {
      this.UtilService.validateAllFormFields(this.addDate);
    } else {
      const year = this.addDate.value.year!;
      const month = this.addDate.value.month!;
      const day = this.addDate.value.day!;

      const parsedYear = parseInt(year, 10);
      const parsedMonth = parseInt(month, 10);
      const parsedDay = parseInt(day, 10);

      if (!isNaN(parsedYear) && !isNaN(parsedMonth) && !isNaN(parsedDay)) {
        const birthDate = new Date(parsedYear, parsedMonth - 1, parsedDay);
        const currentDate = new Date();
        const ageInMillis = currentDate.getTime() - birthDate.getTime();
        const ageDate = new Date(ageInMillis);

        const years = ageDate.getUTCFullYear() - 1970;
        const months = ageDate.getUTCMonth();
        const days = ageDate.getUTCDate() - 1;

        this.ageResult = {
          years: `${years}`,
          months: `${months}`,
          days: `${days}`,
        };
      }
    }
  }
}
