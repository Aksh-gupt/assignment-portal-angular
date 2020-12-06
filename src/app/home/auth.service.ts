import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AdminService } from '../admin/admin.service';
import { TeacherService } from '../teacher/teacher.service';
import { StudentService } from '../student/student.service';


@Injectable()
export class AuthService{
    authorise:number = 0;
    private token:String = "";
    forAuthorise = new Subject();
    logged = new Subject();

    constructor(private http:HttpClient, private router:Router, private adminService:AdminService, 
                private teacherService:TeacherService, private studentService:StudentService ){}

    loginAdmin(admin:any){
        if(this.token !== null){
            alert("You are already logged in. If you want to change account please logout first");
            return;
        }
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/admin/login', admin,{headers: headers});
    }

    loginStudent(student:any){
        if(this.token !== null){
            alert("You are already logged in. If you want to change account please logout first");
            return;
        }
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        // LINK HAVE TO CHANGE
        return this.http.post('http://localhost:3000/student/login', student,{headers: headers});
    }

    loginTeacher(teacher:any){
        if(this.token !== null){
            alert("You are already logged in. If you want to change account please logout first");
            return;
        }
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        // LINK HAVE TO CHANGE
        return this.http.post('http://localhost:3000/teacher/login', teacher,{headers: headers});
    }

    setToken(token:String,auth:number){
        this.token = token;
        this.authorise = auth;
        var d = new Date();
        d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = `access_token=${token};${expires};path=/`;
        document.cookie = `auth=${auth};${expires};path=/`;
        this.logged.next(true);
    }

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

    onStart(){
        this.token = this.getCookieToken();
        if(this.token === null){
            this.authorise = 0;
            return 0;
        }
        else{
            const one = this.getCookieAuth()
            console.log(this.getCookieAuth());
            this.authorise = parseInt(one);
            if(this.authorise === 3){
                this.adminService.getAllTeacher();
                this.adminService.getAllStudent();
                this.adminService.getAllSubject();
            }
            else if(this.authorise === 2){
                this.teacherService.getSubjectName();
                this.teacherService.getMySubject();
            }
            else if(this.authorise === 1){
                this.studentService.getSubjects();
            }
        }
        // this.retName();
        return true;
    }

    getToken(){
        return this.token;
    }

    isLogged(){ 
        if(this.token === null){
            return false;
        }
        return true;
    }

    afterLogout(){
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.token = null;
        // this.accountService.logout();
        this.authorise = 0;
        // this.logged.next(false);
        // this.forName.next("");
        this.router.navigate(['/']);
    }

    adminLogout(){
        const token = 'Bearer ' + this.token;
        const headers = new HttpHeaders({'Authorization': `${token}`});
        headers.append('Content-Type', 'application/json');
        this.http.post('http://localhost:3000/admin/logout',"",{headers: headers}).subscribe(
            (response) => {
                console.log(response);
                this.adminService.clearOnLogout();
                this.afterLogout();
                return true;
            },(error)=>{
                // console.log(error);
                return false;
            }
        );
    }
    teacherLogout(){
        if(this.authorise !== 2){
            alert("Please login as teacher first")
            return;
        }
        const token = 'Bearer ' + this.token;
        const headers = new HttpHeaders({'Authorization': `${token}`})
        headers.append('Content-Type', 'application/json')
        this.http.post('http://localhost:3000/teacher/logout',"",{headers: headers}).subscribe(
            (response) => {
                console.log(response)
                this.teacherService.clearOnLogout();
                this.afterLogout();
            },(error) => {
                console.log(error);
            }
        )
    }
    studentLogout(){
        if(this.authorise !== 1){
            alert("Please login as student first")
            return;
        }
        const token = 'Bearer ' + this.token;
        const headers = new HttpHeaders({'Authorization': `${token}`})
        headers.append('Content-Type', 'application/json')
        this.http.post('http://localhost:3000/student/logout',"",{headers: headers}).subscribe(
            (response) => {
                console.log(response)
                //  CLEAR ON LOGOUT WILL BE CALL 
                // this.teacherService.clearOnLogout();
                this.afterLogout();
            },(error) => {
                console.log(error);
            }
        )
    }

    onLogout(){
        if(this.token === null){
            return false;
        }
        if(this.authorise === 1){
            this.studentLogout();
        }
        else if(this.authorise === 2){
            this.teacherLogout();
        }
        else{
            this.adminLogout();
        }
    }

    forgotPassword(email:string){
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        var data = {
            email: email
        }
        // console.log(data);
        return this.http.post('https://codestore-node.herokuapp.com/resetrequest', data,{headers: headers});
    }

    resetPassword(_id:String, password:String){
        var data = {
            password: password
        }
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(`https://codestore-node.herokuapp.com/resetpass/${_id}`, data, {headers: headers});
    }


}