import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { PriceServiceService } from '../../services/price-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  submitted = false;
  form: FormGroup;
  constructor(
    public formBuilder: FormBuilder, 
    public priceService: PriceServiceService,
    public httpClient: HttpClient 
  ) {
    this.form = new FormGroup({
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
  }

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
    const getData = this.priceService.getData();
    this.form.value['NoOfUsers'] = getData.noOfUsers;
    this.form.value['PlanType'] = getData.planType;
    this.form.value['TotalPrice'] = getData.totalPrice;
    //console.log('getData', getData);
    //console.log('FormData', this.form.value)
    let body = {
          "FullName": this.form.value.FullName,
          "Email": this.form.value.Email,
          "PlanType": this.form.value.PlanType,
          "NoOfUsers": this.form.value.NoOfUsers,
          "TotalPrice": this.form.value.TotalPrice,
          "Role": this.form.value.Role,
          "Name": this.form.value.Name,
          "Size": this.form.value.Size,
          "Loction": this.form.value.Loction,

    }
    this.sendFormData(body).subscribe(
      res => {
        console.log(res);
      }
    );
   
    console.log(this.form);
  }
  sendFormData(body:any): Observable<any> {
      let url = "https://localhost:7097/SaveRansomwareDetails";
      return this.httpClient.post<any>(url, body);
  }

  onReset(): void {
    //this.submitted = false;
    //this.form.reset();
  }
}
