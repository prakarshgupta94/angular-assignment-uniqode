import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PokemonComponent } from "./pokemon/pokemon.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "pokemon",
    component: PokemonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
