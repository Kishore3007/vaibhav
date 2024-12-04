import { url } from "node:inspector";

export const environment = {
    URLBackend:'http://127.0.0.1:8000',
    URLNavbar:'http://localhost:4200',
    URLNavbarazure:'https://red-cliff-0c9a1740f.4.azurestaticapps.net',
    UrlForFetchingDb: '/fetch-data/',
    UrlForSingleFileExtraction:'/extract-text',
    UrlForMultipleFile:'/extract-text-folder',
    urlForSearchApplicant:'/applicant-details',
    UrlForSearchByDesignation:'/applicant-designation',
    UrlForSearchBySkill:'/search-by-skills',  
    UrlForMatchApplicants:'/match-applicants-by-job-description',
    RouterUrlForFileProcessing:'/FileProcessing',
    RouterUrlForSearchBySkill:'/SearchBySkills',
    RouterUrlForSearchByName:'/SearchByName',
    RouterUrlForSearchByDesignation:'/SearchByDesignation',
    RouterUrlForBestfit:'/Bestfit',

};
