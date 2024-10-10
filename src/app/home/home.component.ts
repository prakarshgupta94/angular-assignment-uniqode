import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { HomeService } from "app/home.service";

@Component({
  selector: "home",
  standalone: true,
  imports: [NgxDatatableModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  data: any = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  navigateToNewPage() {
    this.router.navigate(["/pokemon"]);
  }

  fetchData() {
    this.isLoading = true;
    this.homeService.getData("posts").subscribe((response) => {
      this.data = response;
      this.isLoading = false;
    });
  }
}
