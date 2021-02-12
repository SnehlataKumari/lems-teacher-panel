import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-checkbox-field',
  templateUrl: './custom-checkbox-field.component.html',
  styleUrls: ['./custom-checkbox-field.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomCheckboxFieldComponent),
    multi: true
  }]
})
export class CustomCheckboxFieldComponent implements OnInit, ControlValueAccessor {

  @Input() label;
  @Input() id;
  @Input() disabled = false;

  // Internal properties
  isChecked = false;
  onChange = (_ => { });
  onBlur = (_ => { });

  writeValue(obj: boolean): void {
    this.isChecked = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChanged($event) {
    this.isChecked = $event && $event.target && $event.target.checked;
    this.onChange(this.isChecked);
  }
  ngOnInit(): void {
  }

}
