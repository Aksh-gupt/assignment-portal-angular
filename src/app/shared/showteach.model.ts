export class Showteach{
    public name:String;
    public stream:String;
    public sem:number;
    public section:number;
    public subid:String;
    public bsss:number
    // name:String,stream:String,section:number,sem:number,subid:String
    constructor(bsnumber:number, subject:String,subid:String){
        var bsss = bsnumber;
        var sem1 = Math.floor(bsss%10);
        bsss /= 10;
        var stream1;
        if(Math.floor(bsss%10) == 1){
            stream1 = "CSE";
        }
        else if(Math.floor(bsss%10) == 2){
            stream1 = "IT";
        }
        else if(Math.floor(bsss%10) == 3){
            stream1 = "ECE";
        }
        else{
            stream1 = "EEE";
        }
        bsss /= 10;
        var section1 = Math.floor(bsss%10);
        const arr = subject.split(' ');
        var name1 = "";
        for(var j=0;j<arr.length;j++){
        name1 += arr[j][0];
        }
        name1 = name1.toUpperCase();


        this.bsss = bsnumber;
        this.name = name1;
        this.stream = stream1;
        this.sem = sem1;
        this.section = section1;
        this.subid = subid;
    }
}