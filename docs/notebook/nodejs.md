[TOC]

# Node.js

<img src="nodejs.assets/image-20211008225950543.png" alt="image-20211008225950543" style="zoom:50%;" />

![image-20211008230017658](nodejs.assets/image-20211008230017658.png)

## 模块化的历史

***早期***

* global被污染，很容易命名冲突

```js
function foo(){
    //...
}
function bar(){
    //...
}
```



***namespace模式***

* 减少Global上的变量数目
* 本质是对象，==一点都不安全==

```js
var MYAPP = {
    foo:function(){},
    bar:function(){}
}
MYAPP.foo();
```

***匿名闭包：IIFE模式***

* 函数是js唯一的local scope

```js
var Module = (function(){
    var _private = "safe now",
    function foo(){
        console.log("向外暴露了");
    }
    return {
        foo:foo
    }
    /*window.moduel = {
    	foo:foo //放在window里也行
    }*/
})();

Module.foo();// 向外暴露了
Module._private; //undefined
```

***IIFE增强版本***

```js
(function(window, $){
    let msg = "模块信息";
    function foo() {
        console.log(msg);
    };
    window.module1 = foo;
    $('body').css("background","red");
})(window, jQuery);
```





***引入依赖***

```js
var Module = (function($){
    var _$body = $("body");
    var foo = function(){
        console.log(_$body);
    }
    return {
        foo:foo
    }
})(jQuery);

Module.foo();
```

### 模块化的目的

1. 降低复杂度
2. 减少耦合
3. 方便部署

## commonJS

![image-20211009120959281](nodejs.assets/image-20211009120959281.png)

暴露模块：module.exports和export.xxx暴露的本质是暴露了exports对象

引入模块：第三方模块：npm下的包

### Node.js模块化

<img src="nodejs.assets/image-20211009121201154.png" alt="image-20211009121201154" style="zoom:50%;" />

![image-20211009122751847](nodejs.assets/image-20211009122751847.png)

***运行app.js***

![image-20211009125030713](nodejs.assets/image-20211009125030713.png)

### Browserify模块化

***创建文件目录***

* js

  * dist   //打包生成文件所在目录
  * src    //源码所在文件
    * module1.js
    * module2.js
    * module3.js
    * app.js    //应用主源文件

* index.html

* package.json

  ```js
  {
      "name": "commonjs_browserify",
      "version": "1.0.0"
  }
  ```

***下载browserify包***

* 全局安装一次browserify：npm install browserify -g
* 局部安装一次：npm install browserify \-\-save -dev 

## node服务器对比java服务器

java解决高并发：专人专用

node解决高并发：回调

两种情况：

1. 客人点菜快（I/O密集型
2. 客人点餐墨迹（cpu密集型

![image-20211009143148528](nodejs.assets/image-20211009143148528.png)

## node中函数的特点

1. <img src="nodejs.assets/image-20211009151015634.png" alt="image-20211009151015634" style="zoom: 50%;float:left" />

***在函数内部找到自己外层的函数***

```js
function run(a,b,c){
	console.log(arguments.callee.toString());//在node中运行
}
run(1,2,4);
```

![image-20211009150107251](nodejs.assets/image-20211009150107251.png)

为什么我们能使用`module.exports = `和`exports.xxx`，因为在node中包裹的函数体给我们了

## node中的global

![image-20211009164142864](nodejs.assets/image-20211009164142864.png)

<img src="nodejs.assets/image-20211009165526775.png" alt="image-20211009165526775" style="zoom: 67%; float: left;" />

node中禁止函数的this找到global，而是指向了一个空对象

```html
console.log(this);//{}
console.log(global);
```

***延迟定时器***

setTimeout

```js
setTimeout(()=>{
    console.log("后执行");
});
console.log("先执行");
```

***立即执行函数（回调***

setImmediate

```js
setImmediate(()=>{
	console.log("后执行");
});
console.log("先执行主线程")
```

***立即执行函数（回调***

process.nextTick()

```js
process.nextTick(()=>{
	console.log("后执行");
});
console.log("先执行")
```



## node中的事件循环模型

![image-20211009174652672](nodejs.assets/image-20211009174652672.png)

## 包和包管理器

### package包

 Node.js的包基本遵循CommonJS规范，包将一组相关的模块组合在一起，形成一组完整的工具。

包由包结构和包描述两个部分组成：

1. 包结构：用于组织包中的各种文件
2. 包描述文件：描述包的相关信息，以供外部读取分析

<img src="nodejs.assets/image-20211009181323633.png" alt="image-20211009181323633" style="zoom:50%;float:left" />

<img src="nodejs.assets/image-20211009182830310.png" alt="image-20211009182830310" style="zoom:50%;float:left" />

### 如何让一个普通文件变成一个包？

1. 让这个文件夹拥有一个：package.json文件即可，且package.json中的内容要合法。
2. 执行命令：npm init
3. 包名的要求：不能有中文、不能有大写字母、尽量不用数字开头、不能与npm仓库上其他包同名

### npm使用

通过npm可以对node的包进行搜索、下载、安装、删除、上传

***搜索***

1. npm search xxx
2. 通过网址搜索：www.npmjs.com

***安装***

一、

1. npm install xxxx \-\-save   （\-\-save是早期用法，当时不写\-\-save，package.json中是没有依赖的
2. npm install xxxx -S  （简化版
3. **npm i xxxx**
4. 备注
   * 局部安装完的第三方包，放在当前目录中node_modules这个文件夹里
   * 安装完毕会自动生成一个package-lock.json（npm版本在5以后才有），里面缓存的是每个下载过的包的地址，目的是下次安装时速度快一点。
   * 当安装完一个包，该包的名字会自动写入到package.json中【dependencies(生产依赖)里】。npm5及之前版本要加上\-\-save后缀才可以。

二、

1. npm install xxx –save -dev
2. **npm i xxx -D** 安装该包并将该包写入到【developendencies(开发依赖中)】

三、

1. npm i xxx -g 全局安装xxx包（一般来说，带有指令集的包要进行全局安装，例如：browserify、babel等）

   全局安装的包，其<u>指令</u>到处可用.

   查看全局安装的位置：npm root -g

四、

* npm i xxx@yyy  安装指定版本的包

五、

* npm i   安装package.json中声明的所有包

<u>什么是开发依赖、生产依赖？</u>

<img src="nodejs.assets/image-20211009194729904.png" alt="image-20211009194729904" style="zoom: 50%;float:left" />

要发布项目的时候，就将package.json中的开发依赖删除，然后重新`npm i`

<u>package-lock.json干了什么？</u>

<img src="nodejs.assets/image-20211009192823277.png" alt="image-20211009192823277" style="zoom: 33%;" />

当我们使用npm i xxx时，我们向美国的npm服务器发送了两次请求

1. `我需要jquery`。而npm主服务器并没有存储任何的包，在得知我们需要这个包时，主服务器就会向其他子节点要这个包，然后将这个有这个包的节点返回给我们
2. `我要去jquery-url指向的那个节点拿jquery`。我们得在第二次请求后才能拿到我们想要的包。而==package-lock.json帮我们存了这个子节点的地址==

***移除***

npm remove xxx  在node_module中删除xxx包，同时删除该包在package.json中的声明

***其他命令***

1. npm aduit fix ：检查项目中依赖的一些问题，并尝试修复
2. npm view xxx versions：查看远程npm仓库xxx包的所有版本
3. npm view xxx version：查看远程npm仓库xxx包的最新版本
4. npm ls xxx：查看我们所安装的xxx包的版本

***关于版本号***

<img src="nodejs.assets/image-20211009213618227.png" alt="image-20211009213618227" style="zoom: 50%;float:left" />

### cnpm使用

安装淘宝镜像

<img src="nodejs.assets/image-20211009215724029.png" alt="image-20211009215724029" style="zoom:100%;" />

### yarn

![image-20211009221356606](nodejs.assets/image-20211009221356606.png)

![image-20211009221441472](nodejs.assets/image-20211009221441472.png)

## 总结

### node的优缺点

<img src="nodejs.assets/image-20211009222937830.png" alt="image-20211009222937830" style="zoom:50%;float:left" />

## Buffer缓冲器

<img src="nodejs.assets/image-20211010103307896.png" alt="image-20211010103307896" style="zoom:50%;float:left" />

### Buffer是什么？

1. 它是一个【类似于数组】的对象，用于存储数据（存储的是二进制数组）
2. Buffer的效率很高，存储和读取很快，它是直接对计算机内存进行操作的
3. Buffer的大小一旦确定了，不可修改
4. <u>每个元素占用内存的大小为1字节</u>
5. Buffer是node中的非常核心的模块，无需下载，无需引入，直接使用即可

***创建一个Buffer实例***

![image-20211010111253757](nodejs.assets/image-20211010111253757.png)

***将数据存入一个Buffer实例***

<img src="nodejs.assets/image-20211010112002300.png" alt="image-20211010112002300" style="zoom: 50%;float:left" />

## node中的文件操作（写入）

### 简单文件写入

![image-20211010115207288](nodejs.assets/image-20211010115207288.png)

options：配置对象（可选参数）

![image-20211010122232165](nodejs.assets/image-20211010122232165.png)

```js
let fs = require('fs');
fs.writeFile('./demo.txt','今天天气真晴朗！', {mode:0o444},(err)=>{
    if (err) {
        console.log("文件写入失败");
    }else{
        console.log("文件写入成功");
    }
});
```



### 流式文件写入

生活中：水流

node中：文件流

<img src="nodejs.assets/image-20211010122558896.png" alt="image-20211010122558896" style="zoom: 35%;float:left" />

<img src="nodejs.assets/image-20211010125924152.png" alt="image-20211010125924152" style="zoom: 67%;float:left" />

```js
// 流式文件写入
let fs = require('fs');
// 创建一个可写流：水管到位了
let ws = fs.createWriteStream(__dirname + '/demo.txt');
// 只要用到了流，就必须监测流的状态(类似于事件监听器)
ws.on("open", () => {
    console.log("可写流打开了");
});
ws.on("close", () => {
    console.log("可写流关闭了");
});

// 使用可写流写入数据
ws.write('第一次写入\n');
ws.write('第二次写入\n');
ws.write('第三次写入\n');
ws.close();
```

***ws.close()和ws.end()***

`ws.close()`如果在node8版本中，使用此方法关闭流会造成数据丢失

`ws.end()`在node8版本中，要用end方法关闭流

## node中的文件操作（读取）

### 简单文件读取

<img src="nodejs.assets/image-20211010134406406.png" alt="image-20211010134406406" style="zoom:67%;float:left" />

```js
// 简单文件读取
let fs = require('fs');
fs.readFile(__dirname + '/demo.txt',(err,data)=>{
    if(err) console.log(err);
    else console.log(data.toString());
});
```

### 流式文件读取

<img src="nodejs.assets/image-20211010153600065.png" alt="image-20211010153600065" style="zoom: 50%;float:left" />

```js
// 流式文件读取
//用到了解构
let {createReadStream} = require('fs');
// 创建一个可读流
let rs = createReadStream(__dirname+ '/demo.txt',{highWaterMark:10*1024*1024});

//只要用到了流，就要监测流的状态
rs.on("open", function(){
    console.log("可读流打开了");
});
rs.on("close", function(){
    console.log("可读流关闭了");
});
rs.on("data", function(data){
    // Buffer实例的length属性：表示该Buffer实例占用内存空间的大小
    console.log(data.length);
});
```

## 流式读写

```js
let {createReadStream} = require('fs');

let rs = createReadStream(__dirname+ '/demo.txt',{highWaterMark:10*1024*1024});
let ws = fs.createWriteStream(__dirname + '/demo.txt');

ws.on("open", () => {
    console.log("可写流打开了");
});
ws.on("close", () => {
    console.log("可写流关闭了");
});
rs.on("open", function(){
    console.log("可读流打开了");
});
rs.on("close", function(){
    console.log("可读流关闭了");
    ws.close();  //!!!!!重要
});

rs.on("data", function(data){
    console.log(data.length);
    ws.write(data);
    //ws.close();若在此处关闭流，会写入一次，后续数据丢失
});
//ws.close();若在此处关闭流，会导致无法写入数据。因为rs.on("data", 里只是个回调。
```

## MongoDB

<img src="nodejs.assets/image-20211010201843238.png" alt="image-20211010201843238" style="zoom:80%;" />

### 简介

#### 数据库（database）

数据库是一个仓库，在仓库中可以存放集合。

#### 集合（collection）

集合类似于JS中的数组，在集合中可以存放文档。

说白了，集合就是一组文档。

#### 文档（document）

文档数据库中的最小单位，我们存储和操作的内容都是文档。

类似于JS中的对象，在MongoDB中每一条数据都是一个文档。

### 基本命令

显示所有的数据库

​	show dbs

​	show databases

切换到指定的数据库

​	use 数据库名

显示当前所在的数据库

​	db

删除当前数据库

​	db.dropDatabase()

显示当前数据库中的所有集合

​	show collections

删除当前集合

​	db.collection.drop()

![image-20211013093645728](nodejs.assets/image-20211013093645728.png)

### 原生的CRUD命令

***create增加***

```
db.集合名.insert(文档对象)
db.集合名.insertOne(文档对象)
db.集合名.insertMany([文档对象,文档对象])
```

```js
//新增
db.students.insert({name:'kwong',age:50,sex:'男',grade:'高三',stu_id:'001'});
db.students.insertOne({name:'Guoodli',age:10,sex:'女',grade:'高三',stu_id:'002'});
db.students.insertMany([
{name:'aaa',age:20,sex:'女',grade:'高二',stu_id:'003'},
{name:'bbb',age:40,sex:'男',grade:'高三',stu_id:'004'},
{name:'ccc',age:30,sex:'女',grade:'高一',stu_id:'005'}
]);
```



***read查询***

```
db.集合名.find(查询条件, [投影])
例：
//查询学生集合中年级为高三的，只投影出学号和年级，不投影出id号
db.students.find({grade:"高三"},{stu_id:1,grade:1,_id:0});
```

```js
//查询命令
db.students.find({});
db.students.find({grade:"高三"},{stu_id:1,grade:1,_id:0});
```



**常用操作符**

<img src="nodejs.assets/image-20211013164131475.png" alt="image-20211013164131475" style="zoom:50%;float:left" />

投影：过滤掉不想要的数据，只保留想要展示的数据

补充：db.集合名.findOne（查询条件，【投影】），默认只找到一个。

findOne效率更高

***查询案例***

```js
//查询命令
db.students.find({});
db.students.find({grade:"高三"},{stu_id:1,grade:1,_id:0});

// < <= > >= !==
//查询年龄<30的
db.students.find({age:{$lt:30}});
//查询年龄<=30的
db.students.find({age:{$lte:30}});
//查询年龄>30的
db.students.find({age:{$gt:30}});
//查询年龄>=30的
db.students.find({age:{$gte:30}});
//查询年龄!==30的
db.students.find({age:{$ne:30}});

//逻辑或 $in, $or
//in
db.students.find({age:{$in:[20,30]}});
//or
db.students.find({$or:[{age:20},{name:"ccc"}]});

//逻辑非 $nin
db.students.find({age:{$nin:[20,30]}});

//正则表达式
db.students.find({name:/^k/});//所有名字开头为k的

//写函数
db.students.find({$where:function(){
	return this.name === "Guoodli" || this.name === "kwong";//this为每一条文档
}});

```

***updata更新***

<img src="nodejs.assets/image-20211013172926444.png" alt="image-20211013172926444" style="zoom:50%;float:left" />

***delete删除***

<img src="nodejs.assets/image-20211013173225969.png" alt="image-20211013173225969" style="zoom:50%;float:left" />

### mongoose

#### 连接数据库

<u>运用第三方的库连接数据库，原生的麻烦</u>

> *mongoDB:一个数据库品牌的名字*
>
> *mongod:启动数据库的命令*
>
> *mongo:连接数据库的命令*
>
> *mongoose:在Node平台下，一个帮助开发者连接MongoDB的包*
>
> 非关系型数据库：对象文档模型：ODM（object document model）
>
> 关系型数据库：对象关系模型：ORM

Mongoose是一个对象文档模型（ODM）库.

***对象文档模型：ODM（object document model）***

​	因为js的对象结构和文档的结构很相似。<u>JS对象 ——》JSON（BSON）格式——》存入数据库</u>

***为什么使用mongoose?***

​	在Node平台下，更加简单方便、安全稳定得操作mongoDB

***连接***

```js
// 引入mongose
let mongoose = require('mongoose');
//1.连接数据库
mongoose.connect("mongodb://localhost:27017/demo",{
    useNewUrlParser:true,//使用一个新的url解析器，用于解决一些安全问题
    useUnifiedTopology:true//统一拓扑结构，写数据的时候按照一定的标准写 ：老的结构标准存在效率问题
});
//2.绑定数据库连接的监听
mongoose.connection.on("open",function(err){
    if(err){
        console.log("数据库连接失败"+err);
    }else{
        console.log("数据库连接成功");
        //3.操作数据库
        console.log("操作数据库");
    }
})
```





#### mongoose中的CRUD

![image-20211017195243058](nodejs.assets/image-20211017195243058.png)

```js
    // 引入mongose
    let mongoose = require('mongoose');
    // mongoose.set('useCreateIndex', true);//使用一个新的索引创建器
    //1.连接数据库
    mongoose.connect("mongodb://localhost:27017/demo",{
        useNewUrlParser:true,//使用一个新的url解析器，用于解决一些安全问题
        useUnifiedTopology:true//统一拓扑结构，写数据的时候按照一定的标准写 ：老的结构标准存在效率问题
    });
    //2.绑定数据库连接的监听
    mongoose.connection.on("open",function(err){
        if(err){
            console.log("数据库连接失败"+err);
        }else{
            console.log("数据库连接成功");
            //3.操作数据库
            //别墅
            //1.找来一个看门的保安——引入模式对象
            let Schema = mongoose.Schema
            //2.制定进入别墅的规则——创建约束对象
            let studentsRule = new Schema({
                stu_id:{
                    type: String,//限制学号必须为：字符串
                    required: true ,//为必填项
                    unique: true //必须唯一
                },
                name:{
                    type:String,
                    required:true
                },
                age:{
                    type:Number,
                    required:true
                },
                sex:{
                    type:String,
                    required: true 
                },
                hobby:[String],//限制只能为数组，数组中的每一项必须为字符串
                info:Schema.Types.Mixed, //接受所有类型
                date:{
                    type:Date,
                    default:Date.now()
                },
                enable_flag:{
                    type:String,
                    default:"Y"
                }
            });
            //3.告诉保安制定的规则——创建模式对象
            let stuModel = mongoose.model('students',studentsRule);//生成集合对应的模式对象
            //4.真正有人要进入别墅——CRUD
            //创建,写入一个对象———>BSON
            //新增操作
            stuModel.create({
                stu_id:"001",
                name:"kwong",
                age:18,
                sex:"男",
                hobby:["skating","painting"],
                info:"never know best" //接受所有类型
            }, function (error,data){
                if(!error){
                    console.log(data);
                }else{
                    console.log(error);
                }
            });
            stuModel.create({
                stu_id:"002",
                name:"Guoodli",
                age:17,
                sex:"女",
                hobby:["shopping","learning"],
                info:"要芒果吗" //接受所有类型
            }, function (error,data){
                if(!error){
                    console.log(data);
                }else{
                    console.log(error);
                }
            });
            stuModel.create({
                stu_id:"003",
                name:"kwongliegaai",
                age:33,
                sex:"男",
                hobby:["skating","xxx"],
                info:"i have no wind" //接受所有类型
            }, function (error,data){
                if(!error){
                    console.log(data);
                }else{
                    console.log(error);
                }
            });
            stuModel.create({
                stu_id:"004",
                name:"kwongthr",
                age:40,
                sex:"男",
                hobby:["yyy","zzz"],
                info:"nothing" //接受所有类型
            }, function (error,data){
                if(!error){
                    console.log(data);
                }else{
                    console.log(error);
                }
            });
            //查询操作
            /* find方法 */
            //1.返回的是一个数组,就算是一条数据也包含一个数组
            //2.若查询结果为空，则返回一个空数组
            stuModel.find({name:"kwong"},function(err,data){
                if(!err) console.log(data);
                else console.log(err);
            });
            /* findOne方法 */
            //1.若有结果，返回的是一个对象
            //2.若没有结果，则返回一个NULL
            stuModel.findOne({name:"kwong"},function(err,data){
                if(!err) console.log(data);
                else console.log(err);
            });

        //更新操作

    }
});
```

<img src="nodejs.assets/image-20211013201627250.png" alt="image-20211013201627250" style="zoom:50%;" />

#### mongoose模块化编码

1. 连接数据库(绑定监听)
2. 创建模型对象
3. 操作数据库(CRUD)

详细将vscode源文件

## Nodejs服务器

### Node原生服务器

#### 设置response

```js
/* 
不借助任何第三方库，搭建一个服务器
 */
// 1.引入Node内置的http模块
let http = require('http');
// 2.创建一个服务员 --创建服务对象
let server = http.createServer(function(request, response) {
    /* 
        该回调函数的调用时机：只要来一个请求到服务器，马上被触发。若同时发了有一百个请求，函数就被调用一百次
        1.request:请求对象，里面包含着客户端给服务器的”东西“。request被赋值为了客服端的请求集合。
        2.response:响应对象，里面包含着服务器要返回给客户端的东西。response拿到了一个空容器，要由服务器的编写人员往里面写东西
    */
   //设置响应头。参数1：key，参数2：value
   response.setHeader('content-type','text/html;charset=utf-8');
   response.end('<h1>OK,kwong,旷力介</h1>');
});

// 3.指定服务器运行的端口号（绑定端口监听）
//常用端口：3000/4000/5000/8000/8080
server.listen(3000,function(err){
    if(!err) {
        console.log("服务器启动成功了");
    }else{
        console.log(err);
    }
});
```

#### 拿到requeset

***第一步***：在浏览器地址栏写`?key=value&key=value.....`参数，传给服务器request接收。

<img src="nodejs.assets/image-20211018170026061.png" alt="image-20211018170026061" style="zoom:50%;" />

打印`request.url`

```js
let server = http.createServer(function(request, response) {
   console.log(request.url);
   response.setHeader('content-type','text/html;charset=utf-8');
   response.end('<h1>OK,kwong,旷力介</h1>');
});
```

得到两个东西：①我们在浏览器中写入的参数②浏览器直接发送了一次请求`http://localhost:3000/favicon.ico`

<img src="nodejs.assets/image-20211018170147602.png" alt="image-20211018170147602" style="zoom:50%;float:left" />



***第二步***：由于我们拿到的`?key=value&key=value.....`的编码形式为`urlencoded`很不方便，我们要引入一个node内置模块`querystring`。该模块可以解析<u>查询字符串</u>为我们熟悉的<u>对象</u>

*1.引入qs对象，该对象上有很多有用的方法，最具代表性的：parse()*

```js
let qs = require('querystring');
```

*2.获取客户端携带过来的urlencoded编码形式的参数*

```js
// 获取客户端携带过来的urlencoded编码形式的参数
let params = request.url.split("?")[1];//name=kwong&age=20
let paramsObj = qs.parse(params);//{ name: 'kwong', age: '20' }//！！！传过来的数字也被当作字符串
console.log(paramsObj);//{ name: 'kwong', age: '20' }
```

### GET请求与POST请求

#### 前言

> HTTP设定了八种发送请求方式（也称为八大“动作”）。这八种方法没有任何本质上的区别。只是让请求，更加有语义化而已。
> 八种方法分别为：OPTIONS、HEAD、GET、POST、PUT、DELETE、TRACE、CONNECT
> 这八种方法最终经过“岁月沉淀”后，最常用的是这两种：GET、POST

#### GET

    1. 含义：从指定的资源（位置）获取数据（一种“索取”的感觉）。
    2. 什么时候使用GET请求较为合适？
        (1)单纯获取数据的时。
        (2)请求非敏感数据时。

#### POST

    1.含义：向指定的资源提交要被处理的数据（一种“交差”的感觉）。
    2.什么时候使用POST请求较为合适？
        (1)传送相对敏感数据时。
        (2)请求的结果有持续性的副作用，例如：传递的数据要写入数据库时。
        备注：使用了POST不代表的绝对的安全。

#### 常见的GET请求：

    1.浏览器地址栏输入网址时（即浏览器请求页面时，且无法手动更改）。
    2.可以请求外部资源的html标签，例如：<img> <a> <link> <script>，且无法手动更改。
    3.发送Ajax时若没有指定发送请求的方式，则使用GET方式，或者明确指出了使用GET请求。
    4.form表单提交时，若没有指明方式，默认使用GET。

#### 常见的POST请求：

    1.发送Ajax时,明确指出了使用POST方式时。
    2.form表单提交时明确指出使用POST方式

#### 二者的区别

![2.GET与POST对比](nodejs.assets/2.GET%E4%B8%8EPOST%E5%AF%B9%E6%AF%94.png)

***书签***

get可以被收藏为书签：get后参数会拼接到地址栏

post不可以被收藏为书签：post后参数==不会==拼接到地址栏



### Express

### HTTP

#### http协议是什么？

* 是什么：超文本传输协议（属于应用层协议）
* 特点：无状态，现在cookie解决了无状态的问题（早期网页开发时，用cookie解决，现在是cookie和session配合使用）
* 作用：规定了服务器和客户端传递信息的规则（统称为报文，分为：请求报文、响应报文。）
* 版本：
    * http 1.0 （老版本） ----------  不支持长连接
    * http 1.1 （主流版本）---------  优点：支持长连接，弊端：同时发送资源的数量过小。
    * http 2.0 （最新版） ----------  同时发送资源的数量稍有提升。
* 报文(请求报文、响应报文)的组成：
    1.报文首行
    2.报文头
    3.空行（仅仅作为一个分割）
    4.报文体

<img src="nodejs.assets/image-20211018213913982.png" alt="image-20211018213913982" style="zoom: 30%;float:left" />

#### GET请求报文

（给服务器看的）-- 通过form表单发送的GET请求

    GET http://localhost:3000/?name=kobe&password=123 HTTP/1.1
    Host: localhost:3000
    Connection: keep-alive
    Pragma: no-cache
    Cache-Control: no-cache
    Upgrade-Insecure-Requests: 1
    DNT: 1
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
    Referer: http://localhost:63347/0719_node/demo.html?_ijt=tphpp47dag8jevtqrnq44blv6p
    Accept-Encoding: gzip, deflate, br
    Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
    Cookie: Webstorm-9af2238=09820128-3adb-43e4-8242-a6f65c9e523a
    空行
    空行
##### 请求报文首行
    GET http://localhost:3000/?name=kobe&password=123 HTTP/1.1
    -请求方式 协议名://主机地址:端口号/？urlencoded编码形式的参数 协议名/版本
##### 请求报文头
    Host: localhost:3000
       --发送请求的目标主机：主机名:端口号
    Connection: keep-alive
       --浏览器告诉服务器，浏览器支持长连接。
    Pragma: no-cache
       -- 不走缓存
    Cache-Control: no-cache
       -- 不走缓存(强缓存)
    Upgrade-Insecure-Requests: 1
       -- 浏览器告诉服务器可以使用 https或http1.1
    DNT: 1
       -- 浏览器告诉服务器：禁止跟踪。最终是否跟踪，还得看服务器是否配合。     
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36
       -- 用户代理：之前该字段用于判断用户的浏览器品牌以及版本，但是现在不好用了。
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
       -- 浏览器能够接收资源的类型及优先级，优先级不写默认是1,1的优先级是最高的。
    Referer: http://localhost:63347/0719_node/demo.html?_ijt=tphpp47dag8jevtqrnq44blv6p
       -- 本次请求是“站”在哪里发出去的。 1.防盗链。 2.广告计费
    Accept-Encoding: gzip, deflate, br
       -- 浏览器告诉服务器，浏览器所能接受的压缩文件类型。
    Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
       -- 浏览器告诉服务器，浏览器所能支持的语言种类，及权重。
    Cookie: Webstorm-9af2238=09820128-3adb-43e4-8242-a6f65c9e523a
       -- Webstorm给你种下的cookie
##### 空行

##### 请求报文体
    GET请求没有报文体

##### 备注

1. form表单的post请求和get请求 参数均以urlencoded形式进行编码
2. get请求将urlencoded编码的参数放入请求地址携带给服务器，所以称之为：查询字符串参数
3. post请求将urlencoded编码的参数放入请求体，所以称之为请求体参数

***查新字符串参数与请求体参数***

<img src="nodejs.assets/image-20211019201329101.png" alt="image-20211019201329101" style="zoom: 33%;float:left" />

#### 响应报文

<img src="nodejs.assets/image-20211019204949689.png" alt="image-20211019204949689" style="zoom:50%;float:left" />

#### HTTP状态码

> 服务器给客户端的东西

插件

<img src="nodejs.assets/image-20211019205411141.png" alt="image-20211019205411141" style="zoom: 50%;float:left" />

状态码详细

<img src="https://files.catbox.moe/pw9k4b.png" style="zoom:50%;float:left" />

重定向（跳转）

* 服务端跳转
* 客户端跳转

<img src="nodejs.assets/image-20211019212933677.png" alt="image-20211019212933677" style="zoom: 33%;float:left" />

---

#### 经典面试题

 问题：从用户输入URl按下回车，一直到用户能看到界面，期间经历了什么？



 **一、DNS解析----域名翻译成 IP地址（优先走缓存）：**

   1.找浏览器DNS缓存解析域名

   2.找本机DNS缓存：(备注：查看本机DNS缓存命令：ipconfig/displaydns > C:/dns.txt)

   3.找路由器DNS缓存

   4.找运营商DNS缓存（80%的DNS查找，到这一步就结束）

   5.递归查询 (查询全球13台根DNS服务器)



 **二、进行TCP（协议）连接，三次握手（根据上一步请求回来的ip地址，去联系服务器）**

   第一次握手：由浏览器发给服务器，我想和你说话，你能“听见”嘛？

   第二次握手：由服务器发给浏览器，我能听得见，你说吧！

   第三次握手：由浏览器发给服务器，好，那我就开始说话。



 **三、发送请求（请求报文）**



 **四、得到响应（响应报文）**



 **五、浏览器开始解析html**

​    --预解析：将所有外部的资源，发请求出去

​    --解析html，生成DOM树

​    --解析CSS，生成CSS树

​    --合并成一个render树

​    --js是否操作了DOM或样式

​      --有：进行重绘重排（不好，1.尽量避免；2.最小化重绘重排）

​      --没有：null

​    --最终展示界面



 **六、断开TCP连接，四次挥手（确保数据的完整性）**

​    第一次挥手：由浏览器发给服务器，我的东西接受完了，你断开吧。

​    第二次挥手：--由服务器发给浏览器，我还有一些东西没接收完，你等一会，我接收好了且验证好了我告诉你

​         --由服务器发给浏览器，我的东西接收完了，但是你还得等一会，我要验证数据的完整性，验证完了我告诉你。

​    第三次挥手：由服务器发给浏览器，我接收完（验证完）了，你断开吧。

​    第四次挥手：由浏览器发给服务器，好的，那我断开了。



 **备注：为什么握手要三次，挥手要四次？**

​    握手之前，还没有进行数据的传输，确保握手就可以了。

​    挥手之前，正在进行数据的传输，为了确保数据的完整性，必须多经历一次验证（继续接收）

---

#### 路由

**request和response的API**

***request***

1. request.query 获取查询字符串参数（query参数），拿到的是一个对象
2. request.params 获取get请求参数路由的参数，拿到的是一个对象
3. request.body 获取post请求体参数，拿到的是一个对象（不可以直接用，要借助一个中间件）
4. request.get(xxxx) 获取请求头中指定key对应的value

*根路由*

```js
app.get("/", function (req, res) {
  res.send("我是根路由");
});	
```

*一级路由*

```js
app.get("/food", function (req, res) {
  res.send("我是/food");
});
```

*参数路由*

```js
app.get("/food/:id",function(req,res){
    let {id} = req.params;//id为34324，则为{ id: '34324' }
    res.send(req.params);
});
```

***response***

* response.send() 给浏览器做出一个响应
* response.end() 给浏览器做出一个响应，不会追加响应头
* response.download() 告诉浏览器下载一个文件，可以传递相对路径
* response.sendFlie() 给浏览器发送一个文件，备注：必须为绝对路径
* response.redirect() 重定向到一个新的地址(url)==浏览器重定向==
* response.set(key, value) 自定义响应头内容
* response.get(key); 获取响应头指定key对应的value（很少使用
* response.status(code); 设置响应状态码

### cookie

***定义***

1. 本质是一个**字符串**，里面包含着浏览器和服务器沟通的信息（交互时产生的信息）
2. 存储形式以：**key-value**的形式存储
3. 浏览器会自动携带该网站的cookie，只要是该网站下的cookie，全部携带

***分类***

* 会话cookie（在浏览器运行的那块**内存上**，关闭浏览器后cookie会消失）
* 持久化cookie（存储在用户的硬盘上，到了过期时间自动销毁

***工作原理***

* 当浏览器第一次请求服务器的时候，服务器可能返回一个或多个cookie给浏览器
* 浏览器判断cookie种类
  * 会话cookie
  * 持久化cookie
* 以后请求该网站的时候，自动携带上该网站的所有cookie(无法进行干预)
* 服务器拿到之前自己发的cookie，分析里面的内容，校验cookie的合法性，根据cookie里保存的内容，进行具体的业务逻辑

***应用***

解决http无状态的问题（<u>一般来说不会单独使用cookie，一般配合后台的session存储使用</u>）

**不同语言、不同后端框架的cookie的具体语法是不一样的，但是cookie原理和工作过程是不变的**

==备注==

cookie不一定只由服务器生成，前端同样可以生成cookie，但意义不大

#### express中的cookie

```js
let express = require("express");
let cookieParser = require("cookie-parser");

let app = express();

app.use(cookieParser());

//demo路由不对cookie进行任何操作
app.get('/demo', function(req, res){
    res.send("hello");
});

//会话cookie
app.get('/demo1', function(req, res){
    // express中给客户端”种“cookie不需要任何的库
    let obj = {hobby:"gaming,painting,cooking",age:20,name:"kwong"}
    res.cookie("info",JSON.stringify(obj));
    res.send("cookie已经种下");
});

//持久化cookie
app.get('/demo2', function(req, res){
    res.cookie("info","infomation",{maxAge: 1000 * 30});
    res.send("cookie已经种下");
});

//读取客户端携带过来的cookie
app.get('/demo3', function(req, res){
    // express中读取客户端携带过来的cookie要借助一个库(中间件)，名为cookie-parser
    console.log(req.cookies);
    res.send("cookie已经种下");
});

//删除一个cookie
app.get('/demo4', function(req, res) {
    res.cookie("info","",{maxAge:0});
    res.clearCookie("info");
});

app.listen("3000",function(err){
    if(!err) console.log("演示服务器启动成功了")
    else console.log(err)
});
```

### session会话存储

***定义***

标准来说，session这个单词指的是会话

1. 前端通过浏览器去查看cookie的时候，会发现有些cookie的过期时间是session，意味着该cookie为会话cookie
2. 后端人员常常把==session会话存储==简称为：session存储，或者更简单的称为：session

***特点***

1. 存在于服务器
2. 存储的是浏览器和服务器之间沟通产生的一些信息
3. 默认session的存储在服务器的内存中，每当一个新客户端发来请求，服务器都会开辟出一块空间，供session会话存储使用

***工作流程***

* 第一次浏览器请求服务器的时候，服务器开辟一块内存空间，供session会话使用
* 返回响应的时候，自动返回一个cookie（有时为了安全会返回多个），cookie里包含着，上一步产生会话存储”容器“的编号（id）
* 之后的请求，浏览器会自动携带这个cookie给服务器
* ==服务器拿到cookie中对应session的id==，去服务器中匹配
* 服务器根据匹配信息，决定下一步逻辑

备注

> 1. 一般来说cookie一定会配合session使用
> 2. 服务器一般会做session的持久化，防止服务器重启，造成session的丢失

### Ajax

#### 原生发送Ajax

1. 实例化一个XMLHttpRequest对象
2. 绑定一个名为onreadstatechange事件监听
3. 调用open方法 ———— 用什么方法发？给谁发？带着什么过去？
4. 调用send方法 ———— 发送什么请求

***监听时 xhr的五种状态***

* 0: xhr诞生的时候就是0状态,代表着xhr是初始化状态

* 1: send方法还没有被调用，请求还没有发出去，此时依然可以调用请求头
* 2: send方法被调用了，即请求已经发出去了，此时已经不可以再修改请求头
* 3: 已经回来一部分数据了，如果是比较小的数据，会在此阶段一次性接收完毕
* 4: 数据完美的回来了

源文件

ajax_get.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button>点我使用原生js发送ajax的get请求</button>
    <script>
        let btn = document.querySelector('button');
        btn.addEventListener('click', ()=>{
            // 1.创建一个XmlHttpRequest实例
            let xhr = new XMLHttpRequest();
            // 2.绑定监听
            xhr.onreadystatechange = function(){
                //xhr本身有五种状态：0,1,2,3,4
                /* 
                    0:xhr诞生的时候就是0状态,代表着xhr是初始化状态
                    1:send方法还没有被调用，请求还没有发出去，此时依然可以调用请求头
                    2:send方法被调用了，即请求已经发出去了，此时已经不可以再修改请求头
                    3:已经回来一部分数据了，如果是比较小的数据，会在此阶段一次性接收完毕
                    4:数据完美的回来了
                 */
                if(xhr.readyState === 4 && xhr.status === 200){
                    // 如果进入此判断，意味着请求成功了，且数据回来了
                    console.log(xhr.response);
                }
                //我们几乎不会在0状态里做任何事情。0状态已经在新建实例的时候完成了，在这里是永远也进不到0状态的判断的
                
                //1:修改请求头
                // if(xhr.readyState === 1){
                //     xhr.setRequestHeader("demo",'123');
                // }
            };
            //3.调用open方法
            xhr.open('get','http://localhost:3000/ajax_get?name="kwong');
            //4.调用send方法
            xhr.send();
        });
    </script>
</body>
</html>
```

ajax_post.js

```html
<body>
    <button>点我使用原生js发送ajax的post请求</button>
    <div></div>
    <script>
        let btn = document.querySelector('button');
        btn.addEventListener('click', ()=>{
            // 1.创建一个XmlHttpRequest实例
            let xhr = new XMLHttpRequest();
            // 2.绑定监听
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && xhr.status === 200){
                    // 如果进入此判断，意味着请求成功了，且数据回来了
                    console.log(xhr.response);
                    let div = document.querySelector('div');
                    div.innerHTML = xhr.response;
                }
            };
            //3.调用open方法
            xhr.open('post','http://localhost:3000/ajax_post');

            //特别注意：此处是设置post请求所特有的请求头，若不设置，服务器无法获取参数
            xhr.setRequestHeader('content-Type','application/x-www-form-urlencoded');

            //4.调用send方法
            xhr.send('name=kwong&age=20');
        });
    </script>
</body>
```

server.js

```js
let express = require('express');

let app = express();
//用于解析post请求体参数——参数的编码类型必须为urlencoded
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public'));

app.get('/ajax_get', function(req, res){
    res.send("你发来的get请求我收到了");
});

app.post('/ajax_post', function(req, res){
    res.send("你发来的post请求我收到了");
});

app.listen("3000", function(err){
    if(!err) console.log("服务器启动成功了");
    else console.log(err);
});
```

<img src="nodejs.assets/image-20211027082011579.png" alt="image-20211027082011579" style="zoom:50%;float:left" />

#### 取消上一次请求

***xhr.abort***

1. 如果来得及，半路取消，请求根本没有到达服务器
2. 如果来不及，拒之门外，请求已经到达了服务器，且服务器已经给出响应
3. 也存在根本不起作用的情况

verifiCode.html

```html
<body>
    <button>点我获取验证码</button>
    <div></div>
    <script>
      function getAutoCode() {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            // 如果进入此判断，意味着请求成功了，且数据回来了
            console.log(xhr.response);
            let div = document.querySelector("div");
            div.innerHTML = xhr.response;
          }
        };
        xhr.open("get", "http://localhost:3000/get_code");
        xhr.send();
        return xhr;
      }

      let lastxhr;
      let btn = document.querySelector("button");

      btn.addEventListener("click", () => {
        if (lastxhr) {
          lastxhr.abort();
          lastxhr = getAutoCode();
        } else {
          lastxhr = getAutoCode();
        }
      });
    </script>
  </body>
```

server.js

```js
let express = require('express');

let app = express();
//用于解析post请求体参数——参数的编码类型必须为urlencoded
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public'));

//返回验证码的路由，路由返回一个 1000~9999的随机数
app.get('/get_code', function(req, res){
    console.log("有人找我要验证码了")
    setTimeout(function() {
        let autoCode = Math.floor(Math.random() * 8999 + 1000);//乘以最大值与最小值的差，加上最小值
        res.send(autoCode.toString());//send不能发送纯数字，会被视为状态码
    },4000)
});
app.listen("3000", function(err){
    if(!err) console.log("服务器启动成功了");
    else console.log(err);
});
```

#### jQuery封装的Ajax请求

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script type="text/javascript" src="./js/jquery-1.12.4.js"></script>
    <button class="btn1">点我使用jquery发送ajax-get请求</button>
    <button class="btn2">点我使用jquery发送ajax-post请求</button>
    <div></div>
    
    <script>
      let btn1 = $('.btn1');
      let btn2 = $('.btn2');
      console.log(btn1,btn2);
      btn1.click(function(){
        //使用jQuery发送一次ajax请求，完整版
        $.ajax("http://localhost:3000/ajax_get",{
          // url:"http://localhost:3000/ajax_get",//也可以将参数一放入配置对象中
          method:"get",
          data:{name:'kwong',age:20},
          success:function(result){
            console.log(result);
          },
          error:function(err){
            console.log(err);
          }
        });

        //简写
        $.get("http://localhost:3000/ajax_get",{name:'kwong',age:20},(data, status, xhr)=>{
          console.log(data);
        });

      });

      btn2.click(function(){
        $.ajax({
          url:"http://localhost:3000/ajax_post",
          method:"post",
          success:function(data){
            console.log(data);
          },
          error:function(err){
            console.log(err);
          }
        });
      });
    </script>
  </body>
</html>
```

### 跨域问题总结

<img src="nodejs.assets/image-20211027202426875.png" alt="image-20211027202426875" style="zoom: 33%;" />

#### 1.为什么会有跨域这个问题？
   > 原因是浏览器为了安全，而采用的同源策略（Same origin policy）

#### 2.什么是同源策略？
    1. 同源策略是由Netscape提出的一个著名的安全策略，现在所有支持JavaScript 的浏览器都会使用这个策略。
    2. Web是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现。
    3. 所谓同源是指：协议，域名（IP），端口必须要完全相同
       即：协议、域名（IP）、端口都相同，才能算是在同一个域里。
备注：规则举例如下(假设已有网站地址为：http://study.cn)
![Alt text](https://s2.ax1x.com/2019/01/26/knAIit.png)

#### 3.没有同源策略的危险场景：
危险场景：
> 有一天你刚睡醒，收到一封邮件，说是你的银行账号有风险，赶紧点进www.yinghang.com改密码。你着急的赶紧点进去，还是熟悉的银行登录界面，你果断输入你的账号密码，登录进去看看钱有没有少了，睡眼朦胧的你没看清楚，平时访问的银行网站是www.yinhang.com，而现在访问的是www.yinghang.com，随后你来了一条短信，钱没了，这个钓鱼网站做了什么呢？大概是如下思路：

```html
<iframe id="baidu" src="https://www.baidu.com"></iframe>

<script type="text/javascript">
  const iframe = window.frames['baidu']
  const inputNode = iframe.document.getElementById('输入敏感信息的input的id')
  console.log(inputNode.value)
</script>
```

黑客服务器拦截:

<img src="nodejs.assets/image-20211027203042047.png" alt="image-20211027203042047" style="zoom:33%;float:left" />

有可能响应的数据被拦截，并替换为其它数据。



***form表单不会有跨域问题***

<img src="nodejs.assets/image-20211027202642772.png" alt="image-20211027202642772" style="zoom:33%;float:left" />

原因：form表单提交后会转跳到和服务器同端口（如：http://localhost:3000）的网页上

#### 4.非同源受到哪些限制？

    1. Cookie不能读取；
    2. DOM无法获得；
    3. Ajax请求不能发送

#### 5.如何在开发中解决跨域问题：

哪些get会受到限制

1. form——不受到同源策略的限制
2. ajax——收到同源策略的限制
3. 浏览器地址栏——不受到同源策略的限制
4. <u>`<img><link><script src>`等引入外部资源的标签——不受到同源策略的限制</u>

***script标签不受到同源策略的影响***

jsonp.html

```html
<body>
    <script>
        function demo(...param){
            console.log(param);
        }
    </script>
    <!-- script标签不受到同源策略的影响 -->
    <script src="http://localhost:3000/test"></script>
</body>
```

server.js

```js
let express = require('express');

let app = express();

app.use(express.static(__dirname + '/public'));

//如果在浏览器输入http://localhost:3000/test，浏览器通过地址栏发送get请求，拿到send的内容当页面内容解析
//如果用script标签,拿到的内容当js代码用
app.get('/test', function(req, res){
    let arr = [1,2,3,4,5,7];
    res.send(`demo(${JSON.stringify(arr)})`);

});

app.listen('3000',function(err){
    if(!err) console.log("演示json跨域的服务器启动了");
    else console.log(err);
});

```

为什么用

```js
`demo(${JSON.stringify(arr)})`
```

```js
let arr = [1,2,3,4,5,7];

res.send(`demo(${arr})`); //浏览器只输出了1,arr默认被展开成了1,2,3,4,5,7，即arr.toString()

/* 期望向demo传入一个参数，但是却传入了多个参数 */
/* 解决方法一： JSON.stringify(arr)*/
res.send(`demo(${JSON.stringify(arr)})`);

/* 解决方法二： 照常发送多个参数，但是demo那边由...parma吸收多个参数为数组 */
    res.send(`demo(${arr})`);
```

**1.JSONP解决发送请求跨域问题：**

> 要明确的是：JSONP不是一种技术，而是程序员“智慧的结晶”（利用了标签请求资源不受同源策略限制的特点）
> JSONP需要前后端人员互相配合。
>
> **关于jsonp解决跨域**
>
> 1. 原理：利用script标签发请求不受同源策略的限制。所以不会产生跨域问题
> 2. 套路：动态构建script节点，利用节点的src属性，发出get请求，从而绕开ajax引擎
> 3. 弊端：
>    1. 只能解决get请求。标签只能发送get请求
>    2. 后端必须配合前端
> 4. 备注：有这样一种感觉：前端定义函数，后端“调用”。后端返回的数据，前端以js格式解析，并运行

前端页面写法：

```html
<body>
    <button id="btn">按钮</button>
    <script type="text/javascript">
        var btn = document.getElementById('btn');
        btn.onclick = function () {
            //1. 创建一个script标签
            var script = document.createElement('script');
            //2. 设置回调函数
            window.getData = function (data) {
                console.log(data);//拿到数据
            }
            //3. 设置script标签src属性，填写跨域请求的地址
            script.src = 'http://localhost:3000/jsonp?callback=getData';
            //4. 将script标签添加到body中生效
            document.body.appendChild(script);
            //5.不影响整体DOM结构，删除script标签
            document.body.removeChild(script);
        }
    </script>
</body>
```
后端写法：

```js
app.get('/jsonp', (req, res) => {
  //解构赋值获取请求参数
  const {callback} = req.query
  //去数据库查找对应数据
  const data = [{name: 'tom', age: 18}, {name: 'jerry', age: 20}];
  res.send(callback + '(' + JSON.stringify(data) + ')');
})
```

**2.后台配置cors解决跨域**

	以Node为例：
	res.set('Access-Control-Allow-Origin', 'http://localhost:63342');

**3.使用代理服务器**

	例如：nginx等