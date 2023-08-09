import { AbstractControl, ValidatorFn } from '@angular/forms';

export function yearValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const currentYear = new Date().getFullYear();
    const inputYear = parseInt(control.value, 10);

    if (!isNaN(inputYear) && inputYear > currentYear) {
      return { invalidYear: true };
    }

    return null;
  };
}
