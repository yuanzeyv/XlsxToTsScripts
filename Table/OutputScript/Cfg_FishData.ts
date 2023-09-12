export interface IFishDataStruct{
	key:number; //唯一键
	name:string; //名称
	pos:{x:number,y:number,z:number,}; //坐标
	data:Array<number>; //数组信息
	isSuccess:boolean; // 是否成功
};
class FishData{  
    private mConfigObject:{[key:number]: IFishDataStruct}  = {};
    private mConfigArray:Array<IFishDataStruct> = new Array<IFishDataStruct>();
    constructor(){
        this.InitConfig();
        this.InitArray();
    }
    private InitConfig():void{
		this.mConfigObject[1] = {key:1,name:"天使鱼",pos:{x:100,y:200,z:300,},data:[1,],isSuccess:false,};
		this.mConfigObject[2] = {key:2,name:"灯笼鱼",pos:{x:101,y:200,z:300,},data:[2,],isSuccess:true,};
		this.mConfigObject[3] = {key:3,name:"炸弹鱼",pos:{x:102,y:200,z:300,},data:[3,4,],isSuccess:false,};
		this.mConfigObject[4] = {key:4,name:"骨头鱼",pos:{x:103,y:200,z:300,},data:[],isSuccess:true,};
		this.mConfigObject[5] = {key:5,name:"螃蟹鱼",pos:{x:104,y:200,z:300,},data:[4,5,],isSuccess:true,};
    }
    private InitArray(){
        for(let key in this.mConfigObject){
            this.mConfigArray.push(this.mConfigObject[key]);
        }
    }
    public GetLen(){
        return this.mConfigArray.length;
    }
    public GetData(key:number): IFishDataStruct | undefined{
        return this.mConfigObject[key];
    } 
    public GetDatas():Readonly<Array<IFishDataStruct>>{
        return this.mConfigArray;
    }
};
export let FishDataConfig:FishData = new FishData();
