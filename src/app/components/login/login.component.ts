import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserApiService } from '../../shared/services/userApi/user-api.service';
import { UserService } from '../../shared/services/user/user.service';
import { Token } from '../../shared/models/user';
import { MessageService } from '../../shared/services/message/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model = { email: '', password: '' };

  submitted = false;

  constructor(private userApiService: UserApiService, private userService: UserService,
    private router: Router, private messageService: MessageService) { }

  ngOnInit() {
  }
  onSubmit() {
    if (!this.submitted) {
      this.submitted = true;
      this.userApiService.login(this.model.email, this.model.password).subscribe(res => {

        this.successfulLogin(res);
      }, err => {
        this.submitted = false;
        this.messageService.add({ message: err, type: 'danger' });
      });
    }
  }

  successfulLogin(data: Token) {
    this.userService.setToken(data);
    this.userService.setUser(this.model.email);
    this.router.navigate(['/users']);
    this.messageService.add({ message: 'User logged in successfully', type: 'success' });

  }

}
