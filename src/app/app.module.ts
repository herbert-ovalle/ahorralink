import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';

import { FlatpickrModule } from 'angularx-flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

import { ToastrModule } from 'ngx-toastr';
import { ServicioService } from './services/servicio.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './components/inicio/inicio.component';
import { SoloNumerosDirective } from './directives/solo-numeros.directive';

import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

import { environment } from '../environments/environment';
import { NgOptimizedImage } from '@angular/common';
import { UppercaseDirective } from './directives/uppercase.directive';

@NgModule( {
    declarations : [
        AppComponent,
        InicioComponent,
        SoloNumerosDirective,
        UppercaseDirective
    ],
    imports : [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgxSpinnerModule,
        DataTablesModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
        RecaptchaV3Module,
        NgOptimizedImage,
        FlatpickrModule.forRoot( {
            locale : Spanish
        } )
    ],
    providers    : [
        ServicioService,
        {
            provide: RECAPTCHA_V3_SITE_KEY,
            useValue: environment.siteKey,
        }
    ],
    bootstrap    : [ AppComponent ]
} )
export class AppModule {}
