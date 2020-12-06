import { Component, OnInit } from '@angular/core';

import { TeacherService } from '../teacher.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showassignment',
  templateUrl: './showassignment.component.html',
  styleUrls: ['./showassignment.component.css']
})
export class ShowassignmentComponent implements OnInit {
  _id:string;
  file:any;
  constructor(private teacherService: TeacherService, private route:ActivatedRoute) { }

  ngOnInit() {
    this._id = this.route.snapshot.params.id;
    console.log(this._id);
    // this.teacherService.getAssignmentPdf(this._id).subscribe(
    //   (response:string) => {
    //     var mediaType = 'application/pdf';
    //     var blob = new Blob([response], {type: mediaType});
    //     var filename = 'test.pdf';
    //     console.log(blob)
    //     // saveAs(blob, filename);
    //   }
    //   // ,(error) => {
    //   //   console.log(error.error.text)
    //   //   this.file = error.error.text;
    //   // }
    // )
  }

}
