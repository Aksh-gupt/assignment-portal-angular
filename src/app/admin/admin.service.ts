import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs'

import { Teacher } from '../shared/teacher.model';
import { Student } from '../shared/student.model';
import {Subjects} from '../shared/subject.model'
import { Router } from '@angular/router';


@Injectable()
export class AdminService{

    constructor(private http:HttpClient, private router:Router){}
    private teachers:Teacher[] = [];
    private students:Student[] = [];
    private subjects:Subjects[] = [];
    sendAllTeacher = new Subject<Teacher[]>();
    sendAllStudent = new Subject<Student[]>();
    sendAllSubject = new Subject<Subjects[]>();
    fetchTeachers:boolean = false;
    fetchStudents:boolean = false;
    fetchSubjects:boolean = false;

    createTeacher(teacher:any){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        var auth = parseInt(this.getCookieAuth());
        if(auth != 3){
            alert("Only admin can create teacher");
            return;
        }
        const headers = new HttpHeaders({'Authorization': `${token}`});
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/teacher/signup',teacher,{headers: headers});
    }

    createStudent(student:any){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        var auth = parseInt(this.getCookieAuth());
        if(auth != 3){
            alert("Only admin can create student");
            return;
        }
        const headers = new HttpHeaders({'Authorization': `${token}`});
        headers.append('Content-Type', 'application/json');
        // console.log(student)
        // console.log(headers)
        return this.http.post('http://localhost:3000/student/signup',student,{headers: headers});
    }

    createSubject(subject: any){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        var auth = parseInt(this.getCookieAuth());
        if(auth != 3){
            alert("Only admin can create subject");
            return;
        }
        const headers = new HttpHeaders({'Authorization': `${token}`});
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/subject/add',subject,{headers: headers});
    }

    updateTeacher(_id,teacher){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        var auth = parseInt(this.getCookieAuth());
        if(auth != 3){
            alert("Only admin can create subject");
            return;
        }
        const headers = new HttpHeaders({'Authorization': `${token}`});
        headers.append('Content-Type', 'application/json');
        return this.http.post(`http://localhost:3000/teacher/update/${_id}`,teacher,{headers: headers});
    }

    updateStudent(_id,student){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        var auth = parseInt(this.getCookieAuth());
        if(auth != 3){
            alert("Only admin can create subject");
            return;
        }
        const headers = new HttpHeaders({'Authorization': `${token}`});
        headers.append('Content-Type', 'application/json');
        return this.http.post(`http://localhost:3000/student/update/${_id}`,student,{headers: headers});
    }

    updateSubject(_id,subject){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        var auth = parseInt(this.getCookieAuth());
        if(auth != 3){
            alert("Only admin can create subject");
            return;
        }
        const headers = new HttpHeaders({'Authorization': `${token}`});
        headers.append('Content-Type', 'application/json');
        return this.http.post(`http://localhost:3000/subject/update/${_id}`,subject,{headers: headers});
    }

    addStudent(student:any){
        this.students.push(
            new Student(student._id,student.name,student.email,student.enrollment,student.bss)
        );
    }

    addTeacher(teacher:any){
        // console.log(teacher,"this is student");
        this.teachers.push(
            new Teacher(teacher._id,teacher.name,teacher.email,teacher.department)
        );
    }

    addSubject(subject:any){
        this.subjects.push(
            new Subjects(subject._id,subject.name,subject.type,subject.code,subject.subid)
        )
    }

    getAllTeacher(){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        const headers = new HttpHeaders({'Authorization': `${token}`})
        headers.append('Content-Type', 'application/json')

        this.http.get("http://localhost:3000/allteacher", {headers:headers}).subscribe(
            (response:any) => {
                // console.log(response);
                var len = response.length;
                for(var i=0;i<len;i++){
                    this.teachers.push(
                        new Teacher(response[i]._id,response[i].name,response[i].email,response[i].department)
                    );
                }
                // console.log(this.students);
                this.fetchTeachers = true;
                this.sendAllTeacher.next(this.teachers.slice());
            },(error) =>{
                console.log(error);
            }
        )
    }

    getAllSubject(){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        const headers = new HttpHeaders({'Authorization': `${token}`})
        headers.append('Content-Type', 'application/json')

        this.http.get("http://localhost:3000/allsubject", {headers:headers}).subscribe(
            (response:any) => {
                // console.log(response);
                var len = response.length;
                for(var i=0;i<len;i++){
                    this.subjects.push(
                        new Subjects(response[i]._id,response[i].name,response[i].type,response[i].code,response[i].subid)
                    );
                }
                console.log(this.subjects);
                this.fetchSubjects = true;
                this.sendAllSubject.next(this.subjects.slice());
            },(error) =>{
                console.log(error);
            }
        )
    }

    getAllStudent(){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        const headers = new HttpHeaders({'Authorization': `${token}`})
        headers.append('Content-Type', 'application/json')

        this.http.get("http://localhost:3000/allstudent", {headers:headers}).subscribe(
            (response:any) => {
                // console.log(response);
                var len = response.length;
                for(var i=0;i<len;i++){
                    this.students.push(
                        new Student(response[i]._id,response[i].name,response[i].email,response[i].enrollment,response[i].bss)
                    );
                }
                this.fetchStudents = true;
                this.sendAllStudent.next(this.students.slice());
            },(error) =>{
                console.log(error,"this is error and this is written to mention that this is error");
            }
        )
    }


    getTeacher(){
        return this.teachers.slice();
    }

    getStudent(){
        return this.students.slice();
    }

    getSubject(){
        return this.subjects.slice();
    }

    deleteSubjectFromSubjects(_id:String){
        this.subjects = this.subjects.filter((subject) => {
            return subject._id === _id?false:true;
        })
    }

    // THIS IS TO REQUEST TO THE SERVER
    deleteSubject(_id:String){
        var token = this.getCookieToken();
        token = 'Bearer ' + token;
        const headers = new HttpHeaders({'Authorization': `${token}`})
        headers.append('Content-Type', 'application/json')
        const sub = {
            _id: _id
        }
        return this.http.post("http://localhost:3000/subject/delete",sub,{headers:headers})
    }

    clearOnLogout(){
        this.teachers = [];
        this.subjects = [];
        this.students = [];
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
}