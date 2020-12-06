import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { StudentSubjectModel } from '../../shared/studentsubjects.model';

@Component({
  selector: 'app-studentsubject',
  templateUrl: './studentsubject.component.html',
  styleUrls: ['./studentsubject.component.css']
})
export class StudentsubjectComponent implements OnInit {
  mySubjects:StudentSubjectModel[];
  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
    this.mySubjects = this.studentService.getMySubjectToShow();
    console.log(this.mySubjects)
    this.studentService.sendMySubject.subscribe(
      (subjects:StudentSubjectModel[]) => {
        this.mySubjects = subjects;
      }
    )
  }

}
