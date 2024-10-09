import { Component } from "@angular/core";

import * as moment from "moment";
import * as XLSX from "xlsx/xlsx.mjs";
import * as FileSaver from "file-saver";
import { forkJoin, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  data: any = [];
  pokemons: any[] = [];
  rows: any[] = [];
  showTable = false;
  timeSpentInApp = "0";
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
    const startTime = moment();
    setInterval(() => {
      const currentTime = moment();
      const duration = moment.duration(currentTime.diff(startTime));
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      if (minutes > 0) {
        const minuteLabel = minutes === 1 ? "minute" : "minutes";
        this.timeSpentInApp = `${minutes} ${minuteLabel} and ${seconds} seconds`;
      } else {
        const secondLabel = seconds === 1 ? "second" : "seconds";
        this.timeSpentInApp = `${seconds} ${secondLabel}`;
      }
    }, 1000);
  }

  navigateToNewPage(showTable) {
    if (showTable) {
      this.isLoading = true;
      const apiCalls: Observable<any>[] = [];
      for (let i = 1; i <= 200; i++) {
        // 200 pokemons
        const randomNum = Math.floor(Math.random() * 500) + 1;
        apiCalls.push(
          this.http.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
        );
      }
      forkJoin(apiCalls).subscribe({
        next: (results) => {
          this.rows = results;
          this.showTable = true;
          this.isLoading = false;
        },
        error: (err) => {
          console.error("An error occurred during the API calls:", err);
          this.isLoading = false;
          this.showTable = false;
        },
      });
    } else {
      this.showTable = false;
    }
  }

  download() {
    const exportData = this.rows.map((item) => ({
      name: item.name,
      height: item.height,
      weight: item.weight,
      rank: item.id,
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "pokemons.csv");
  }

  onActivate(event) {
    if (event.type == "click") {
      this.http
        .get(`https://pokeapi.co/api/v2/pokemon/${event.row.rank}`)

        .subscribe((response: any) => {
          let moves = response.moves.map((move) => {
            return move.move.name;
          });
          alert(`Moves:\n ${moves.join(", \n")}`);
        });
    }
  }

  fetchData() {
    this.http
      .get("https://jsonplaceholder.typicode.com/posts")
      .subscribe((response) => {
        this.data = response;
      });
  }
}
