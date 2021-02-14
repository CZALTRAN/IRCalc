import { Component, OnInit } from '@angular/core';
import { BigfServiceService } from '../services/bigf-service.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private bigfService: BigfServiceService) { }

  ngOnInit(): void {
  }

  

}
