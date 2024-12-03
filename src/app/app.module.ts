import { Component, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from './navbar/navbar.component';
import { FileprocessingComponent } from './fileprocessing/fileprocessing.component';
import { SearchingApplicantComponent } from './searching-applicant/searching-applicant.component';
import { SearchDesignationComponent } from './search-designation/search-designation.component';
import { SearchSkillComponent } from './search-skill/search-skill.component';
import { BestFitComponent } from './best-fit/best-fit.component';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';

const routes :Routes =[
  {path:'' ,component :FileprocessingComponent},
  {path:'FileProcessing' ,component :FileprocessingComponent},
  {path:'SearchByName', component:SearchingApplicantComponent},
  {path:'SearchBySkills', component:SearchSkillComponent},
  {path:'SearchByDesignation', component:SearchDesignationComponent},
  {path:'Bestfit', component:BestFitComponent},

  
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FileprocessingComponent,
    SearchingApplicantComponent,
    SearchDesignationComponent,
    SearchSkillComponent,
    BestFitComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDividerModule ,
    NgxPaginationModule,
    RouterModule.forRoot(routes)
    
  ],
  providers: [
    provideClientHydration(), provideHttpClient(), provideAnimationsAsync() 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
