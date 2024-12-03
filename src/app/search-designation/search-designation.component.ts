import { Component } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { config } from 'dotenv';
import { environment } from '../../environments/environment.development';


@Component({
  selector: 'app-search-designation',
  templateUrl: './search-designation.component.html',
  styleUrl: './search-designation.component.css'
})
export class SearchDesignationComponent {
  designation: string = '';
  responseForDesignationSearch: any = null;
  errorMessageForDesignation: string = '';
  
  constructor(private http: HttpClient) {}

  searchByDesignation() {
    if (!this.designation) {
      this.errorMessageForDesignation = 'Please enter a designation to search.';
      return;
    }

    this.http
      .get(environment.URLBackend+environment.UrlForSearchByDesignation, {
        params: { designation: this.designation },
      })
      .subscribe({
        next: (response) => {
          this.responseForDesignationSearch = response;
          this.errorMessageForDesignation = '';
        },
        error: (error) => {
          this.errorMessageForDesignation = error?.error?.detail || 'An error occurred while fetching details.';
          this.responseForDesignationSearch = null;
        },
      });
  }
}
