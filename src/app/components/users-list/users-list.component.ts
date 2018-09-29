import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { MessageService } from '../../shared/services/message/message.service';
import { UserApiService } from '../../shared/services/userApi/user-api.service';
import { UserList, UserDetails } from '../../shared/models/user';

import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  usersList: UserList;
  users: UserDetails[] = [];
  page = 0;
  showLoadMore = true;
  activeUser: UserDetails;
  constructor(private userApiService: UserApiService, private router: Router, private modalService: NgbModal,
    private messageService: MessageService, private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userApiService.getUserLists(this.page).subscribe(res => {

      this.usersList = res;
      if (this.usersList.data.length !== 0) {
        this.usersList.data.forEach(user => {
          this.users.push(user);
        });
        this.messageService.add({ message: 'Users loaded successfully', type: 'success' });
      } else {
        this.showLoadMore = false;
      }
    },
      err => {
        this.messageService.add({ message: err, type: 'danger' });
      });
    this.page += 1;
  }

  goToUpdate(userId: string, userName: string) {
    this.router.navigate([`/update/${userId}`], { queryParams: { name: userName } });
  }
  openDeleteModal(user: UserDetails, content) {
    this.activeUser = user;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      const closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteUser(user.id);
      }
    });
  }
  deleteUser(userId: number) {
    this.userApiService.deleteUser(userId).subscribe(res => {

      const index = this.users.findIndex(data => {
        return data.id === userId;
      });
      if (index !== -1) {
        this.users.splice(index, 1);
      }
    }, err => {
      this.messageService.add({ message: err, type: 'danger' });
    });
  }


}
