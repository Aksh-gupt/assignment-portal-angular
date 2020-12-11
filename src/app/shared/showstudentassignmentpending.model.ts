export class ShowStudentAssignment{
    public _id:string;
    public name:string;
    public status:string;
    public createdAt:string;
    public updatedAt:string;
    constructor(_id:string, name:string,status:string="",createdAt:string=""){
        this._id = _id;
        this.name = name;
        this.status = status;
        if(createdAt === ""){
            this.createdAt = createdAt;
        }
        else{
            this.createdAt = createdAt.substring(0,10) + "  " + createdAt.substring(11,16);
        }
    }
    change(status,createdAt){
        this.status = status;
        this.createdAt = createdAt.substring(0,10) + "  " + createdAt.substring(11,16);
    }
}