import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../home/auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  auth:boolean = false;
  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.authorise !== 1){
      this.router.navigate(['/']);
    }
    else if(this.authService.authorise === 1){
        this.auth = true;
    }
  }

  onLogout(){
    this.authService.studentLogout();
  }

}
