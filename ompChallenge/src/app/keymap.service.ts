import { Injectable } from '@angular/core';

export enum AltKeys {
  CTRL,
  SHIFT,
  ALT
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
  private shortcutsSet: Set<KeyboardShortcut> = new Set(); // keyboard shortcut

  initialsKeyboardShortcuts() {
    window.addEventListener("keydown", (event) => {
      const { ctrlKey, altKey, shiftKey } = event;

      for (const shortcut of this.shortcutsSet) {
        // TODO ugly
        let combinationPressed = shortcut.combination
          .reduce((stillValid, comb) =>
            stillValid && (
              (ctrlKey && comb === AltKeys.CTRL) ||
              (shiftKey && comb === AltKeys.SHIFT) ||
              (altKey && comb === AltKeys.ALT)
            )
          , true);

        if (!combinationPressed) continue;

        if (shortcut.keycode === event.keyCode) {
          shortcut.callback();
        }
      }
    });

    // window.addEventListener("keyup", function() {
    //
    // });
  }

  registerKeyboardShortcut(shortcut: KeyboardShortcut) {
    this.shortcutsSet.add(shortcut);
  }

  registerMassKeyboardShortcut(shortcuts: KeyboardShortcut[]) {
    for (const shortcut of shortcuts) {
      this.shortcutsSet.add(shortcut);
    }
  }

  removeMassKeyboardShortcut(shortcuts: (KeyboardShortcut | undefined)[]) {
    for (const shortcut of shortcuts) {
      if (shortcut) this.shortcutsSet.delete(shortcut);
    }
  }

  removeKeyboardShortcut(shortcut?: KeyboardShortcut): boolean {
    if (!shortcut) return false;

    if (this.shortcutsSet.has(shortcut)) {
      this.shortcutsSet.delete(shortcut);

      return true;
    }

    return false;
  }
}
