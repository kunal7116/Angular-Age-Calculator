import { AbstractControl, ValidatorFn } from '@angular/forms';

export function monthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const dayControl = control.root.get('day');
    const month = parseInt(control.value, 10);

    if (dayControl && dayControl.value !== null && dayControl.value !== '') {
      const day = parseInt(dayControl.value, 10);
      const year = new Date().getFullYear();
      const maxDays = new Date(year, month, 0).getDate();

      if (!isNaN(day) && day > maxDays) {
        dayControl.setErrors({ invalidDay: true });
      } else {
        dayControl.setErrors(null);
      }
    }

    return null;
  };
}
