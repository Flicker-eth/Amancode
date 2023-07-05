import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message = '';
  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private utilityService: UtilityService,
    private router: Router,
    private toast:NgToastService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // Minimum length of 8 characters
          Validators.pattern(
            /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d)(?=.*[a-zA-Z]).*$/
          ), // Requires at least 1 special character, 1 number, and 1 alphabet
    
        ],
      ],
    });
  }

  login() {
    this.navigationService
      .loginUser(this.Email.value, this.PWD.value)
      .subscribe((res: any) => {
        if (res.toString() !== 'invalid') {
          this.message = 'Logged In Successfully.';
          this.toast.success({detail:"Loggedin"});
          this.utilityService.setUser(res.toString());
          console.log(this.utilityService.getUser());
          ///  this.utilityService.setUserRole(res.role);
            if(this.utilityService.getUser().role=="Admin")
            this.router.navigate(['/admin-dash-board']); 
            else
            this.router.navigate(['/home']);
        } 
        else {
          this.toast.error({detail:"Invalid Credentials"})
        }
      });
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }
  get Role():FormControl{
    return this.loginForm.get('Role') as FormControl;
  }
}
