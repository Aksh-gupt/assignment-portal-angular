export class StudentSubmission{
    public _id:string;
    public name:string;
    public owner:string;
    public status:string;
    public createAt:string;
    public createTime:string;
    public updateAt:string;
    constructor(_id,name,owner,status,createAt,updateAt){
        this._id = _id;        // ID of the solution of assignment i.e. submission that student submit
        this.name = name;      // Name of the owner
        this.owner = owner;    // Owner name that is student who submit this solution
        this.status = status;  // status of the solution that is accepted, rejected, not reviewed
        this.createAt = createAt.substring(0,10);
        var hour = parseInt(createAt.substring(11,13));
        var timezone = "am";
        if(hour == 0){
            hour = 12;
        }
        else if(hour == 12){
            timezone = "pm";
        }
        else if(hour > 12){
            hour -= 12;
            timezone = "pm";
        }
        this.createTime = hour.toString() + createAt.substring(13,16) + " " + timezone;
        this.updateAt = updateAt.substring(0,10);
    }
}