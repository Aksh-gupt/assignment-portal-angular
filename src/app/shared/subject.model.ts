export class Subjects{
    public _id:String;
    public name:String;
    public type:String;
    public code:String;
    public subid:String;

    constructor(_id:String,name:String, type:String, code:String, subid:String){
        this._id = _id;
        this.name = name;
        this.type = type;
        this.code = code;
        this.subid = subid;
    }
}