import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../home/auth.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  auth:boolean = false;
  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit() {
    if(this.authService.authorise !== 2){
      this.router.navigate(['/']);
    }
    else if(this.authService.authorise === 2){
        this.auth = true;
    }
  }

  onLogout(){
    this.authService.teacherLogout();
  }
}
