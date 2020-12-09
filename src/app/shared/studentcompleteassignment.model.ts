export class StudentCompleteAssignment{
    public _id:string;
    public status:string;
    public createdAt:string;
    constructor(_id, status, createdAt){
        this._id = _id;
        this.status = status;
        this.createdAt = createdAt;
    }
}