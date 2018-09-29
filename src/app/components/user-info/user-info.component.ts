import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Params } from '@angular/router';

import { UserApiService } from '../../shared/services/userApi/user-api.service';
import { MessageService } from '../../shared/services/message/message.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userId;
  userData;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userApiService: UserApiService , private messageService: MessageService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.loadUserData();
    });
  }

  loadUserData() {
    this.userApiService.getUser(this.userId).subscribe(data => {
      this.userData = data.data;
      this.messageService.add({ message: 'this user loaded successfully', type: 'success' });
    }, err => {
      this.messageService.add({ message: err, type: 'danger' });
    });
  }

}
