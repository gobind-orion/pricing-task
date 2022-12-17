
import { UserInfoComponent } from './../user-info/user-info/user-info.component';
import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { PriceServiceService } from '../services/price-service.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-landingPage',
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.css']
})
export class LandingPageComponent extends UserInfoComponent implements OnInit {

  /* fields */
  seletedValue: any;
  test:any;
  defAmount: number = 28;
  updatedAmt: any;
  checked: boolean = false;
  array = [1,2,3,4,5];
  planType: string;
  showHideBar = true;
  plans = {
    monthly: 'Monthly',
    yearly: 'Yearly'
  }
  users:any;
  showPlan: boolean = true;

  // Configure view query
  @ViewChild('anchor', {read: ViewContainerRef}) anchor: ViewContainerRef;
  ref!: ComponentRef<UserInfoComponent>;

  // inject service in constructor
  constructor(
    public formBuilder: FormBuilder,
    private factoryResolver: ComponentFactoryResolver,
    public priceService: PriceServiceService,
    public httpClient: HttpClient
  ) { 
    super(formBuilder, priceService, httpClient);
  }

  // Angular lify cycle method is used to initialize angular componenets
  ngOnInit() {
    if(!this.updatedAmt){
      this.updatedAmt = this.defAmount;
    }
    this.planType = this.plans.monthly;
  }

  async loadUser() {
    this.showHideBar = false;
    const obj = {
      totalPrice: this.updatedAmt,
      noOfUsers: this.users,
      planType: this.planType
    }

    // use service to pass data from one component to another
    this.priceService.setData(obj);

    const {UserInfoComponent} = await import('./../user-info/user-info/user-info.component');
    const factory = this.factoryResolver.resolveComponentFactory(UserInfoComponent);
    this.ref = this.anchor.createComponent(factory);
    this.showPlan = false;    
  }


  async removeUserComp(){
    this.showPlan = true;
    this.showHideBar = true;
    const index = this.anchor.indexOf(this.ref.hostView)
    if(index != -1){
      this.anchor.remove(index);
    }
  }
  onChange(ev: any){
    const noOfUsers =  ev.target.value;
    this.updatedAmt = this.defAmount * noOfUsers
  }
  toggle(ev: any){
    if(this.checked){
      this.planType = this.plans.monthly;
      this.checked = false;
    } else if (!this.checked){
      this.checked = true;
      this.planType = this.plans.yearly;
    }
  }
  onSearch(evnt: any){}
  onClear(){}

}
