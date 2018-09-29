import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MessageService } from '../../services/message/message.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class RouterGaurdService implements CanActivate {
  constructor(
    private userService: UserService,
    private messagingService: MessageService,
    private _router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let activate = true;
    if (this.userService.getToken() && this.userService.getUser()) {

    } else {
      this.messagingService.add({ message: 'Can not navigate to this page , please login first', type: 'danger' });
      this._router.navigate(['/login']);
      activate = false;
    }

    return activate;
  }
}
