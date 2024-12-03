import { Component } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { config } from 'dotenv';
import { environment } from '../../environments/environment.development';



@Component({
  selector: 'app-best-fit',
  templateUrl: './best-fit.component.html',
  styleUrl: './best-fit.component.css'
})
export class BestFitComponent {

  Math = Math;
  jobDescriptionForBestFit = '';
  errorMessageForBest: string = '';
  locationForBestFit = '';
  requiredExperienceForBestFit: number | null = null;
  prioritizationFactorsForBestFit = [
    { name: 'skills', selected: true },
    { name: 'location', selected: false },
    { name: 'years of experience', selected: false },
  ];
  saveScores = false;
  databaseName = '';
  loadingMessageForBestFit:any;
  matchedApplicantsForBestFit: any[] = [];
  sortColumn: string = ''; 
  sortDirection: boolean = true;

  constructor(private http: HttpClient) {}

  matchApplicants() {
    if (!this.jobDescriptionForBestFit || this.requiredExperienceForBestFit === null) {
      this.errorMessageForBest = 'Please provide a job description and required years of experience.';
      return;
    }

    if (this.saveScores && !this.databaseName) {
      this.errorMessageForBest = 'Please provide a name for the new database.';
      return;
    }
    const selectedFactors = this.prioritizationFactorsForBestFit
      .filter((factor) => factor.selected)
      .map((factorfor) => factorfor.name);

      const params: any = {
        job_description: this.jobDescriptionForBestFit,
        location: this.locationForBestFit,
        required_experience_years: this.requiredExperienceForBestFit?.toString() || '',
        prioritization_factors: selectedFactors.join(','),
      };
  
      if (this.saveScores) {
        params.save_scores = this.saveScores.toString();
        params.new_database_name = this.databaseName;
      }
      this.errorMessageForBest = '';
      this.loadingMessageForBestFit = 'Processing your request. Please wait...';
  
      this.http.get(environment.URLBackend+environment.UrlForMatchApplicants, { params }).subscribe({
        next: (response: any) => {
          this.matchedApplicantsForBestFit = response;
          this.loadingMessageForBestFit = '';
        },
        error: (error) => {
          this.errorMessageForBest =
            error?.error?.detail || 'An error occurred while fetching the applicants.';
          this.matchedApplicantsForBestFit = [];
          this.loadingMessageForBestFit =' ';
        },
      });
    }
    sortData(column: string): void {
      if (this.sortColumn === column) {
        this.sortDirection = !this.sortDirection; // Toggle sort direction
      } else {
        this.sortColumn = column;
        this.sortDirection = true; // Default to ascending
      }
  
      this.matchedApplicantsForBestFit.sort((a, b) => {
        const valueA = a[column] || ''; // Fallback to empty string if undefined
        const valueB = b[column] || '';
  
        // Handle numeric and string sorting
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return this.sortDirection ? valueA - valueB : valueB - valueA;
        } else {
          return this.sortDirection
            ? valueA.toString().localeCompare(valueB.toString())
            : valueB.toString().localeCompare(valueA.toString());
        }
      });
    }
  
}
