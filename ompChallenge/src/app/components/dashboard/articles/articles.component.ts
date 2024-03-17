import { Component, inject, OnInit } from '@angular/core';
import { json } from "express";
import { DashboardService } from "../dashboard.service";
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from "@angular/common";
import { log } from "util";
import { map } from "rxjs";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";
import { KeymapService } from "../../../keymap.service";

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe,
    NgIf,
    NgForOf,
    ButtonModule,
    TooltipModule
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {
  private _api = inject(DashboardService);
  private keymap = inject(KeymapService);
  articles$ = this._api.getArticles().pipe(map(a => a.articles))
  constructor() {
  }
  ngOnInit() {
    this.keymap.initialsKeyboardShortcuts()
  }

  deleteArticle(id: string, event: any): any{
    this._api.deleteArticle(id).subscribe( (a:any) => a);
    window.location.reload();
  }
}
