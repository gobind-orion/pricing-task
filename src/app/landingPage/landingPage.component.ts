import { UserInfoComponent } from './../user-info/user-info/user-info.component';
import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-landingPage',
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.css']
})
export class LandingPageComponent extends UserInfoComponent implements OnInit {
  seletedValue: any;
  test:any;
  defAmount: number = 28;
  updatedAmt: any;
  checked: boolean = false;
  array = [1,2,3,4,5];
  planType: string;
  plans = {
    monthly: 'Monthly',
    yearly: 'Yearly'
  }
  showPlan: boolean = true;
  @ViewChild('anchor', {read: ViewContainerRef}) anchor: ViewContainerRef;
  ref!: ComponentRef<UserInfoComponent>;
  constructor(
    public formBuilder: FormBuilder,
    private factoryResolver: ComponentFactoryResolver
  ) { 
    super(formBuilder);
  }

  ngOnInit() {
    if(!this.updatedAmt){
      this.updatedAmt = this.defAmount;
    }
    this.planType = this.plans.monthly;
  }
  async loadUser(){
    const {UserInfoComponent} = await import('./../user-info/user-info/user-info.component');
    const factory = this.factoryResolver.resolveComponentFactory(UserInfoComponent);
    // this.anchor.createComponent(factory);
    this.ref = this.anchor.createComponent(factory);
    this.showPlan = false;
    console.log(this.anchor);
  }
  async removeUserComp(){
    this.showPlan = true;
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
    console.log(ev);
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
