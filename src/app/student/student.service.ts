import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { StudentSubjectModel } from '../shared/studentsubjects.model';

@Injectable()
export class StudentService{ 
    constructor(private http:HttpClient, private router:Router){}
    mySubjects:StudentSubjectModel[] = [];
    sendMySubject = new Subject<StudentSubjectModel[]>();
    getSubjects(){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        var auth = parseInt(this.getCookieAuth());
        if(auth != 1){
            alert("Please login as student");
            return;
        }
        const headers = new HttpHeaders({'Authorization': `${token}`});
        headers.append('Content-Type', 'application/json');
        this.http.get('http://localhost:3000/student/subjects',{headers: headers}).subscribe(
            (response:any)=>{
                // console.log(response)
                var len = response.length;
                for(var i=0;i<len;i++){
                    this.mySubjects.push(
                        new StudentSubjectModel(response[i].bsss,response[i].subject,response[i].subid)
                    )
                }
                this.sendMySubject.next(this.mySubjects.slice());
                // console.log(this.mySubjects);
            },(error) =>{
                console.log(error)
            }
        )
    }

    getAssignments(body:any){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        var auth = parseInt(this.getCookieAuth());
        if(auth != 1){
            alert("Please login as student");
            return;
        }
        const headers = new HttpHeaders({'Authorization': `${token}`});
        headers.append('Content-Type', 'application/json');
        return this.http.post("http://localhost:3000/student/subject/assignment",body,{headers: headers});
    }

    getMySubjectToShow(){
        return this.mySubjects.slice();
    }


    clearOnLogout(){
    }

    // TO GET THE TOKEN FROM THE COOKIE
    getCookieToken() {
        var cookieArr = document.cookie.split(";");
        
        for(var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");
            
            if("access_token" == cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        
        return null;
    }

    //  TO GET AUTHORIZATION TYPE FROM THE COOKIE
    getCookieAuth(){
        var cookieArr = document.cookie.split(";");
        
        for(var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");
            
            if("auth" == cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        
        return null;
    }
}