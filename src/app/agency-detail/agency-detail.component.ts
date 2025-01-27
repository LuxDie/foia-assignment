import { Component, inject, input } from '@angular/core';
import { Agency, DataService } from '../data.service';
import { MatListModule } from '@angular/material/list'

@Component({
  selector: 'app-agency-detail',
  imports: [MatListModule],
  templateUrl: './agency-detail.component.html'
})
export class AgencyDetailComponent {
  dataService = inject(DataService);
  id = input.required<string>();
  agency?: ({ title: string, rels: string[] })
  ngOnInit() {
    this.dataService.getAgency(this.id()).subscribe((apiAgency) => {
      this.agency = {
        title: apiAgency.data.attributes.title,
        rels: Object.keys(apiAgency.data.relationships)
      }
    });
  }
}
