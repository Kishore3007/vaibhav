import { Component } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { config } from 'dotenv';
import { environment } from '../../environments/environment.development';


@Component({
  selector: 'app-search-skill',
  templateUrl: './search-skill.component.html',
  styleUrl: './search-skill.component.css'
})
export class SearchSkillComponent {

  Math = Math;
  skills:any[] =[];
  years_of_experience?: number;
  location:any=null;
  errorMessageForSkills: string = '';
  currentPage:number = 1;
  responseForsearchByYearAndLocation:any[]=[];
  itemsPerPage:number =7;

  constructor(private http: HttpClient) {}

  searchBySkill() {
    
    if (!this.skills?.length && !this.years_of_experience && !this.location) {
      this.errorMessageForSkills = 'Please provide valid values for skills, location, or years of experience.';
      return;
    }

    
    this.currentPage = 1;

    
    this.http
      .get(environment.URLBackend+environment.UrlForSearchBySkill, {
        params: {
          skills: this.skills || '',
          years_of_experience: this.years_of_experience?.toString() || '',
          location: this.location || '',
        },
      })
      .subscribe({
        next: (response: any) => {
          this.responseForsearchByYearAndLocation = response;
          this.errorMessageForSkills = ''; 
        },
        error: (error) => {
          this.errorMessageForSkills =
            error?.error?.detail || 'An error occurred while fetching the details.';
          this.responseForsearchByYearAndLocation = [];
        },
      });
  }
  get paginatedDataForSkills() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.responseForsearchByYearAndLocation.slice(start, start + this.itemsPerPage);
  }

  
  nextPageForSkills() {
    if (this.currentPage * this.itemsPerPage < this.responseForsearchByYearAndLocation.length) {
      this.currentPage++;
    }
  }

  
  previousPageForSkills() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
