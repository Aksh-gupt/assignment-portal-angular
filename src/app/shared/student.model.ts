export class Student{
    public _id:String;
    public name:String;
    public email:String;
    public enrollment:String;
    public batch:Number;
    public stream:String;
    public section:Number;

    constructor(_id:String,name:String, email:String, enrollment:String, bss:number){
        this._id = _id;
        this.name = name;
        this.email = email;
        this.enrollment = enrollment;
        let a = bss;
        const section = a%10;
        a /= 10;
        this.section = Math.floor(section);
        const stream = Math.floor(a%10);
        if(stream === 1){
            this.stream = "CSE"
        }
        else if(stream === 2){
            this.stream = "IT";
        }
        else if(stream === 3){
            this.stream = "ECE"
        }
        else{
            this.stream = "EEE";
        }
        a /= 10;
        this.batch = Math.floor(a);
    }
}