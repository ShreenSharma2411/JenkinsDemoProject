import { FormControl } from "@angular/forms";

export class TrimValidator{

    public static required(control: FormControl) {
        if (!control.value || typeof control.value === 'string' && !control.value.trim()) {
          return {
            required: true
          };
        }
    
        return null;
      }
}
