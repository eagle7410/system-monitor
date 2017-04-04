import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls : ['login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  isShowPass : boolean = false;
  loading = false;
  error = '';
  
  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }
  
  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }
 
  submit() {
    
    this.loading = true;
    
    this.authenticationService.login(this.model.login, this.model.pass)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/users']);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }
  
}
