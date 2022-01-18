import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLoginModule } from 'src/app/modules/user-login.module';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private pattern = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private service: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

      this.service.login(new UserLoginModule(this.formLogin.value.email, this.formLogin.value.password));
    
  }
}
