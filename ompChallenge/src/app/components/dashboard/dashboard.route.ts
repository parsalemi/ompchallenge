import { Routes } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { loginGuard } from "../../core/guard/login.guard";
import { checkAuthGuard } from "../../core/guard/check-auth.guard";
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'articles',
    pathMatch: "full"
  },
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path: 'articles',
        canActivate: [checkAuthGuard],
        loadComponent: () => import('./articles/articles.component').then( c => c.ArticlesComponent)
      },
      {
        path: 'articles/:articleId',
        canActivate: [checkAuthGuard],
        loadComponent: () => import('./article-detail/article-detail.component').then( c => c.ArticleDetailComponent)
      },
      {
        path: 'articles/:articleId/comments',
        canActivate: [checkAuthGuard],
        loadComponent: () => import('./comments/comments.component').then( c => c.CommentsComponent)
      },
      {
        path: 'articles/:articleId/update',
        canActivate: [checkAuthGuard],
        loadComponent: () => import('./add-edit/add-edit.component').then(c => c.AddEditComponent)
      },
      {
        path: 'create',
        canActivate: [checkAuthGuard],
        loadComponent: () => import('./add-edit/add-edit.component').then( c => c.AddEditComponent)
      },
      {
        path: 'details',
        loadComponent: () => import('./article-detail/article-detail.component').then( c => c.ArticleDetailComponent)
      }

    ]
  }
];
