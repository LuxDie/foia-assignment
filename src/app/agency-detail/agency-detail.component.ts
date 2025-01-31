import { Component, inject, input } from '@angular/core';
import { Agency, DataService } from '../data.service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import MatProgressSpinnerModule
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agency-detail',
  imports: [MatListModule, MatCardModule, MatChipsModule, MatButtonModule, MatProgressSpinnerModule, RouterModule], // Add MatProgressSpinnerModule
  templateUrl: './agency-detail.component.html',
  styleUrl: './agency-detail.component.css'
})
export class AgencyDetailComponent {
  dataService = inject(DataService);
  id = input.required<string>();
  agency?: ({ title: string, rels: string[] });
  loading = true; // Add loading state

  ngOnInit() {
    this.dataService.getAgency(this.id()).subscribe((apiAgency) => {
      this.agency = {
        title: apiAgency.data.attributes.title,
        rels: Object.keys(apiAgency.data.relationships)
      };
      this.loading = false; // Set loading to false when data is loaded
    });
  }
}
