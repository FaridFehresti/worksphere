import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  // Redirect empty path to 'home'
  { path: "",
    loadChildren: () => import('./modules/portoflio/portfolio.module').then(m => m.PortfolioModule),

   },

  // Your component route (corrected import)
  {
    path: "home",
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },

  {
    path: "auth",
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule),
  },
  {
    path: "data",
    loadChildren: () => import("./modules/data/data.module").then(m => m.DataModule),
  },
  {
    path: "inventory",
    loadChildren: () => import("./modules/inventory/inventory.module").then(m => m.InventoryModule),
  },
  {
    path: "stat",
    loadChildren: () => import("./modules/stat/stat.module").then(m => m.StatModule),
  },
  {
    path: "social",
    loadChildren: () => import("./modules/social/social.module").then(m => m.SocialModule),
  },
  {
    path: "map",
    loadChildren: () => import("./modules/map/map.module").then(m => m.MapModule),
  },




  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }