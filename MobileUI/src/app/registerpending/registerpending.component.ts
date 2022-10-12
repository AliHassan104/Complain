import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerpending',
  templateUrl: './registerpending.component.html',
  styleUrls: ['./registerpending.component.css']
})
export class RegisterpendingComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  backToLogin(){
    this.router.navigate(["login"]);
  }

}
