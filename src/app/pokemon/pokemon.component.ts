import { Component } from "@angular/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { forkJoin, Observable } from "rxjs";
import * as XLSX from "xlsx/xlsx.mjs";
import * as FileSaver from "file-saver";
import { Router } from "@angular/router";
import { PokemonService } from "app/pokemon.service";

@Component({
  selector: "pokemon",
  standalone: true,
  imports: [NgxDatatableModule],
  templateUrl: "./pokemon.component.html",
  styleUrl: "./pokemon.component.css",
})
export class PokemonComponent {
  isLoading = false;
  rows: any[] = [];
  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    this.isLoading = true;
    const apiCalls: Observable<any>[] = [];
    for (let i = 1; i <= 200; i++) {
      // 200 pokemons
      const randomNum = Math.floor(Math.random() * 500) + 1;
      apiCalls.push(this.pokemonService.getData(`v2/pokemon/${randomNum}`));
    }
    forkJoin(apiCalls).subscribe({
      next: (results) => {
        this.rows = results;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("An error occurred during the API calls:", err);
        this.isLoading = false;
      },
    });
  }

  navigateToHome() {
    this.router.navigate(["/home"]);
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
      this.pokemonService
        .getData(`v2/pokemon/${event.row.id}`)
        .subscribe((response: any) => {
          let moves = response.moves.map((move) => {
            return move.move.name;
          });
          alert(`Moves:\n ${moves.join(", \n")}`);
        });
    }
  }
}
