export class StudentSubmission{
    public _id:string;
    public name:string;
    public owner:string;
    public status:string;
    public createAt:string;
    public updateAt:string;
    constructor(_id,name,owner,status,createAt,updateAt){
        this._id = _id;        // ID of the solution of assignment i.e. submission that student submit
        this.name = name;      // Name of the owner
        this.owner = owner;    // Owner name that is student who submit this solution
        this.status = status;  // status of the solution that is accepted, rejected, not reviewed
        this.createAt = createAt.substring(0,10);
        this.updateAt = updateAt.substring(0,10);
    }
}