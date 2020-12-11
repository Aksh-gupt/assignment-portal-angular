import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../home/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  auth:string;
  _id:string;
  pass:string = "";
  confirmpass:string = "";
  resetSuccessfull:boolean = false;
  filled:boolean = false;
  constructor(private route:ActivatedRoute, private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.auth = this.route.snapshot.queryParams.auth;
    this._id = this.route.snapshot.fragment;
    if(this.auth === undefined || this._id === null){
      this.router.navigate(['/']);
    }
    if(this.auth !== "student" && this.auth !== "teacher" && this.auth !== "admin"){
      this.router.navigate(['/']);
    }
  }

  onSubmit(){
    this.filled = true;
    document.getElementById("submit").innerHTML = "Loading...";
    this.authService.resetPassword(this._id,this.pass,this.auth).subscribe(
      (response:any) => {
        this.filled = false;
        document.getElementById("submit").innerHTML = "Submit";
        document.getElementById("msg").innerHTML = response.text;
        this.resetSuccessfull = true;
      },(error) => {
        this.filled = false;
        document.getElementById("submit").innerHTML = "Submit";
        document.getElementById("msg").innerHTML = error.error.error;
      }
    )
  }

}
