import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import * as moment from 'moment';
import * as XLSX from 'xlsx/xlsx.mjs';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any = [];
  pokemons: any[] = [];
  rows: any[] = [];
  showTable = false;
  constructor(private http: HttpClient) {
    this.fetchData();
  }

  firebaseConfig = {
    //...
  };

  
  app = initializeApp(this.firebaseConfig);

  navigateToNewPage(showTable) {
    this.showTable = !this.showTable;

    if(this.showTable) {
      
      for (let i = 1; i <= 200; i++) {  // 200 pokemons
        const randomNum = Math.floor(Math.random() * 500) + 1;
        this.http.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
          .subscribe((response: any) => {
            this.rows.push({
              name: response.name,
              height: response.height,
              weight: response.weight,
              rank: response.id
            });
          });
      }      
  }
}

  download() {
      const ws = XLSX.utils.json_to_sheet(this.rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const csv = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      FileSaver.saveAs(blob, 'pokemons.csv');

      }

timeSpentInApp = '0';
ngOnInit() {
  const startTime = moment();
  setInterval(() => {
    const currentTime = moment();
    const duration = moment.duration(currentTime.diff(startTime));
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    if (minutes > 0) {
      const minuteLabel = minutes === 1 ? 'minute' : 'minutes';
      this.timeSpentInApp = `${minutes} ${minuteLabel} and ${seconds} seconds`;
    } else {
      const secondLabel = seconds === 1 ? 'second' : 'seconds';
      this.timeSpentInApp = `${seconds} ${secondLabel}`;
    }
  }, 1000);
}
onActivate(event) {
  console.log('Activate Event', event);
  if(event.type == 'click') {
  this.http.get(`https://pokeapi.co/api/v2/pokemon/${event.row.rank}`)
    .subscribe((response: any) => {
      console.log('Pokemon Details', response);
      let moves = response.moves.map((move) => {
        return move.move.name
      });

      alert(`Moves:\n ${moves.join(', \n')}`);
    });
  }
}

  fetchData() {
    this.http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe(response => {
        this.data = response;
      });
  }
}
