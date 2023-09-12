import { ReadFolderSync, WriteStringToFile } from './FileOperation/FileOperation';
import { ParseFiled } from './transTable/ParseFiled'; 
const InputFloderPath = './Table/TransXlsxTable'; // 替换为要读取的文件夹的路径
const OutputFloderPath = './Table/OutputScript'; // 替换为要读取的文件夹的路径
function AAAA():Readonly<Object>{
    return {};
}
let filedNames:Array<string> = ReadFolderSync(InputFloderPath);//获取文件夹下所有木文件信息
let parseFiledArray:Array<ParseFiled> = new Array<ParseFiled>();
for(let name of filedNames){
    let parseData:ParseFiled = new ParseFiled(`${InputFloderPath}/${name}`,name);//创建一个解析字段
    if(!parseData.InitData()){//初始化其数据
        console.log(`解析${name}表 状态:失败  错误原因:${parseData.GetErrorResult()}`);
        continue;
    }
    console.log(`解析${name}表 状态:成功`); 
    parseFiledArray.push(parseData); 
}   
for(let cell of parseFiledArray){
    if(!cell.IsSuccess()) continue; 
    let name = cell.GetName().split(".")[0];//表明
    let configStructName:string = `I${name}Struct`;//数据结构名
    let exportClassName:string = `${name}Config`;//输出表名
    let keyType:string = cell.GetKeyType("key");//获取到key的类型
    //成员变量描述
    let memberArr:{filed: string; desc: string;type: string;}[] = cell.GetMemberAttr();
    let meberDesc:string = "";
    for(let cell of memberArr){ 
        meberDesc += `\n\t${cell.filed}:${cell.type}; //${cell.desc}`;
    } 
    //成员数据区域
    let dataArray:Array<string> = cell.GetDataArray();
    let dataDesc:string = "";
    for(let cell of dataArray)
        dataDesc += `\n\t\tthis.mConfigObject${cell};`;
    
let outputTemplet:string = 
`export interface ${configStructName}{${meberDesc}
};
class ${name}{  
    private mConfigObject:{[key:${keyType}]: ${configStructName}}  = {};
    private mConfigArray:Array<${configStructName}> = new Array<${configStructName}>();
    constructor(){
        this.InitConfig();
        this.InitArray();
    }
    private InitConfig():void{${dataDesc}
    }
    private InitArray(){
        for(let key in this.mConfigObject){
            this.mConfigArray.push(this.mConfigObject[key]);
        }
    }
    public GetLen(){
        return this.mConfigArray.length;
    }
    public GetData(key:${keyType}): ${configStructName} | undefined{
        return this.mConfigObject[key];
    } 
    public GetDatas():Readonly<Array<${configStructName}>>{
        return this.mConfigArray;
    }
};
export let ${exportClassName}:${name} = new ${name}();
`; 
    WriteStringToFile(`./Table/OutputScript`,`Cfg_${name}.ts`, outputTemplet);
}   