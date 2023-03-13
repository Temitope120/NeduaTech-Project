import { Component, OnInit } from '@angular/core';
import { emailRegex, passwordRegex } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/core/services/authentication-service.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationServiceService,
    private toast:NgToastService,
  ) {
    this.signUpForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
    });
  }

  ngOnInit(): void { }

  openSuccess(){
    this.toast.success({detail:'Success Msg', summary:'Record Saved Successfully', position:'br', duration:5000})
  }
  openError(){
    this.toast.error({detail:'error Msg', summary:'An error occured. Please try again', position:'br', duration:5000})
  }

  submit() {
    let email = this.signUpForm.value.email;
    let payload = {
      ...this.signUpForm.value,
    };


    this.authService.signUp(payload).subscribe((res: any) => {
      if (res == null) {
        this.openError();
        return;
      } else if (res !== null) {
        console.log(res);
        this.openSuccess();
        this.signUpForm.reset();
      }
    },
      (err: any) => {
        this.openError();
      }
    );
  }
}

