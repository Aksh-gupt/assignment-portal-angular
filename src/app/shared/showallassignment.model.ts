export class ShowAllAssignment{
    public name:string;
    public _id:string;
    public last:string;
    constructor(_id:string, name:string,last:string){
        this._id = _id;
        this.name = name
        this.last = last;
    }
}