import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
form: FormGroup = new FormGroup({
    FullName: new FormControl(''),
    Email: new FormControl(''),
    PlanType: new FormControl(''),
    NoOfUsers: new FormControl(''),
    TotalPrice: new FormControl(''),
    Role: new FormControl(''),
    Name: new FormControl(''),
    Size: new FormControl(''),
    Loction: new FormControl(''),
  });
  submitted = false;
  constructor(public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        FullName: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        PlanType: [''],
        NoOfUsers: [''],
        TotalPrice: [''],
        Role: [''],
        Name: [''],
        Size: [''],
        Loction: ['']
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
