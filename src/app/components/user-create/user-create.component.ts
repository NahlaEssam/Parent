import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserApiService } from '../../shared/services/userApi/user-api.service';
import { UserService } from '../../shared/services/user/user.service';
import { UserDetails } from '../../shared/models/user';
import { MessageService } from '../../shared/services/message/message.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  model = { name: '', job: '' };

  submitted = false;
  userId;
  createView = true;
  constructor(private userApiService: UserApiService, public userService: UserService, private router: Router,
    private activatedRoute: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((qParams: Params) => {
      const name = qParams['name'];
      this.userId = qParams['id'];
      if (this.userId) {
        this.createView = false;
      }
      this.model.name = name;
    });
  }
  onSubmit() {
    if (!this.submitted) {
      this.submitted = true;
      console.log(this.model);
      if (this.createView) {
        this.createUser();
      } else {
        // edit
        this.editUser();
      }
    }
  }

  successCallback(data: UserDetails) {
    // this.userService.setToken(data);
    // show sucess message
    this.router.navigate(['/users']);
    if (this.createView) {
      this.messageService.add({ message: 'this user created successfully', type: 'success' });
    } else {
      this.messageService.add({ message: 'this user updated successfully', type: 'success' });
    }

  }
  createUser() {
    this.userApiService.createUser(this.model.name, this.model.job).subscribe(res => {
      this.successCallback(res);
    }, err => {
      console.log(err);
      this.submitted = false;
      this.messageService.add({ message: err, type: 'danger' });
    });
  }

  editUser() {
    this.userApiService.updateUser(this.userId, this.model.name, this.model.job).subscribe(res => {
      this.successCallback(res);
    }, err => {
      this.messageService.add({ message: err, type: 'danger' });
    });
  }
}
