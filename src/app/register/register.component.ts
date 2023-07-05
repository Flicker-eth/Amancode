import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  invaildRPWD: boolean = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private toast:NgToastService,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      mobile: ['', Validators.required,Validators.minLength(10)],
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
      rpwd: [''],
      Role:[''],
    });
  }

  register() {
    let user: User = {
      id: 0,
      firstName: this.FirstName.value,
      lastName: this.LastName.value,
      email: this.Email.value,
      address: this.Address.value,
      mobile: this.Mobile.value,
      password: this.PWD.value,
      createdAt: '',
      modifiedAt: '',
      role:'',
    };

    this.navigationService.registerUser(user).subscribe((res: any) => {
      this.toast.success({detail:"User Added Sucessfully"});
      this.message = res.toString();
    });
  }

  //#region Getters
  get FirstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get Address(): FormControl {
    return this.registerForm.get('address') as FormControl;
  }
  get Mobile(): FormControl {
    return this.registerForm.get('mobile') as FormControl;
  }
  get PWD(): FormControl {
    return this.registerForm.get('pwd') as FormControl;
  }
  get RPWD(): FormControl {
    return this.registerForm.get('rpwd') as FormControl;
  }
  get Role(): FormControl{
    return this.registerForm.get('Role') as FormControl;
  }
  //#endregion
}
