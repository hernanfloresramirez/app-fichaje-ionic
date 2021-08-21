import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  constructor(private socket: Socket) { }
  
  onsocket() {
    return this.socket.connect();
  }
  listen(eventNAme: string) {
    return new Observable((suscriber) => {
      this.socket.on(eventNAme, (data: any) => {
        suscriber.next(data)
      })
    });
  }
  listen2(eventNAme: string) {
    return this.socket
      .fromEvent(eventNAme)
      .pipe(map((data) => data));
  }
  emit(eventName: string, data: any) {
    return this.socket.emit(eventName, data);
  }
}
