import { Component } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { config } from 'dotenv';
import { environment } from '../../environments/environment.development';
@Component({
  selector: 'app-searching-applicant',
  templateUrl: './searching-applicant.component.html',
  styleUrl: './searching-applicant.component.css'
})
export class SearchingApplicantComponent {
  name: string = '';
  email: string = '';
  responseForSearch: any = null;
  errorMessageForSearch: string = '';
  
  constructor(private http: HttpClient) {} 
  
  searchApplicant() {
    if (!this.name && !this.email) {
      this.errorMessageForSearch = 'Please provide at least a name or email to search.';
      this.responseForSearch = null;
      return;
    }

    const params = new HttpParams()
      .set('name', this.name)
      .set('email', this.email);

    this.http.get(environment.URLBackend+environment.urlForSearchApplicant, { params })
      .subscribe({
        next: (data) => {
          this.responseForSearch = data;
          this.errorMessageForSearch = '';
        },
        error: (error) => {
          this.responseForSearch = null;
          this.errorMessageForSearch = error.error.detail || 'An error occurred while fetching the applicant details.';
        }
      });
  }
}
