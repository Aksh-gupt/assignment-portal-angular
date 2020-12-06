import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectpageComponent } from './subjectpage.component';

describe('SubjectpageComponent', () => {
  let component: SubjectpageComponent;
  let fixture: ComponentFixture<SubjectpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
