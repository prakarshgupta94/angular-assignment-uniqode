import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

@Component({
  selector: "home",
  standalone: true,
  imports: [NgxDatatableModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  data: any = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  navigateToNewPage() {
    this.router.navigate(["/pokemon"]);
  }

  fetchData() {
    this.http
      .get("https://jsonplaceholder.typicode.com/posts")
      .subscribe((response) => {
        this.data = response;
      });
  }
}
