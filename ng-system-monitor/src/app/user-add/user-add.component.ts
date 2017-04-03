import {Component} from '@angular/core';
import {UserService} from '../_services/index';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  model: any = {};
  loading = false;
  error = '';
  
  constructor(private userService: UserService,
              private router: Router) {
  }
  
  userCreate() {
    this.userService.create(this.model)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/users']);
        } else {
          this.error = 'This login is used';
          this.loading = false;
        }
      });
    
  }
}
