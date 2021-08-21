import { Component, OnInit } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("hohola", APP_BASE_HREF);
  }

}
