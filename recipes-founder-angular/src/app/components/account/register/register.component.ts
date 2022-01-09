import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegisterModule } from 'src/app/modules/user-register.module';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private pattern =/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
  formRegister = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.pattern(this.pattern)]),
    emailConfirmation: new FormControl('',[Validators.required,Validators.pattern(this.pattern)]),
    password: new FormControl(''),
    passwordConfirmation: new FormControl(''),
    fullname: new FormControl(''),
  });
  isDone=0;
  constructor(private service:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isDone++;
    if (this.isDone==1) {
      this.service.register(new UserRegisterModule(this.formRegister.value.email,this.formRegister.value.password,this.formRegister.value.fullname));
      this.isDone=0;
    }
  }
}
