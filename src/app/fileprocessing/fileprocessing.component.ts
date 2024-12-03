import { Component } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
@Component({
  selector: 'app-fileprocessing',
  templateUrl: './fileprocessing.component.html',
  styleUrl: './fileprocessing.component.css'
})
export class FileprocessingComponent {
  data: any[] = [];
  page: number = 1;
  showProfiles: boolean = false; 
  isExpanded: boolean = false;
  selectedFile: File | null = null;
  responseMessage : string = '';  
  isProcessing: boolean = false;
  folderPath: string = '';  
  numThreads: number = 5; 
  Math = Math;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
   
  }
  
  get totalPages(): number {
    return Math.ceil(this.data.length / 10);
  }

  NextPage(){
    if (this.page < this.totalPages) {
      this.page = this.page + 1;
       }
  }
  PreviousPage(){
    if(this.page>1){
      this.page=this.page-1;
    }
  }
  
  ShowProfile(): void {
    this.showProfiles = !this.showProfiles; // Toggle visibility
    if (this.showProfiles && this.data.length === 0) {
      // Fetch data only if not already fetched
      this.fetchData();
    }
  }
  
  fetchData(): void {
    this.http.get<any>('http://127.0.0.1:8000/fetch-data/').subscribe(
      // this.http.get<any>(environment.UrlForFetchingDb).subscribe(
      response => {
        console.log("Raw response:", response); 
        this.data = response.data; 
        console.log("Processed data:", this.data); 
      },
      error => {
        console.error("Error fetching data:", error);
      }
    );
  }
  
  


  toggleExpand() {
    this.isExpanded = !this.isExpanded;
    this.showProfiles = !this.showProfiles; 
    if (this.showProfiles && this.data.length === 0) {
     
      this.fetchData();
    }
  
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  
  OnSingleFileSubmit(): void {
    if (!this.selectedFile) {
      this.responseMessage = 'Please select a file first!';
      return;
    }
    this.isProcessing = true;
    
    setTimeout(() => {
      this.responseMessage = 'The resume has been parsed and stored in the database.';
      this.isProcessing = false; 
    }, 10000); 
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // this.http.post(`http://127.0.0.1:8000/extract-text`, formData).subscribe(
      this.http.post<any>(environment.URLBackend+environment.UrlForSingleFileExtraction, formData).subscribe(
      (response: any) => {
        this.responseMessage = JSON.stringify(response, null, 2); 
      },
      (error) => {
        this.responseMessage = `Error: ${error.message}`; 
      }
    );
  }


  
  onSubmit() {
    
    const url = environment.UrlForMultipleFile;  
    this.isProcessing = true;
    
    setTimeout(() => {
      this.responseMessage = 'The resume has been parsed and stored in the database.';
      this.isProcessing = false; 
    }, 150000); 

    const params = {
      folder_path: this.folderPath,
      num_threads: this.numThreads.toString()  
    };

    // Make the POST request
    this.http.post(url, null, { params }).subscribe(
      (response: any) => {
        this.responseMessage = JSON.stringify(response, null, 2);  
      },
      (error) => {
        this.responseMessage = 'Error: ' + error.message;  
      }
    );
  }


}
