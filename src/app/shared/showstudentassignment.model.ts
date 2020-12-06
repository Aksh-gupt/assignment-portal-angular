export class ShowStudentAssignment{
    public _id:string;
    public description:string;
    public name:string;
    public last:string;
    constructor(_id:string, name:string, description:string, last:string){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.last = last;
    }
}