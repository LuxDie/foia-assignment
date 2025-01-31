import { Component, inject, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table'
import { AgencyList, DataService } from '../data.service';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-agency-list',
  imports: [MatTableModule, MatPaginatorModule, MatProgressBarModule],
  templateUrl: './agency-list.component.html',
  styleUrl: './agency-list.component.css'
})
export class AgencyListComponent {
  dataService = inject(DataService);
  @ViewChild('table') readonly table!: MatTable<any>;
  @ViewChild('paginator') readonly paginator!: MatPaginator;
  private readonly router = inject(Router)

  myDataArray: ({
    id: string,
    url: string
    title: string,
    website?: string,
    submission_address?: string,
  }[]) = [];
  columnsToDisplay = ['title', 'website', 'submission_address'];
  length = Infinity;
  pageSize = 10;
  nextPageUrl?: string;
  prevPageUrl?: string;
  loading = true;

  handlePageEvent(e: PageEvent) {
    if (e.pageSize == this.pageSize) {
      const url = (e.pageIndex > e.previousPageIndex!) ? this.nextPageUrl : this.prevPageUrl;
      if (!url) { return; }
      this.loadPage(url);
    } else {
      this.paginator.pageIndex = 0;
      this.dataService.pageSize = this.pageSize = e.pageSize;
      this.loadPage();
    }
  }

  loadPage(url?: string) {
    this.loading = true;
    const next = (list: AgencyList) => {
      this.loading = false;
      this.assignData(list);
      // this.table.renderRows();
    };
    if (url) {
      this.dataService.getUrl(url).subscribe(next);
    } else {
      this.dataService.getAgencyList().subscribe(next);
    }
  }

  assignData = (list: AgencyList) => {
    this.myDataArray = [];
    this.nextPageUrl = list.links.next?.href;
    if (!this.nextPageUrl) { this.length = list.data.length; } // Assume length is known if no next page
    this.prevPageUrl = list.links.prev?.href;
    for (let row of list.data) {
      const field = row.attributes;
      const addr = field.submission_address;
      this.myDataArray.push({
        title: `${field.title} (${field.abbreviation})`,
        website: field.website?.uri,

        submission_address: (field.submission_address) ?
          `
            ${addr.address_line1}, 
            ${addr.address_line2}, 
            ${addr.locality}, 
            ${addr.administrative_area}, 
            ${addr.postal_code}, 
            ${addr.country_code}
          ` : undefined,

        id: row.id,
        url: row.links.self.href
      });
    }
  }

  rowClick(row: any) {
    this.router.navigate([`/agency/${row.id}`], { state: row.url });
  }

  constructor() {
    this.dataService.pageSize = this.pageSize;
    this.loadPage();
  }
}
