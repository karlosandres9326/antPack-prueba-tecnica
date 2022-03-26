import { Component, OnInit } from "@angular/core";

import { ApiService } from '../app/services/api/api.service';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {

  userList: any = [];

  constructor( private api: ApiService) {}

  ngOnInit(): void {
    this.api.getUsers().subscribe(response => this.userList = response);
  }
}
