export interface IBuffTableStruct{
	key:number; //唯一键
	name:string; //名称
	duration:number; //持续时间
	desc:string; //文本描述
	buff_1:{BuffType:number,addtionValue:number,}; //第一个加成Buff
	buff_2:{BuffType:number,addtionValue:number,}; //第二个加成Buff
	buff_3:{BuffType:number,addtionValue:number,}; //第三个加成Buff
	buff_4:{BuffType:number,addtionValue:number,}; //第四个加成Buff
	buff_5:{BuffType:number,addtionValue:number,}; //第五个加成Buff
};
class BuffTable{  
    private mConfigObject:{[key:number]: IBuffTableStruct}  = {};
    private mConfigArray:Array<IBuffTableStruct> = new Array<IBuffTableStruct>();
    constructor(){
        this.InitConfig();
        this.InitArray();
    }
    private InitConfig():void{
		this.mConfigObject[0] = {key:0,name:"错误的Buff",duration:-1,desc:"填错表了，会默认替换为此Buff",buff_1:{BuffType:0,addtionValue:0,},buff_2:{BuffType:0,addtionValue:0,},buff_3:{BuffType:0,addtionValue:0,},buff_4:{BuffType:0,addtionValue:0,},buff_5:{BuffType:0,addtionValue:0,},};
		this.mConfigObject[1] = {key:1,name:"冷静",duration:-1,desc:"生物非常的冷静，善于分析与观察。攻击力 提示10%，防御力提升10%",buff_1:{BuffType:1,addtionValue:500,},buff_2:{BuffType:2,addtionValue:500,},buff_3:{BuffType:3,addtionValue:500,},buff_4:{BuffType:4,addtionValue:500,},buff_5:{BuffType:5,addtionValue:500,},};
    }
    private InitArray(){
        for(let key in this.mConfigObject){
            this.mConfigArray.push(this.mConfigObject[key]);
        }
    }
    public GetLen(){
        return this.mConfigArray.length;
    }
    public GetData(key:number): IBuffTableStruct | undefined{
        return this.mConfigObject[key];
    } 
    public GetDatas():Readonly<Array<IBuffTableStruct>>{
        return this.mConfigArray;
    }
};
export let BuffTableConfig:BuffTable = new BuffTable();
