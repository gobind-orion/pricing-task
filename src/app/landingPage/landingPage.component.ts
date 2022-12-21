
import { UserInfoComponent } from './../user-info/user-info/user-info.component';
import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PriceServiceService } from '../services/price-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landingPage',
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.css']
})
export class LandingPageComponent extends UserInfoComponent implements OnInit {

  /* fields */
  seletedValue: any;
  test:any;
  monthlyPlanPrice: number = 28;
  YearlyPlanPrice: number;
  planPrice: number = 28;
  updatedAmt: any;
  checked: boolean = false;
  numberOfUserColloection = [1,2,3,4,5];
  planType: string;
  showHideBar = true;
  plans = {
    monthly: 'Monthly',
    yearly: 'Yearly'
  }
  users:any = "1";
  showPlan: boolean = true;
  discount: number = 20;
  selectedUsers: any = "1";
  // Configure view query
  @ViewChild('anchor', {read: ViewContainerRef}) anchor: ViewContainerRef;
  ref!: ComponentRef<UserInfoComponent>;

  // inject service in constructor
  constructor(
    public formBuilder: FormBuilder,
    private factoryResolver: ComponentFactoryResolver,
    public priceService: PriceServiceService,
    public httpClient: HttpClient,
    public router: Router
  ) { 
    super(formBuilder, priceService, httpClient, router);
  }

  // Angular lify cycle method is used to initialize angular componenets
  ngOnInit() {
    if(!this.updatedAmt){
      this.updatedAmt = this.planPrice;
    }
    this.planType = this.plans.monthly;
  }

  async checkout() {
    this.showHideBar = false;
    const obj = {
      totalPrice: this.updatedAmt,
      noOfUsers: this.selectedUsers,
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

  /* onChange event for no of users
  calculating total price based on number of users selected
   */
  onChangeNumberOfUser(ev: any){
    this.selectedUsers =  ev.target.value;
    if(this.planType === 'Yearly') {
      this.updatedAmt = this.planPrice * this.selectedUsers;
    }
    else {
      this.updatedAmt = this.planPrice * this.selectedUsers
    }
    
  }

  /* onChange event for plan type
     show plan amount based on plan type
     Consider 20% discount for Yearly plan.
   */
  onChangePlanType(event: any){
    if(this.checked){
      this.planType = this.plans.monthly;
      this.checked = false;
      this.planPrice = this.monthlyPlanPrice;
      this.updatedAmt = this.planPrice * this.selectedUsers;
    } else if (!this.checked){
      this.checked = true;
      this.planPrice = this.monthlyPlanPrice * 12;

      // Calculate yearly plan by apply 20% discount
      this.planPrice = this.planPrice - ((this.planPrice * 20)/100);
      this.updatedAmt = this.planPrice  * this.selectedUsers;      
      this.planType = this.plans.yearly;
    }
  }
}
