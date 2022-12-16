import { UserInfoModule } from './user-info/user-info.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PriceServiceService } from './services/price-service.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    UserInfoModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    PriceServiceService
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
