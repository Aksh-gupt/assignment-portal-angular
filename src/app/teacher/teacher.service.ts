import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Teach } from '../shared/teach.model';


@Injectable()
export class TeacherService{ 
    private allSubject:String[] = [];
    private mySubjects:Teach[] = [];
    sendMySubject = new Subject<Teach[]>();
    constructor(private http:HttpClient, private router:Router,private dom:DomSanitizer){}

    // THIS IS TO GET NAME OF ALL THE SUBJECTS THAT ARE PRESENT IN THE DATABASE. TO SHOW ALL THE SUBJECT
    // WHEN TEACHER WANT TO ADD ANY SUBJECT TO IT'S TEACH LIST
    getSubjectName(){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        var auth = parseInt(this.getCookieAuth());
        if(auth != 2){
            alert("Please login as teacher");
            return;
        }
        const headers = new HttpHeaders({'Authorization': `${token}`});
        headers.append('Content-Type', 'application/json');
        this.http.get("http://localhost:3000/subjects/name",{headers: headers}).subscribe(
            (response:String[]) => {
                this.allSubject = response;
                console.log(this.allSubject);
            },(error) => {
                console.log(error);
            }
        )
    }

    // THIS IS TO GET ALL THE TEACHER'S SUBJECT FROM THE SERVER WHEN TEACHER LOGIN OR ON START OF THE SITE
    getMySubject(){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        var auth = parseInt(this.getCookieAuth());
        if(auth != 2){
            alert("Please login as teacher");
            return;
        }
        const headers = new HttpHeaders({'Authorization': `${token}`});
        headers.append('Content-Type', 'application/json');
        this.http.get("http://localhost:3000/teacher/mysubject",{headers: headers}).subscribe(
            (response:Teach[]) =>{
                this.mySubjects = response;
                this.sendMySubject.next(this.mySubjects.slice());
                // console.log(this.mySubjects);
            },(error) =>{
                console.log(error)
            }
        )
    }

    // TO GET NAME OF ALL THE SUBJECT THAT ARE PRESENT. THIS IS BASICALLY TO SHOW ALL THE OPTION
    // WHEN TEACHER WANT TO ADD ANY SUBJECT
    getSubjects(){
        return this.allSubject.slice();
    }

    // TO GET ALL THE SUBJECT ON THE PAGE COMPONENT TO SHOW TO TEACHER
    getMySubjectToPage(){
        return this.mySubjects.slice();
    }


    // TO SEND POST REQUEST TO THE SERVER TO ADD THE SUBJECT IN TEACHER'S SUBJECT
    addSubject(teach:any){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        var auth = parseInt(this.getCookieAuth());
        if(auth != 2){
            alert("Please login as teacher");
            return;
        }
        const headers = new HttpHeaders({'Authorization': `${token}`});
        headers.append('Content-Type', 'application/json');
        return this.http.post("http://localhost:3000/teacher/addsubject",teach,{headers: headers})
    }

    addSubjectToMySubject(bsss:number, subject:String,subid:String){
        this.mySubjects.push(
            new Teach(bsss,subject,subid)
        )
    }


    addAssignment(fd){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        var auth = parseInt(this.getCookieAuth());
        if(auth != 2){
            alert("Please login as teacher");
            return;
        }
        const headers = new HttpHeaders({'Authorization': `${token}`});
        headers.append('Content-Type', 'application/json');
        return this.http.post("http://localhost:3000/assignment/make",fd,{headers:headers});
    }

    allAssignment(send){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        var auth = parseInt(this.getCookieAuth());
        if(auth != 2){
            alert("Please login as teacher");
            return;
        }
        const headers = new HttpHeaders({'Authorization': `${token}`});
        headers.append('Content-Type', 'application/json');
        return this.http.post("http://localhost:3000/allassignment",send,{headers: headers})
    }

    getAssignmentPdf(_id){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        var auth = parseInt(this.getCookieAuth());
        if(auth != 2){
            alert("Please login as teacher");
            return;
        }
        const headers = new HttpHeaders({'Authorization': `${token}`});
        headers.append('Content-Type', 'application/json');
        // ariable_name=; 
        console.log(this.dom.bypassSecurityTrustResourceUrl(`http://localhost:3000/assignment/${_id}`))
        // return this.http.get(`http://localhost:3000/assignment/${_id}`,{headers: headers, responseType: 'blob'});
    }

    // TO CLEAR ALL THE SUBJECT STORE IN ANGULAR ON LOGOUT AS TEACHER
    clearOnLogout(){
        this.allSubject = [];
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