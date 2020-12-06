import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TeacherService } from '../teacher.service';
import { Teach } from '../../shared/teach.model';
import { Showteach } from '../../shared/showteach.model';

@Component({
  selector: 'app-subjectpage',
  templateUrl: './subjectpage.component.html',
  styleUrls: ['./subjectpage.component.css']
})
export class SubjectpageComponent implements OnInit {
  subjectsName:String[] = [];
  semesters:Number[] = [];
  // mySubjects:Teach[] = [];
  showMySubject:Showteach[] = [];

  filled:boolean = false;

  formName:String = "";
  formStream:string = "1";
  formSemester:number;
  formSection:string = "1";

  constructor(private teacherService:TeacherService) {
    this.filled = false;
  }

  ngOnInit() {
    var month = new Date().getMonth();
    var i = 0;
    if(month >= 7){
      i = 1;
    }
    else{
      i = 2;
    }
    this.formSemester = i;
    for(;i<=8;i+=2){
      this.semesters.push(i);
    }

    const mySubjects:Teach[] = this.teacherService.getMySubjectToPage();
    this.fullConvert(mySubjects);
    this.teacherService.sendMySubject.subscribe(
      (subjects:Teach[]) => {
        const mySubjects:Teach[] = subjects;
        this.fullConvert(mySubjects);
        console.log(mySubjects);
      }
    ) 
  }

  // convert(bsnumber:number, subject:String,subid:String){
  //   var bsss = bsnumber;
  //   var sem = Math.floor(bsss%10);
  //   bsss /= 10;
  //   var stream;
  //   if(bsss%10 == 1){
  //     stream = "CSE";
  //   }
  //   else if(bsss%10 == 2){
  //     stream = "IT";
  //   }
  //   else if(bsss%10 == 3){
  //     stream = "ECE";
  //   }
  //   else{
  //     stream = "EEE";
  //   }
  //   bsss /= 10;
  //   var section = Math.floor(bsss%10);
  //   const arr = subject.split(' ');
  //   var name = "";
  //   for(var j=0;j<arr.length;j++){
  //     name += arr[j][0];
  //   }
  //   name = name.toUpperCase();
  //   return new Showteach(name,stream,section,sem,subid)
  // }

  fullConvert(mySubjects:Teach[]){
    this.showMySubject = [];
    var len = mySubjects.length;
    for(var i=0;i<len;i++){
      this.showMySubject.push(
        new Showteach(mySubjects[i].bsss, mySubjects[i].subject, mySubjects[i].subid)
      )
    } 
  }

  teach:any = {
    bsss: 0,
    subject: ""
  }

  getName(){
    setTimeout(() => {
      this.subjectsName = this.teacherService.getSubjects();
      if(this.subjectsName.length > 0){
        this.formName = this.subjectsName[0];
      }
    },1000)
  }
  
  // IN THIS WE ALSO HAVE TO CHECK IF THIS SUBJECT THAT TEACHER WANT TO ADD IS ALREADY PRESENT OR NOT
  onSubmit(){
    if(this.formName === ""){
      return;
    }
    this.teach.subject = this.formName;
    var bsss = new Date().getFullYear();
    bsss = bsss%100;
    var temp;
    if(this.formSemester%2 == 0){
      temp = this.formSemester/2;
    }
    else{
      temp = (this.formSemester-1)/2;
    }
    bsss -= temp;
    bsss = bsss*10 + parseInt(this.formSection);
    bsss = bsss*10 + parseInt(this.formStream);
    bsss = bsss*10 + parseInt(this.formSemester.toString());
    this.teach.bsss = bsss;
    console.log(this.teach);
    this.teacherService.addSubject(this.teach).subscribe(
        (response: Teach) => {
            // console.log(response);
            this.teacherService.addSubjectToMySubject(response.bsss,response.subject,response.subid);
            // this.mySubjects.push(
            //   new Teach(response.bsss,response.subject,response.subid)
            // )
            this.showMySubject.push(
              new Showteach(response.bsss,response.subject,response.subid)
            )
            this.formName = this.subjectsName[0];
            this.formSection = "1";
            this.formStream = "1";
        },(error) => {
            console.log(error);
        }
    )
  }
}
