import { inject, Injectable, InputSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiKey } from './apikey.json'

export type Agency =  {
  data: {
    attributes: { title: string },
    relationships: {}
  }
}

export type AgencyList = {
  links: {
    next?: { href: string },
    prev?: { href: string }
  },
  data: {
    id: string,
    attributes: {
      title: string,
      abbreviation: string,
      website: { uri: string },
      submission_address: {
        address_line1: string,
        address_line2: string,
        locality: string,
        administrative_area: string,
        postal_code: string,
        country_code: string,
      }
    },
    links: { self: { href: string } }
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly apiUrl = 'https://api.foia.gov/api/agency_components';
  readonly apiKey = apiKey;
  readonly api = inject(HttpClient);
  pageSize = 10;

  getUrl(url: string) {
    return this.api.get<AgencyList>(url, { headers: { 'X-API-Key': this.apiKey } });
  }
  
  getAgencyList() {
    return this.api.get<AgencyList>(this.apiUrl,
      {
        headers: { 'X-API-Key': this.apiKey },
        params: {
          'page[limit]': this.pageSize,
          'fields[agency_component]': 'title,abbreviation,website,submission_address'
        }
      });
  }

  getAgency(id: string) {
    return this.api.get<Agency>(`${this.apiUrl}/${id}`,
      { headers: { 'X-API-Key': this.apiKey } }
  )}
  
  constructor() { }
}
