import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-request-lab',
  templateUrl: './request-lab.component.html',
  styleUrls: ['./request-lab.component.css']
})
export class RequestLabComponent implements OnInit {
  show:boolean;
  constructor() { 
    this.show = false;
  }

  ngOnInit() {
  }

}
