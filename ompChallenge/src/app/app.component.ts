import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeymapService } from "./keymap.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ompChallenge';
  private _keymapService = inject(KeymapService)
  ngOnInit() {
    this._keymapService.initialsKeyboardShortcuts()
  }

}
