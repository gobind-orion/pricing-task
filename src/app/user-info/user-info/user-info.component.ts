import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { PriceServiceService } from '../../services/price-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  submitted = false;
  form: FormGroup;

  // inject service in constructor
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

  // Angular lify cycle method is used to initialize angular componenets
  ngOnInit(): void {

    // Initialize form along with validation
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

  // Return form controls
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // submit form user deatil form
  onSubmit(): void {
    
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const getData = this.priceService.getData();
    this.form.value['NoOfUsers'] = getData.noOfUsers;
    this.form.value['PlanType'] = getData.planType;
    this.form.value['TotalPrice'] = getData.totalPrice;
    
    let body = {
      "planType": this.form.value.PlanType,
      "noOfUsers": this.form.value.NoOfUsers,
      "totalPrice": this.form.value.TotalPrice,
      "contactInfo": {
          "email": this.form.value.Email,
          "fullName": this.form.value.FullName,
          "role": this.form.value.Role,
          "company": {
            "name": this.form.value.Name,
            "size": this.form.value.Size,
            "location": this.form.value.Loction
        }
      }
  }
    let url = "https://localhost:7097/SaveRansomwareDetails";    
    this.httpClient.post<string>(url, body).subscribe({
      next: (data: any) => {
          alert('saved');
      },
      error: error => {
          console.error('There was an error!', error);
      }
  })
}

<<<<<<< HEAD
  onReset(): void {    
=======
  onReset(): void {
    // This is intentional
>>>>>>> ba56f97c98204e8bd425f3779f5c0e22b3e200ef
  }
}
