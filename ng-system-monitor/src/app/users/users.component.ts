import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services';
import {User} from '../_models';
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  
  constructor(private userService: UserService) {
  }
  
  ngOnInit() {
    const that = this;
    
    that.userService.all()
      .subscribe(users => that.users = users, e => console.log('Error get all users', e));
    
  }
  
  userRemove(user: User) {
    const that = this;
    that.userService.remove(user)
      .subscribe((success) => {
          if (success) {
            that.users = that.users.filter(u => u.login !== user.login);
          }
        }, e => console.log('Error get all users', e)
      );
  
  }
}
