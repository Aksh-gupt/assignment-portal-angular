export class Teacher{
    public _id:String;
    public name:String;
    public email:String;
    public department:String;
    public contact:String;

    constructor(_id:String,name:String, email:String, department:String, contact:String = ""){
        this._id = _id;
        this.name = name;
        this.email = email;
        this.department = department;
        this.contact = contact;
    }
}