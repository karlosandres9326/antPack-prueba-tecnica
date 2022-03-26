

// MODULOS

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { ReactiveFormsModule}  from "@angular/forms";
import {CdkTableModule} from '@angular/cdk/table';


import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

const appRoutes:Routes = [

];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        CommonModule,
        BootstrapModalModule,
        CdkTableModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        HttpClientModule
    ],

    exports:[RouterModule],
    providers: [
    ],
    bootstrap: [AppComponent],
    entryComponents: [

    ]
})
export class AppModule { }
