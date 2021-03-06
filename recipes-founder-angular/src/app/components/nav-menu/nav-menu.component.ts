import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: [
    './nav-menu.component.css'
  ]
})
export class NavMenuComponent implements OnInit {

  isLogged=false;
  constructor(private service:AuthService) { }

  ngOnInit(): void {
    console.log("Info: The menu is instantiated. Try to check if the user is logged!");
    this.isLogged=this.service.isLogged();
  }

  doLoggOut():void{
    this.service.doLogout();
    window.location.reload();
  }
}
