import { Component } from "@angular/core";

import * as moment from "moment";

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

  constructor() {}

  ngOnInit() {
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
}
