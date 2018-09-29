import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  messages: { message: string, type: string }[] = [];
  add(message: { message: string, type: string }) {
    this.messages.push(message);
    setTimeout(() => {
        this.closeAlert(message);
    }, 1000);
  }
  clear() {
    this.messages = [];
  }
  closeAlert(alert: { message: string, type: string }) {
    const index = this.messages.findIndex(res => {
      return res.message === alert.message && res.type === alert.type;
    });
    if (index !== -1) {
      this.messages.splice(index, 1);
    }
  }
}
