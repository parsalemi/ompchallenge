import { Injectable } from '@angular/core';

export enum AltKeys {
  CTRL = 'ctrl',
  SHIFT = 'shift',
  ALT = 'alt'
}

export interface KeyboardShortcut {
  combination: AltKeys[]
  keycode: number
  callback: () => any
}

@Injectable({
  providedIn: 'root'
})
export class KeymapService {
  private shortcutsMap: Map<number, KeyboardShortcut> = new Map(); // id -> keyboard shortcut
  private stack: string[] = [];

  constructor() { }

  initialsKeyboardShortcuts() {
    window.addEventListener("keydown", k => {
      console.log(this.shortcutsMap)
    });

    window.addEventListener("keyup", function() {

    });
  }

  registerKeyboardShortcut(shortcut: KeyboardShortcut): number {
    const nextId = this.shortcutsMap.size ? Array.from(this.shortcutsMap.keys()).pop()! : 0

    this.shortcutsMap.set(nextId, shortcut);

    return nextId;
  }

  removeKeyboardShortcut(id: number): boolean {
    if (this.shortcutsMap.has(id)) {
      this.shortcutsMap.delete(id);
      return true;
    }

    return false;
  }
}
