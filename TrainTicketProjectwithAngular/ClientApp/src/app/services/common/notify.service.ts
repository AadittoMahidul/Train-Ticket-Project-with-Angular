import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  constructor(
    private snackBar: MatSnackBar
  ) { }
  message(message: string, actions: string) {
    let config: MatSnackBarConfig = {
      duration: 2000,
      panelClass: []
    }
    this.snackBar.open(message, actions, config);
  }
}