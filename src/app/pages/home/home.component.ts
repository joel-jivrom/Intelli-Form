import { ListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  route: string; 
  constructor( private router: Router, private listService: ListService, public location: Location) {
    // router.events.subscribe((val) => { if(location.path() != '') { this.route = location.path(); } else { this.route = 'Home' } }); 
     
   }

  ngOnInit(): void {
    this.loadList();
  }

  formPage() {
    this.router.navigateByUrl('/form');
  }

  listPage() {
    this.router.navigateByUrl('/list');
  }

  loadList() {
    this.listService.loadList();
  }

}
