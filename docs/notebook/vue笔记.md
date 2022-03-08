[TOC]

# VUE笔记

## 1. 认识vue

### hellow world案例

1. 想要vue工作，就必须创建一个vue实例，且要传入一个配置对象；
2. root容器里的代码仍然符合html规范，只不过混入了一些特殊的vue语法
3. root容器里的代码被称为“ vue模板 ”
4. 真实开发中只有一个vue实例，并且会配合着组件一起使用
5. {{xxx}}中的xxx要写js表达式，而且xxx可以自动读取到data中的所有属性
6. 一旦data中的数据发生改变，那么模板中用到该数据的地方也会自动更新

**注意**：区分js表达式和 js 代码（语句）

1. 表达式：一个表达式会生成一个值，可以放在任何一个需要值的地方
   * a
   * a + b
   * deme(1)
   * x == y ? ‘ a ’ : ‘ b ’
2. js代码（语句
   * if(){}
   * for(){}

```html
<body>
    <div id = "root">
        <h1>hellow, {{name}}!</h1>
        <h1>你的年龄是, {{age}}</h1>
        <script src = "./vue.js"></script>
    </div>
    <script>
        Vue.config.productionTip = false;
        //创建vue实例
        const vm = new Vue({
            el: "#root",//el用于指定当前vue实例为哪个容器服务，值通常为css选择器字符串
            // el:document.querySelector('#root')
            // el:document.getElementById("root")
            data: {
                name: "kwongliegaai",
                age: 20
            }
        });
    </script>
</body>
```

## vue的模板语法

vue模板语法的两大类

1. 插值语法

   功能：用于解析标签体内容

   写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性

2. 指令语法

   功能：用于解析标签（包括：标签属性、标签体内容、绑定事件……

   举例：v-bind:href = “xxx”  或 简写为`:href = “xxx”`,xxx同样要写js表达式，且可以直接读取到data中的所			有属性

   备注：Vue中有很多指令，且形式都是：v-???，此处只是用v-bind为例子

```js
<div id ="root">
    <h1>插值语法</h1>
<h3>你好，{{name}}</h3>
<hr/>
    <a v-bind:href="url">百度一下，你就知道</a>
</div>
<script>
        new Vue({
        el:"#root",
        data:{
            name:"kwongliegaai",
            url:"http://www.baidu.com"
        }
    })
</script>
```

## 数据绑定

Vue中有两种数据绑定方式：

1. 单向绑定（v-bind）：数据只能从data流向页面
2. 双向绑定（v-model）：数据不仅能从data流向页面，还可以从页面流向data

**注意：**

1. 双向绑定一般都应用在表单内元素上（如input、select等）
2. `v-model: value = “xxx”`可以简写为`v-model`，因为v-model默认收集的就是value值

```html
<body>
    <!-- 普通写法 -->
    <div id = "root">
        单向数据绑定：<input type="text" v-bind:value = "value1"/>
        双向数据绑定：<input type="text" v-model:value = "value2"/>
    </div>
    <!-- 简写 -->
    <div id = "root">
        单向数据绑定：<input type="text" :value = "value1"/>
        双向数据绑定：<input type="text" v-model = "value2"/>
    </div>
    <script>
        Vue.config.productionTip = false;
        new Vue({
            el:"#root",
            data:{
                value1:"kvoon",
                value2:"Guoodli"
            }
        });
    </script>
</body>
```

## el和data的两种写法

***el的两种写法***

1. new的时候写入el

   ```js
   new Vue({
       el:"#root",
       data:{
           name:"kwong"
       }
   });
   ```

   

2. mount挂载

   ```js
   const vm = new Vue({
       data:{
           name:"kwon"
       }
   });
   setTimeout(() => {
       vm.$mount("#root");
   },2000);
   ```

   由于创建实例的时候没有设置el，可以顺着新建的实例对象vm的原型链找到Vue类的方法，用于设置el，这个方法即为$mount（$符开头的为Vue开放给用户的方法

***data的两种写法***

两种写法（对象、函数）如何选择？

​	在使用到组件时必须使用函数式编程，否则会报错

1. 对象写法<strong style="color:yellowgreen">// 此写法在vue3中已经弃用了</strong>

   ```js
   new Vue({
       el:"#root",
       data:{
           name: "kwongliegaai"
       }
   })
   ```

   

2. 函数写法

   ```js
   new Vue({
       el:"#root",
       data:function(){
           return {
               name:"kwongliegaai"
           }
       }
   })
   ```

   函数写法的好处、或者称为不写函数可能存在的问题：**this**

   ```js
   new Vue({
       el:"#root",
       data:function(){
           console.log(this);//此处的this为Vue
           return {
               name:"kwongliegaai"
           }
       }
   })
   ```

   如果使用箭头函数

   > ！**由Vue所管理的函数**一定不要使用箭头函数，一旦写了箭头函数，this会向上寻找，this将不再是Vue

   ```js
   new Vue({
       el:"#root",
       data:() => {
           console.log(this);//此处的this为window
           return {
               name:"kwongliegaai"
           }
       }
   })
   ```

## MVVM模型

1. M：模型（Model）：对应data中的数据
2. V：视图（View）：模板
3. VM：视图模型（ViewModel）：Vue实例对象

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/mvvm%E6%A8%A1%E5%9E%8B" alt="image-20210828105851904" style="zoom:50%;" />



<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/mvvm%E6%A8%A1%E5%9E%8B2" alt="image-20210828105522276" style="zoom:50%;" /> 

观察的结论：

1. data中所有的属性，最后都出现在了vm身上
2. vm身上所有的属性，及Vue原型上所有属性，在Vue模板中都可以直接使用

## 数据代理

### 何为数据代理？

*通过一个对象代理对另一个对象中属性的操作（**读 / 写**）*

```js
let obj = {x:100};
let obj2 = {y:200};
Object.defineProperty(obj2,"x", {
    get(){
        return obj.x;
    },
    set(value){
        obj.x = value;
    }
})
```

### Vue中的数据代理

1. 通过vm对象来代理data对象中属性的操作（读 / 写）
2. 数据代理的好处：更加方便的操作data中的数据
3. 基本原理：
   * 通过Object.defineProperty()把data对象中所有属性添加到vm上
   * 为每一个添加到vm上的属性，都指定一个getter/setter
   * 在getter/setter内部去操作(读 / 写)data中对应的属性

```html
<div id = "root">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
</div>
<script>
    Vue.config.productionTip = false;
    const vm = new Vue({
        el:"#root",
        data:function(){
            return {
                name:"清华大学",
                address:"China/北京"
            }
        }
    });
</script>
```



<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E6%95%B0%E6%8D%AE%E4%BB%A3%E7%90%861" alt="image-20210828164035862" style="zoom: 50%;" />

**验证getter路径**

修改data中的name为北京大学

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E6%95%B0%E6%8D%AE%E4%BB%A3%E7%90%86%E9%AA%8C%E8%AF%81getter%E8%B7%AF%E5%BE%84" alt="image-20210828171351942" style="zoom: 33%;" />

检视到vm中的name的值也北京大学

<img src="./vue%E7%AC%94%E8%AE%B0.assets/image-20210828171515244.png" alt="image-20210828171515244" style="zoom: 50%;" />

**验证setter路径**

存在的问题

​	因为作为vm配置参数的data（option.data）是无法直接在控制台获取到的，因为不存在data变量，而保存在vm中的_data是经过处理的data（数据劫持），无法直接获取到有效值

获取data的方法

​	在外部设置一个变量data，配置时直接将这个data传入配置

​	***vm._data =  option.data = data***

```js
let data = {
    name:"清华大学",
    address:"China/北京"
}
Vue.config.productionTip = false;
const vm = new Vue({
    el:"#root",
    data:function(){
        return data;
    }
});
```

修改vm中的name，并检视data中的name

<img src="./vue%E7%AC%94%E8%AE%B0.assets/image-20210828174041091.png" alt="image-20210828174041091" style="zoom:50%;" />

**数据代理图示**

![image-20210828174730124](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E6%95%B0%E6%8D%AE%E4%BB%A3%E7%90%86%E5%9B%BE%E7%A4%BA)

Vue的工作：

* 将\_data的内容，代理到vm中。（好处：vm.\_data.name => vm.name）

* 一旦获取vm中的name就会通过getter映射到\_data中的name，同时修改vm中的name也会通过setter映射到\_data中的name

*  将\_data中的属性进行一番修饰，使得vm可以自动检测\_data中的数据，并将页面中的值做出响应更新

  <img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E6%95%B0%E6%8D%AE%E4%BB%A3%E7%90%86%E5%9B%BE%E7%A4%BA2" alt="image-20210828181319997" style="zoom:33%;" />

## 事件处理

### 事件的基本使用

1. 使用**v-on**: xxx 或@xxx 绑定事件，其中xxx 是事件名。如：v-on: click
2. 事件的回调需要配置在methods对象中，最终会在vm上
3. methods中配置的函数，不要使用箭头函数！否则this就不是vm了
4. methods中配置的函数，都是被Vue所管理的函数，this指向的是vm 或 组件实例对象
5. @click = “run1” 或 @click = **“run1($event)”** 效果一致，但后者可以传参数

```js
const vm = new Vue({
    el:".root",
    data:function(){
        return {
            name:"kwongliegaai"
        }
    },
    methods:{
        showInfo1:function(){
            //无参数方法
            console.log(event.target.innerHTML);
        },
        showInfo2:function(event, value){
            console.log(event.target.innerHTML+":"+value);
        }
    }
});
```

methods中的东西只是用来调用的，而不是用来改的，所以没有必要做数据劫持和数据代理（会造成浪费），所以方法是不必写在data里的

### 事件修饰符

***注意***

<u>修饰符是可以连续写的</u>

`@click.prevent.stop = “run”`

Vue中的事件修饰符：

1. prevent：阻止默认事件行为
2. stop：阻止冒泡
3. once：事件只触发一次
4. capture：使用事件的描述模式
5. self：只有event.target是当前操作的元素时才触发事件
6. passive：事件的默认行为立即执行，无需等待回调执行完毕

---

***一、prevent阻止默认事件行为***

通常的非vue做法：***e.preventDefault()***

```html
<body>
    <div id="root">
        <h2>hellow, {{name}}</h2>
        <a href="https://www.baidu.com" v-on:click="run">点我提示信息</a>
    </div>
    <script>
        Vue.config.productionTip = false;
        let vm = new Vue({
            el:"#root",
            data:function(){
                return{
                    name:"kvoon"
                }
            },
            methods:{
                run(e){
                    e.preventDefault();//阻止默认事件
                    alert("message");
                }
            }
        });
    </script>
</body>
```

vue做法：直接在事件词的后方加上`.prevent`，即  ***v-on:click.prevent=“run”***

```html
<body>
    <div id="root">
        <h2>hellow, {{name}}</h2>
        <a href="https://www.baidu.com" v-on:click.prevent="run">点我提示信息</a>
    </div>
    <script>
        Vue.config.productionTip = false;
        let vm = new Vue({
            el:"#root",
            data:function(){
                return{
                    name:"kvoon"
                }
            },
            methods:{
                run(){
                    alert("message");
                }
            }
        });
    </script>
</body>
```

****

***二、stop阻止冒泡***

**事件冒泡**

事件最开始时由最具体的元素（DOM中嵌套层次最深的节点）接收，然后逐级向上传播到不具体的节点。

**事件捕获**

事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。<u>事件捕获的用意在于事件到达预定目标前捕获他</u>。

> \*为通配符选择器，可以选择所有元素，并设置其背景颜色和文字样式
>
> 页面情况：<u>一个div中包含了一个button，而这两个元素都绑定了点击事件</u>

> DOM

```html
<style>
    *{
        margin-top: 20px;
    }
    .demo1{
        height: 50px;
        background-color:skyblue;
    }
</style>
<div id="root">
    <div class="demo1" v-on:click="run">
        div1
        <button v-on:click="run">div2</button>
    </div>
</div>
```

> js

```js
Vue.config.productionTip = false;
let vm = new Vue({
    el:"#root",
    methods:{
        run(){
            alert("message");
        }
    }
});
```

**出现的问题：**

​		点击button按钮的时候会触发两次事件（事件被冒泡执行了）

**阻止冒泡**

*1.通常做法: **e.stopPropagation()***

```js
Vue.config.productionTip = false;
let vm = new Vue({
    el:"#root",
    methods:{
        run(e){
            e.stop.stopPropagation();//原生js阻止冒泡
            alert("message");
        }
    }
});
```

2.vue：***v-on:click.stop=“run”***

```html
<div id="root">
    <div class="demo1" v-on:click="run">
        div1
        <button v-on:click.stop="run">div2</button>
    </div>
</div>
```

---

***三、once事件只触发一次***

```html
<div id="root">
    <div class="demo1" v-on:click="run">
        div1
        <button v-on:click.once="run">div2</button>
    </div>
</div>
```

---

***四、capture使用事件的捕获模式***

事件处理一般发生在冒泡阶段而不是捕获阶段，当我们想在捕获阶段就处理事件的时候，就可以使用capture

*1.原生  JS 中的用例*

>  DOM

```html
<style>
  #app {
    background: #34495e;
    width: 300px;
    padding: 30px;
  }
  #app h2 {
    background-color: #f1c40f;
    margin-right: -100px;
  }
</style>

<div id="app">
  <h2>houdunren.com</h2>
</div>
```

> JS

```js
const app = document.querySelector('#app')
const h2 = document.querySelector('h2')
app.addEventListener(
  'click',
  (event) => {
    console.log('app event')
  },
  { capture: true }
)
h2.addEventListener('click', (event) => {
  console.log(`h2 event`)
})
```

*2.vue做法*

```html
<div id="root">
    <div class = "container1" v-on:click.capture="run(1)">
        div1
        <div class = "container2" v-on:click="run(2)">
            div2
        </div>
    </div>
</div>
<script>
    new Vue({
        el:"#root",
        methods:{
            run(num){
                console.log(num);//传入的num表示div的编号
            }
        }
    });
</script>
```

---

***五、self只有event.target是当前操作的元素时才触发事件***

冒泡过程中的event.target

```html
<div id="root">
    <div class = "container1" v-on:click.capture="run">
        div1
        <div class = "container2" v-on:click="run">
            div2
        </div>
    </div>
</div>
<script>
    new Vue({
        el:"#root",
        methods:{
            run(e){
                console.log(e.target);
            }
        }
    });
</script>
```

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6%E5%86%92%E6%B3%A1" alt="image-20210909172315471" style="zoom:50%;" />

当我们点击div2时，会发现冒泡发生的两次事件的event.target都是div2

![image-20210909172411384](./vue%E7%AC%94%E8%AE%B0.assets/image-20210909172411384.png)

<u>而阻止被其他事件触发可以使用self，不再举出代码</u>

---

***六、passive事件的默认行为立即执行***

无需等待事件回调执行完毕

如鼠标滚动事件，当触发事件的时候需要处理庞大的数据时，滚动操作仍在运算之后执行，就很容易出现卡死的情况。

```html
<style>
    .list{
        width: 200px;
        height: 200px;
        background-color:slateblue;
        overflow:auto;
    }
    li{
        width: 200px;
        height: 50px;
    }
</style>
<ul class = "list" id = "root" v-on:scroll="run">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
```



**scroll滚动条滚动事件**

只要滚动条滚动就可以触发

<u>*scroll默认先滚动*</u>

```js
Vue.config.productionTip = false;
new Vue({
    el:"#root",
    methods:{
        run(){
            console.log("object");
        }
    }
});
```



**wheel鼠标滚轮滚动事件**

只用在使用鼠标滚动的时候才能触发。同时即使滚动条已经不能移动，只要滚动滚轮，依然可以触发

<u>*wheel默认先处理回调*</u>

解决办法`passive`

```html
<ul class = "list" id = "root" v-on:wheel.passive="run">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
<script>
    Vue.config.productionTip = false;
    new Vue({
        el:"#root",
        methods:{
            run(){
                //庞大的run任务
                for (let i = 0; i < 10000; i++) {
                    console.log("object");
                }
            }
        }
    });
</script>
```

### 键盘事件

***1. vue中常用的按键别名***

* 回车enter

* 删除delete
* 推出esc
* 空格space
* 换行tab（特殊，必须配合 keydown使用）
* 上下左右：up、down、left、right

***2.vue中没有提供的按键***

​	可以<u>使用按键原始的key值</u>去绑定，但要注意keyab-case(短横线命名)

***3.系统修饰符（用法特殊）***

​	ctrl、alt、shift、win

* 配合keyup使用：按下修饰键的同时，再按下其他键，随后释放资源，事件才会触发
  * 按下ctrl+y键：`@keyup.ctrl.y=“run”`
* 配合keydown使用：正常触发事件

***4.也可以使用 keycode() 指定具体的按键（不推荐）***

***5.vue.config.keycodes.自定义键名 = 键码，可以去定制案件别名***



## 计算属性与监视

### 计算属性

#### 姓名案例

需要将姓和名，合并到全名上

```html
<body>
    <div id="root">
        姓 ：<input type="text" placeholder="张" v-model:value="firstName"><br/>
        名 ：<input type="text" placeholder="三" v-model:value="lastName"><br/>
        全名：<span>????</span>
    </div>
</body>
```

****

##### ***插值语法实现***

```html
<body>
    <div id="root">
        姓 ：<input type="text" placeholder="张" v-model:value="firstName"><br/>
        名 ：<input type="text" placeholder="三" v-model:value="lastName"><br/>
        全名：<span>{{firstName}}{{lastName}}</span>
    </div>
    <script>
        Vue.config.productionTip = false;
        new Vue({ 
            el:"#root",
            data:function(){
                return{
                    firstName:"",
                    lastName:""
            }}
        })
    </script>
</body>
```

****

##### ***methods实现***

fullname的返回值

```js
<body>
    <div id="root">
        姓 ：<input type="text" placeholder="张" v-model:value="firstName"><br/>
        名 ：<input type="text" placeholder="三" v-model:value="lastName"><br/>
        全名：<span>{{fullName()}}</span>
    </div>
    <script>
        Vue.config.productionTip = false;
        new Vue({ 
            el:"#root",
            data:function(){
                return{
                    firstName:"",
                    lastName:""
            }},
            methods:{
                fullName(){
                    return this.firstName + " " + this.lastName;
                }
            }
        })
    </script>
</body>
```

****

##### ***计算属性实现***

1. 定义：要用的属性不存在，要通过已有的属性计算得来
2. 形式：计算属性的形式为一个<u>配置对象</u>
3. 原理：底层借用了<strong style="color:navy">Object.defineProperty</strong>方法提供的getter和setter
4. get函数什么时候执行？
   1. 初次读取的时候会执行一次
   2. 当<u>依赖的数据变化</u>的时候会被再次调用
5. 优势：与methods相比，内部有缓存机制（复用），效率更高
6. 备注：
   1. 计算结果最终会出现在vm上，直接读取调用即可
   2. 如果计算属性要修改，必须通过set修改，而且set要引起计算时依赖的数据发生

```html
<body>
    <div id="root">
        姓 ：<input type="text" placeholder="张" v-model:value="firstName"><br/>
        名 ：<input type="text" placeholder="三" v-model:value="lastName"><br/>
        <!-- vue将computed计算属性设置的缓存 -->
        全名：<span>{{fullName}}</span><br/>
        全名：<span>{{fullName}}</span><br/>
        全名：<span>{{fullName}}</span><br/>
        全名：<span>{{fullName}}</span><br/>
    </div>
    <script>
        Vue.config.productionTip = false;
        let vm = new Vue({ 
            el:"#root",
            data:function(){
                return{
                    firstName:"",
                    lastName:""
            }},
            computed:{
                fullName:{
                    //vue并没有将fullName对象整个放入vm(fullName:{get()})，而是将fullName解析，将fullName的get的返回值放入了vm(fullName:"张三")
                    get(){
                        //vue将get的this调制成了vm
                        return this.firstName + " " + this.lastName;
                    },
                    set(value){
                        //fullName紧盯着firstName和lastName，所以只需要通过this修改这两个属性
                        const name = value.split(" ");
                        this.firstName = name[0];
                        this.lastName = name[1];
                    }
                }
            }
        })
    </script>
</body>
```

***注意***

1. vue将get()中的this调制成了vm

2. vue将computed的属性设置了缓存

```html
全名：<span>{{fullName}}</span><br/>
全名：<span>{{fullName}}</span><br/>
全名：<span>{{fullName}}</span><br/>
全名：<span>{{fullName}}</span><br/>
```

当vue检测到第一行的fullName并计算的时

1. 调用get()
2. 拿到返回值
3. 将返回值作为fullName的值使用
4. **<u>做缓存</u>**
   * 产生的疑问：如果后面的值都使用缓存值，那么<u>fullName改后是否仍会使用旧的缓存值</u>

***get调用的时机***

1. 初次读取fullName时
2. 所依赖的数据（firstName、lastName）发生变化的时候

****

##### ***计算属性简写***

只有考虑读取，而不考虑修改的时候才能使用

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%AE%80%E5%86%991" alt="image-20210919173801153" style="zoom:50%;" />

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%AE%80%E5%86%992" alt="image-20210919173845975" style="zoom:50%;" />



### 监视属性

#### 天气案例

```html
<body>
    <div id="root">
        <h2>今天天气很{{info}}</h2>
        <button v-on:click = "changeWeather">切换天气</button>
    </div>
    <script type="text/javascript">
        Vue.config.productionTip = false;
        new Vue({
            el:"#root",
            data:{
                isHot:true
            },
            computed:{
                info(){
                    return this.isHot ? "hot" : "cool"
                }
            },
            methods:{
                changeWeather(){
                    this.isHot = !this.isHot;
                }
            }
        });
    </script>
</body>
```

*绑定事件的时候：v-on:click = "yyy" yyy中可以写一些简单的语句*

```html
<button v-on:click = "isHot = !isHot">切换天气</button>
```

达到简化天气案例的代码的目的



#### 监视属性用法

1. 当被监视的属性变化时，回调函数自动调用，进行相关操作
2. 监视的属性必须存在，才能进行监视！！（如果监视的属性不存在也不会报错）
3. 监视的两种写法
   1. new Vue时传入watch配置
   2. 通过vm.$watch监视

写法一

```html
<body>
    <div id="root">
        <h2>今天天气很{{info}}</h2>
        <button v-on:click = "isHot = !isHot">切换天气</button>
    </div>
    <script type="text/javascript">
        Vue.config.productionTip = false;
        const vm = new Vue({
            el:"#root",
            data:{
                isHot:true
            },
            computed:{
                info(){
                    return this.isHot ? "hot" : "cool"
                }
            },
            /* 写法一 */
            watch:{
                isHot:{
                    immediate:true, //初始化时，让handler调用一次
                    handler(newValue, oldValue){
                        //场景：对数据进行一些监测和对比
                        //当isHot改变时，handler调用
                        console.log("handler被修改了",newValue,oldValue);
                    }
                }
            }
        });
    </script>
</body>
```

***深度监视***

1. Vue中的watch默认不检测对象内部值的改变（一层）
2. 配置deep：true可以监测对象内部值改变（多层）

备注

1. Vue自身可以检测对象内部值的改变，但Vue提供的watch默认不可以
2. 使用watch时根据数据的具体结构，决定是否采用深度监视

检测`numbers:{a:1, b:2}`中的每一个属性

```html
<body>
    <div id="root">
        <h3>a的值是{{numbers.a}}</h3>
        <button v-on:click="numbers.a++">a++</button>
    </div>
    <script type="text/javascript">
        Vue.config.productionTip = false;
        const vm = new Vue({
            el:"#root",
            data:{
                numbers:{
                    a:1,
                    b:2
                }
            },
            watch:{
                numbers:{
                    deep: true,
                    handler(){
                        console.log("number被修改了");
                    }
                }
            }
        });
    </script>
</body>
```

***监视属性的简写形式***

 当watch配置只有handler的时候可以进行简写
 在创建时简写

```html
watch:{
	isHot(newValue, oldValue){
		console.log("isHot被修改了",newValue, oldValue);
	}
}
```

在创建后的vm上加watch时简写

```js
vm.$watch('isHot', function(newValue, oldValue){
	console.log("handler被修改了",newValue,oldValue);
});
```

### 监听和计算的区别

computed和watch的区别

1. computed能完成的任务，watch都可以完成
2. watch能完成的功能，computed不一定能完成。例如：watch可以进行异步操作

两个重要的小原则

1. 所有被Vue管理的函数，最好写成普通函数。这样this的指向才是 vm 或 组件实例对象
2. 所有不被Vue所管理的函数（定时器的回调函数、Ajax的回调函数、promise的回调函数等），最好写成箭头函数，这样this的指向才是 vm 或 组件实例对象

## 绑定样式

### class样式

***写法***

`v-bind:class=“xxx”`，xxx可以是字符串，对象，数组

```html
<div class="normal" v-bind:class="greenColor">class div</div>
```

1. 字符串写法：适用于类名不确定，要动态获取
2. 对象写法：要绑定多个样式，个数不确定，名字也不确定
3. 数组写法：要绑定多个样式，个数确定，名字也确定，但是不去确定用不用

**具体写法**

---

**样式内容**

```html
<style>
    .normal{
        font-size:29px;
        height: 200px;
        width: 200px;
    }
    .greenColor{
        background-color: green;
    }
</style>
```

***字符串写法***

```html
<div id="root">
    <div class="normal" v-bind:class="color">div</div>
</div>

<script>
    new Vue({
        el:"#root",
        data() {
            color: "greenColor" //直接传入一个具体样式
        }
    });
</script>
```

***对象写法***

```html
<div id="root">
    <div class="normal" v-bind:class="obj">div</div>
</div>

<script>
    new Vue({
        el:"#root",
        data() {
            return {
                obj:{
                    greenColor: true //传入一个配置对象，布尔值决定样式是否开启
                }
            }
        }
    });
</script>
```

***数组写法***

```html
<div id="root">
        <div class="normal" v-bind:class="arr">div</div>
    </div>

    <script>
        new Vue({
            el:"#root",
            data() {
                return {
                    arr:["blue", "yellow", "blue", "yellow", "red", "purple", "orange", "gray"];//传入一堆样式，后期通过vm再进行样式的增加删除操作
                }
            }
        });
    </script>
```

### style样式

***写法一***

`v-bind:style=“{fontSize:xxx}”`，xxx为动态值

```html
<div class="normal" v-bind:style="{fontSize:20px}">style div</div>
```

***写法二***

`v-bind:style=“[a, b]”`，其中a，b为样式配置对象

```html
<div class="normal" v-bind:style="[a, b]">style div</div>
```

## 条件渲染

### v-show

1. 作用:相当于设置了属性style="display: none;"
2. 适用条件:需要频繁的修改显示效果

```html
<h2 v-show="false">1欢迎回来,{{name}}</h2>
```

```html
<h2 v-show="1 === 1">2欢迎回来,{{name}}</h2>
```



### v-if / v-else / v-else-if

1. 作用:相当于清除了结构
2. 适用条件:需要跳过一些重复的判断

```html
<h2 v-if="false">1欢迎回来,{{name}}</h2>
```

<img src="./vue%E7%AC%94%E8%AE%B0.assets/image-20210923221203887.png" alt="image-20210923221203887" style="zoom: 50%;" />

<img src="./vue%E7%AC%94%E8%AE%B0.assets/image-20210923220700362.png" alt="image-20210923220700362" style="zoom:33%;" />

**注意**

<u>if else的使用结构不能被打断</u>

## 列表渲染

### key的作用

面试题：react、vue中的key有什么作用?（key的内部原理）

1. 虚拟DOM中key的作用：
   * key是**虚拟DOM对象的标识**，当状态中的数据发生变化的时候，vue会根据【新数据】，生成【新的虚拟		DOM】
2. 对比规则：
   * 在旧的虚拟DOM中找到了与新虚拟DOM相同的key：
     * 若虚拟DOM中内容没变，直接使用原来的真实DOM
     * 若虚拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM
   * 在旧的虚拟DOM中没有找到与新虚拟DOM相同的key：
     * 创建新的虚拟DOM，随后渲染到页面
3. 用index作为key可能会引发的问题：
   * 若对数据进行：逆序添加、删除等**破坏顺序**的操作：
     * 会产生没有必要的真实DOM更新 ==>界面效果没问题，但是效率低
   * 如果结构中还包含输入类的DOM：
     * 会产生错误DOM更新 ==> 界面有问题
4. 开发中如何选择key？
   * 最好使用每条数据的唯一标识作为key，比如id、手机号、身份证号、学号等唯一值
   * 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，适合用index作为key是没有问题的。

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/dom%E6%B8%B2%E6%9F%93" alt="image-20210924122326844" style="zoom: 67%;" />

![image-20210924122713245](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/dom%E6%B8%B2%E6%9F%932)



### 列表过滤

已知：

`数组.indexOf(“空字符”) `====>`0`

`["a","b","c"].indexOf("a")` ====>`0`

也就是说即便是找空字符，数组中也能找到，而且下标号为0

找空字符串总能找到 + 一个数组如果每次过滤都返回真 == 返回的是原数组

#### watch实现

```html
<body>
    <div id="root">
        <h2>人员列表</h2>
        <input type="text" placeholder="请输入名字" v-model:value="keyword">
        <ul>
            <!-- 生成计算出的最新列表 -->
            <li v-for="(p, index) in filterPersons" :key="p.id">
                {{p.id}}:{{p.name}},{{p.age}}
            </li>
        </ul>
    </div>
    <script>
        Vue.config.productionTip = false;
        new Vue({
            el:"#root",
            data() {
                return {
                    keyword:"",
                    persons:[
                        {id:"001",name:"马冬梅",age:20, sex:"女"},
                        {id:"002",name:"周冬雨",age:13, sex:"女"},
                        {id:"003",name:"周杰伦",age:12, sex:"男"},
                        {id:"004",name:"温兆伦",age:12, sex:"男"}
                    ], 
                    filterPersons:[]
                }
            },
            watch:{
                keyword:{
                    immediate: true, // 必须在没输入值之前检测关键词是否包含""空字符，才能率先将列表所有列先列出来，因为watch只有在数据发生变化的时候才会调用
                    handler(newvalue){
                        this.filterPersons = this.persons.filter((p) => {
                            return p.name.indexOf(newvalue) != -1;
                        })
                    }
                }
            }
        })
    </script>
</body>
```

#### computed实现

```html
<body>
    <div id="root">
        <h2>人员列表</h2>
        <input type="text" placeholder="请输入名字" v-model:value="keyword">
        <ul>
            <!-- 生成计算出的最新列表 -->
            <li v-for="(p, index) in filterPersons" :key="p.id">
                {{p.id}}:{{p.name}},{{p.age}}
            </li>
        </ul>
    </div>
    <script>
        Vue.config.productionTip = false;
        new Vue({
            el:"#root",
            data() {
                return {
                    keyword:"",
                    persons:[
                        {id:"001",name:"马冬梅",age:20, sex:"女"},
                        {id:"002",name:"周冬雨",age:13, sex:"女"},
                        {id:"003",name:"周杰伦",age:12, sex:"男"},
                        {id:"004",name:"温兆伦",age:12, sex:"男"}
                    ]
                }
            },
            computed:{
                //computed不像watch只在新旧数据不一致的时候调用，而是一直在随着依赖数据一直变化
                filterPersons:{
                    get(){
                        //返回过滤的列表
                        return this.persons.filter((p) => {
                            return p.name.indexOf(this.keyword) != -1;
                        })
                    }
                }
            }
        })
    </script>
</body>
```

#### 列表排序

在原有的过滤数组上再处理一次就可以得到排序的列表

```html
<body>
    <div id="root">
        <h2>人员列表</h2>
        <input type="text" placeholder="请输入名字" v-model:value="keyword">
        <button @click="sortType=2">年龄升序</button>
        <button @click="sortType=1">年龄降序</button>
        <button @click="sortType=0">原顺序</button>
        <ul>
            <!-- 生成计算出的最新列表 -->
            <li v-for="(p, index) in filterPersons" :key="p.id">
                {{p.id}}:{{p.name}},{{p.age}}
            </li>
        </ul>
    </div>
    <script>
        Vue.config.productionTip = false;
        new Vue({
            el:"#root",
            data() {
                return {
                    keyword:"",
                    sortType:0,//0原顺序，1降序，2升序
                    persons:[
                        {id:"001",name:"马冬梅",age:20, sex:"女"},
                        {id:"002",name:"周冬雨",age:13, sex:"女"},
                        {id:"003",name:"周杰伦",age:50, sex:"男"},
                        {id:"004",name:"温兆伦",age:12, sex:"男"}
                    ]
                }
            },
            computed:{
                filterPersons:{
                    get(){
                        const arr = this.persons
                        .filter((p) => {
                            return p.name.indexOf(this.keyword) != -1;
                        })
                        if (this.sortType != 0) {
                            //判断是否需要排序，除0以外
                            this.sortType === 1 ? arr.sort((a,b)=>b.age-a.age) : arr.sort((a,b)=>a.age-b.age)
                        }
                        return arr;
                    }
                }
            }
        })
    </script>
</body>
```

### 更新时的问题

<img src="./vue%E7%AC%94%E8%AE%B0.assets/image-20210925210705308.png" alt="image-20210925210705308" style="zoom: 50%;" />

下述代码中的更新二，vue并不承认，检测不到

```html
<body>
    <div id="root">
        <h2>人员列表</h2>
        <button v-on:click="updataMei">更新马冬梅的信息</button>
        <ul>
            <li v-for="(p, index) in persons" :key="p.id">
                {{p.id}}:{{p.name}},{{p.age}}
            </li>
        </ul>
    </div>
    <script>
        Vue.config.productionTip = false;
        new Vue({
            el:"#root",
            data() {
                return {
                    keyword:"",
                    sortType:0,//0原顺序，1降序，2升序
                    persons:[
                        {id:"001",name:"马冬梅",age:20, sex:"女"},
                        {id:"002",name:"周冬雨",age:13, sex:"女"},
                        {id:"003",name:"周杰伦",age:50, sex:"男"},
                        {id:"004",name:"温兆伦",age:12, sex:"男"}
                    ]
                }
            },
            methods: {
                updataMei(){
                    //更新一
                    // this.persons[0].name = "马老师",  //奏效
                    // this.persons[0].age = 69,  //奏效
                    // this.persons[0].sex = "男"  //奏效
                    
                    //更新二
                    this.persons[0] = {id:"001",name:"马老师",age:69, sex:"男"}
                }
            },
        })
    </script>
</body>
```

### Vue监测数据的原理（数组



`vue.\_data.student.hobbys.push`中的push已经不再是`Array.prototype.push`中的push了，vue对push进行了封装

```html
vue._data.student.hobbys.push === Array.prototype.push // fasle
```

![image-20210926112751249](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E6%95%B0%E6%8D%AE%E7%9B%91%E6%B5%8B%E7%9A%84%E5%8E%9F%E7%90%86)

Vue中的push

1. 正常调用Array原型对象中的push

2. 第二步：重新解析模板，生成虚拟DOM等等

Vue对数组的检测：通过包装数组上的常用数组的方法实现的



在vue中，数组中各个索引0,1,2,3是没有getter和setter的，但是对象中的各个key是由getter和setter的



### 总结

1. vue会监视data中所有层次的数据
2. 如何监视对象中的数据？
   1. ==通过setter实现监视，且要new Vue时就要传入要监视的数据==
      1. 对象中后追加的属性，Vue默认不做响应式处理
      2. 如需给后添加的属性做响应式，请使用如下API：
         3. `Vue.set(target, propertyName/index, value)` 或 `vm.$set(target, propertyName/index, value)`
3. 如何检测数组中的数据？
   1. 通过Vue包装过的具有更新元素的数组方法实现，包装过的数组做了两件事：
      1. 调用对应的原生方法对数组进行更新
      2. 重新解析模板，进而更新页面
4. 在Vue中修改数组中的某个元素一定要用如下方法：
   1. 使用这些API：push(), pop(), shift(), unshift(), splice, sort(), reverse()
   2. Vue.set()或vm.$set()

==特别注意==：Vue.set()和vm.$set() 不能给vm或者vm的<u>根数据对象</u>**添加属性**



## 收集表单数据

***输入框***

`<input type="text">`

v-model收集的是value值，同时用户输入的值为value值

***单选框***

`<input type="radio">`

一、如果v-model==要收集==value值，应该要给radio配置value值

==二、如果有一组单选框，应该先设置好单选框组==

设置`name="sex"`，表示这些单选框都属于sex组

```html
男<input type="radio" name="sex" value="male" v-model:value="userInfo.sex">
女<input type="radio" name="sex" value="female" v-model:value="userInfo.sex"><br>
```

***多选框***

`<input type="checkbox">`

1. 没有配置value值，那么收集到的就是checked（勾选 / 未勾选，是布尔值）
2. 配置input的value属性：
   1. v-model的初始值是非数组，那么收集到的就是checked（勾选 / 未勾选，是布尔值）
   2. v-model的初始值是数组，收集到的就是value值组成的数组

***收集表单中可能用到的==修饰符==***

* lazy：失去焦点再更新数据
* number：将输入字符串转为有效数字
* trim：输入首尾空格过滤

**一个完整表单**

```html
<body>
    <div id="root">
        <form @submit.prevent="run"><!-- 组织表单的提交操作，并且触发run方法 -->
            <!-- 使用label标签可以表明服务的对象，此时点击label的时候，input框也可以获取到焦点 -->
            <label for="account">账号：</label>
            <input type="text" id="account" v-model:value.trim="userInfo.account"><br><!-- v-model:value.trim去掉前后的空格 -->
            
            <label for="password">密码：</label>
            <input type="password" id="password" v-model:value.trim="userInfo.password"><br>
            
            <label for="age">年龄：</label>
            <input type="number" id="age" v-model:value.number="userInfo.age"><br>
            <!-- 
                type="number" 阻止在输入的时候输入其他内容  
                v-model.number转换输入的数据为数字 
            -->
            
            性别：
            男<input type="radio" name="sex" value="male" v-model:value="userInfo.sex">
            女<input type="radio" name="sex" value="female" v-model:value="userInfo.sex"><br>
            
            爱好：
            学习<input type="checkbox" value="study" v-model:value="userInfo.hobby">
            打游戏<input type="checkbox" value="game" v-model:value="userInfo.hobby">
            吃饭<input type="checkbox" value="eat" v-model:value="userInfo.hobby"><br>
            
            所属校区:
            <select v-model:value="userInfo.city">
                <option value="">请选择校区</option>
                <option value="shanghai">上海</option>
                <option value="shenzheng">深圳</option>
                <option value="Hongkong">香港</option>
            </select><br><br>
            
            其他信息：
            <textarea v-model:value.lazy="userInfo.other"></textarea><br><!-- v-model:value.lazy等到失去焦点后再同步信息 -->
            
            <input type="checkbox" v-model:value="userInfo.agree">阅读并接受<a href="www.google.com">《用户协议》</a>
            <!-- 上面的同意勾选不需要value值，只要勾选就是checked状态为true，传到agree上就是true -->
            <br><button>提交</button>
        </form>
    </div>
    <script>
        Vue.config.productionTip = false;
        new Vue({
            el:"#root",
            data:function(){
                return {
                    userInfo:{
                        account:'',
                        password:'',
                        age:'',
                        sex:'male',//填上默认值，由于双向绑定，对应的radio就会被勾选上
                        hobby:[],
                        city:"",
                        other:"",
                        agree:""
                    }
                }
            },
            methods: {
                run(){
                    console.log(JSON.stringify(this.userInfo));
                }
            }
        });
    </script>
</body>
```

## 过滤器

![image-20210926204048143](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E8%BF%87%E6%BB%A4%E5%99%A8)

### 局部过滤器

```html
<body>
    <div id="root">
        <h2>显示格式化后的时间</h2>
        <!-- computed实现 -->
        {{myFormatTime}}
        <br/>
        <!-- methods实现 -->
        {{getFormatTime()}}
        <br/>
        <!-- 过滤器实现 -->
        {{time | timeFormater('YYYY年MM月DD日HH时mm分ss秒')}}
    </div>
    <script>
        Vue.config.productionTip = false;
        new Vue({
            el:"#root",
            data:{
                time:1632657414631
            },
            computed:{
                myFormatTime(){
                    return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            methods:{
                getFormatTime(){
                    return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            //局部的过滤器
            filters:{
                timeFormater(value, format='YYYY-MM-DD HH:mm:ss'){
                    //过滤器本质上是一个函数,在DOM里函数不写括号也能传入参数
                    return dayjs(value).format(format)
                }
            }
        })
    </script>
</body>
```

### 全局过滤器

```js
/* 全局过滤器 */
Vue.filter('mydate',function(value){
	return dayjs(value).format(format='YYYY-MM-DD HH:mm:ss')
});
```



## 内置指令

#### ***v-text***

1. 作用：向其中所在的节点中渲染==文本==内容
2. 与插值语法的区别：v-text会替换掉节点中的内容,`{{xxx}}`则不会

#### ***v-html***

cookie

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/cookie%E5%9B%BE%E7%A4%BA" alt="image-20210926212025804" style="zoom: 50%;" />

1. 作用：向指定节点中渲染包含html结构的内容。
2. 与插值语法的区别：
   1. v-html会替换掉节点中的内容,`{{xxx}}`则不会
   2. v-html可以识别html结构
3. 注意：v-html有==安全性问题==
   1. 在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击
   2. 一定要在可信任的内容上使用v-html，永远不要用在用户提交的内容上！



#### ***v-clock***

1. 本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-clock属性
2. 使用CSS配合v-clock可以解决网速慢时页面展示出`((xxx))`的问题

![image-20210927212343337](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/v-clock)



#### ***v-once***

1. v-once所在节点在初次动态渲染后，就视为静态内容了
2. 以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能

```html
<div id="root">
    <h2 v-once>初始化的n值是:{{n}}</h2>
    <h2>当前的n值是:{{n}}</h2>
    <button @click="n++">n++</button>
</div>
<script>
    Vue.config.productionTip = false;
    new Vue({
        el:"#root",
        data() {
            return {
                n:1
            }
        },
    });
</script>
```

<img src="./vue%E7%AC%94%E8%AE%B0.assets/image-20210927213620226.png" alt="image-20210927213620226" style="zoom:50%;" />



#### ***v-pre***

1. 跳过其所在节点的编译过程
2. 可利用它跳过：没有使用指令语法，没有使用插值语法的节点，会加快编译

```html
<div id="root">
    <h2 v-pre>一段静态文字</h2>
    <h2 v-pre>当前的n值是:{{n}}</h2>
    <button v-pre @click="n++">n++</button>
</div>
<script>
    Vue.config.productionTip = false;
    new Vue({
        el:"#root",
        data() {
            return {
                n:1
            }
        },
    });
</script>
```

<img src="./vue%E7%AC%94%E8%AE%B0.assets/image-20210927214441805.png" alt="image-20210927214441805" style="zoom: 50%;" />




## 自定义指令


<img src="./vue%E7%AC%94%E8%AE%B0.assets/image-20210927223831857.png" alt="image-20210927223831857" style="zoom: 67%;"/>

### 局部指令

#### 函数式

写一个v-big指令 

| big函数调用的时机                                            |
| ------------------------------------------------------------ |
| 1. 指令与元素成功==绑定时==（<u>绑定的时候元素可能并没有放入html文档结构里</u>，因为模板里的内容并不能直接放入，而是要经过vue的编译，vue编译完成后将结果放入。此时如果添加焦点`element.focus()`是不成功的，因为只有在元素在文档结构上，才有获取焦点一说 |
| 2. 指令所在模板被重新解析时。                                |

```html
<body>
    <div id="root">
        <h2>当前的值是：<span v-text="n"></span></h2>
        <h2>放大十倍后的n值是:<span v-big="n"></span></h2>
        <button @click="n++">n++</button#>
    </div>
    <script>
        Vue.config.productionTip = false;
        new Vue({
            el:"#root",
            data() {
                return {
                    n:1
                }
            },
            directives:{
                /* 函数式 */
                big(element,binding){
                    console.log("big");
                    element.innerText = binding.value*10;
                }
            }
        });
    </script>
</body>
```

<u>自定义指令中的参数</u>

***element***

指令所在的DOM元素

***binding***

![image-20210927225308244](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/binding)

#### 对象式

函数式其实是简写的对象式

函数式只有在 ①绑定时②模板被重新解析时 会被调用，而对象式将三种情况都配置全了

<u>如果需要在元素置入文档结构里时调用操作，应该考虑使用函数式</u>

```html
<body>
    <div id="root">
        <h2>当前的值是：<span v-text="n"></span></h2>
        <button @click="n++">n++</button>

        <!-- 一个通过指令获取到n值和焦点的输入框 -->
        <input type="text" v-focus-bind:value="n"/>
    </div>
    <script>
        Vue.config.productionTip = false;
        new Vue({
            el:"#root",
            data() {
                return {
                    n:1
                }
            },
            directives:{
                /* 对象式 */
                'focus-bind':{
                    bind(element,binding){
                        //绑定时
                        element.value = binding.value;
                    },
                    inserted(element,binding){
                        //所在元素被插入页面
                        element.focus();
                    },
                    update(element,binding){
                        //所在模板被重新解析时
                        element.value = binding.value;
                    }                    
                }
            }
        });
    </script>
</body>
```

### 全局指令

```js
/* 函数方式不再赘述 */
/* 对象方式 */
Vue.derective = ('focus-bind','focus-bind':{
                    bind(element,binding){
                        //绑定时
                        element.value = binding.value;
                    },
                    inserted(element,binding){
                        //所在元素被插入页面
                        element.focus();
                    },
                    update(element,binding){
                        //所在模板被重新解析时
                        element.value = binding.value;
                    }                    
                });
```


### 注意

1. 指令命名<u>不能采用大小驼峰</u>的命名方式，无论是否采用大小写都一律视作小写。应该用`-`隔开，同时因为有`-`，所以在使用的时候应该用用字符串形式包裹（即采用非简写的形式）
2. 指令定义时不加`v-`，使用时必须带上
3. 指令中的this都是Window。如果需要vm里的内容，可以在绑定指令的时候就传入，不需要使用this。

![image-20210928142805957](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E5%85%A8%E5%B1%80%E6%8C%87%E4%BB%A4)

## 生命周期

### 简要理解生命周期

vue找到模板→开始解析成虚拟DOM→转换成真实DOM→把<u>初始的</u>真实DOM放入页面（挂载mounted）

生命周期：

1. 又名：生命周期回调函数、生命周期函数、生命周期钩子
2. 作用：Vue在关键帮我们调用的一些特殊名称的函数
3. 生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的
4. 生命周期函数中的this指向是vm或==组件实例对象==

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E5%A3%B0%E6%98%8E%E5%91%A8%E6%9C%9F%E5%87%BD%E6%95%B01" alt="image-20210928212641395" style="zoom:50%;" />

生命周期函数



<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%87%BD%E6%95%B02" alt="image-20210928213730729" style="zoom: 50%;" />

关于生命周期函数的理解

### 生命周期流程

***vm的一生（vm的生命周期）***

* 将要创建 → 调用beforeCreate函数
* 创建完毕 → 调用created函数
* 将要挂载 → 调用beforeMount函数
* （重要）挂载完毕 → 调用mounted函数（重要的钩子）
* 将要更新 → 调用beforeUpdate函数
* 更新完毕 → 调用updated函数
* （重要）将要销毁 → 调用beforeDestroy函数（重要的钩子）
* 销毁完毕 → 调用destroyed函数

***常用的生命周期钩子***

1. mounted：发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】
2. beforeDestroy：消除定时器、解绑自定义事件、取消订阅消息等【收尾工作】

***关于销毁Vue实例***

1. 销毁后借助Vue开发者工具看不到任何消息。
2. 销毁后自定义事件会失效，但原生DOM事件依然有效
3. 一般不会在beforeDestroy操作数据，因为即使操作数据，也不会再触发更新流程了。

官方文档图解

![image-20211001163026847](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%AE%98%E6%96%B9%E5%9B%BE+ipad%E7%BC%96%E8%BE%91)

#### 生命周期中用到的知识点

***debugger***

设置一个断点用于调试。debugger 语句用于==停止执行== JavaScript，并调用 (如果可用) 调试函数。

```html
<body>
    <h2 id="demo"></h2>
    <script>
        var x = 15 * 5;
        debugger;
        document.querySelector("#demo").innerHTML = x;
    </script>
</body>
```

上述代码会在debugger时停止执行。此时h2标签里的内容（innerHTML）将不会被修改成x

***template模板***

1. template只能有一个根元素
2. 不能使用template标签`<template>`作为==组件==<u>根元素</u>，因为里边包含多个节点

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/template%E6%A8%A1%E6%9D%BF" alt="image-20211001151238983" style="zoom: 40%; " />

### 生命周期总结：例子

停止文本透明度变化

虽然vm可以使用`$destroy()`销毁，但是setInterval()并不会随之销毁。此时就应该在beforeDestroy中将setInterval()注销清楚掉`cleanInterval()`

```html
 <body>
    <div id="root">
        <h2 v-bind:style={opacity}>kwongliegaai</h2>
        <button v-on:click="stop">停止闪动变化</button>
    </div>
    <script>
        new Vue({
            el:"#root",
            data:{
                opacity:1.0,
                timer:null //使用timer表示定时器
            },
            methods:{
                stop(){
                    //主动调用destroy，总结闪动效果
                    console.log("开始stop：开始进入destroy");
                    this.$destroy();
                }
            },
            mounted(){
                // 挂载完后，利用定时器实现闪动效果
                console.log("mounted");
                this.timer = setInterval(() => {
                    console.log("滴答");
                    this.opacity -= 0.1;
                    if (this.opacity <= 0) {
                        this.opacity = 1; 
                    }
                }, 100);
            },
            beforeDestroy(){
                // 销毁前，先将定时器清除
                //有可能'自杀'也有可能是'他杀'，在此处写无论是何种情况导致destroy都会清楚定时器
                console.log("开始办理后事:清除定时器");
                clearInterval(this.timer);
            }
        })
    </script>
</body>
```

## 2. 理解组件

### 组件编写与传统编写对比

***传统方式编写应用***

![image-20211001171918819](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E4%BC%A0%E7%BB%9F%E6%96%B9%E5%BC%8F%E7%BC%96%E5%86%99%E5%BA%94%E7%94%A8)

***区分好复制和复用的关系***

* 复制：从一个HTML文件复制到另一个HTML文件中
* 复用：我只有一个文件，但是在多个地方使用

***最笨的html复用的办法***

再写一个str = “顶部.html”表示被复用的html文件，通过脚本写innerHTML，写入当前 html文件

***使用组件方式编写应用***

![image-20211001172801093](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E7%BB%84%E4%BB%B6%E5%8C%96%E6%96%B9%E5%BC%8F%E7%BC%96%E5%86%99%E5%BA%94%E7%94%A8)

组件只需要写一次，其他地方只需要通过==引用==就可以拿到组件

### 组件的定义

***定义***

实现应用中**局部**功能**代码**和**资源**的**集合**

* 局部
* 代码：HTML/CSS/JS
* 资源：mp3/mp4/ttf/.zip

![image-20211001173433356](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/vue%E4%B8%AD%E7%9A%84%E7%BB%84%E4%BB%B6%E5%9B%BE%E7%A4%BA)

#### 相关定义梳理(模块、组件)

***模块***

1. 理解：向外提供特定功能的js程序，一般就是一个js文件
2. 为什么：js文件很多很复杂
3. 作用：复用js，简化js的编写，提高js运行效率

***组件***

1. 理解：用来实现局部（特定）功能效果的代码集合（html/css/js/image…）
2. 为什么：一个界面的功能很复杂
3. 作用：复用编码、简化项目编码、提高运行效率

***模块化***

当应用中的js都以模块来编写，那这个应用就是一个模块化应用

***组件话***

当应用中的功能都是多组件的方式来编写的，那这个应用就是一个组件化的应用

### 非单文件组件

***定义***

一个文件中包含有多个组件`a.html`



**Vue*中使用组件的三大步骤***

1. 定义组件（创建组件
2. 注册组件
3. 使用组件（写组件标签



***如何定义一个组件***

使用`Vue.extends({options})`创建，其中options和`new Vue({options})`时传入的哪个options<u>几乎</u>一样。

区别：

1. 不需要`el`。所有的组件都需要经过vm的管理，由vm中的el决定服务于哪个容器。==组件不需要指定，因为要复用==
2. `data`必须写成函数。<u>避免组件被复用时，数据存在==引用关系==</u>



***如何注册组件***

1. 局部注册：new Vue({components:{“组件名”: 组件}})
2. 全局注册：Vue.component(“组件名”, 组件)



***编写组件标签***

* 例：`<school></school>`



---

#### 组件命名

##### 组件名

一个单词组成

1. school
2. School

多个单词组成

1. my-school
2. Myschool

备注

1. 组件名尽可能回避html元素名称。h2、H2都不行

2. 可以使用name配置项指定组件在开发者工具中呈现的名字

   <img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E7%BB%84%E4%BB%B6%E7%9A%84name%E5%B1%9E%E6%80%A7" alt="image-20211002173242261" style="zoom:33%;" />

##### 组件标签

1. `<school></school>`

2. `<school/>`

   不适用脚手架时，`<school/>`会导致后续组件不能渲染

##### 简写创建组件

```js
// 不简写
const school = Vue.extend({
    template:.....,
    data:function(){
    	return{....}
	}
});
//简写
const school = {
    ......
}
```

##### 组件的嵌套

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E7%BB%84%E4%BB%B6%E7%9A%84%E5%B5%8C%E5%A5%97" alt="image-20211002221203704" style="zoom:50%;" />

```html
<body>
    <div id="root">
        <app></app>
    </div>
    <script>
        Vue.config.productionTip = false;
        // student
        const student = Vue.extend({
            template:`
                <div>
                    <h2>姓名:{{name}}</h2>
                    <h2>年龄:{{age}}</h2>
                </div>
            `,
            data:function(){
                return {
                    name:"kvoon",
                    age:"20"
                }
            }
        });
        // school组件
        const school = Vue.extend({
            template:`
                <div>
                    <h2>学校名称:{{name}}</h2>
                    <h2>学校地址:{{address}}</h2>
                    <student></student>
                </div>
            `,
            data:function(){
                return {
                    name:"Tsinghua",
                    address:"beijing"
                }
            },
            components:{
                // 注册student局部组件
                student
            }
        });
        
        const hello = {
            template:`<h2>hello,{{name}}</h2>`,
            data:function(){
                return {name:"kvoon"}
            }
        }

        // 管理者——app
        const app = {
            template:`
                <div>
                    <hello></hello>
                    <school></school>    
                </div>
            `,
            components:{
                hello:hello,
                //注册school(包含student)局部组件
                school:school
            }
        }

        new Vue({
            el:"#root",
            components:{
                app
            }
        });
    </script>
</body>
```

##### Vue.component

<img src="./vue%E7%AC%94%E8%AE%B0.assets/image-20211002230314232.png" alt="image-20211002230314232" style="zoom: 80%;" />

1. school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的
2. 我们只需要写`<school></school>`，Vue解析时会帮我们创建school组件的实例对象，即Vue帮我们执行：`new VueComponent(options)`
3. ==每次调用Vue.extend，返回的都是一个全新的VueComponent==<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/vue.extend" alt="image-20211002224820974" style="zoom:50%;" />
4. 关于this指向：
   1. 组件配置中：data函数、methods中的函数、watch中的函数、computed中的函数，它们的this均是【VueComponent实例对象】
   2. new Vue(options)配置中：data函数、methods中的函数、watch中的函数、computend中的函数，它们的this均为【Vue实例对象】
5. 因为组件是可复用的 Vue 实例，所以它们与 `new Vue` 接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等。==仅有的例外是像 `el` 这样根实例特有的选项==。![image-20211002231805233](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/image-20211002231805233.png)

##### 一个重要的内置关系

1. 一个重要的内置关系:VueComponent.prototype.\_\_proto\_\_ \=\=\= Vue.prototype（例如：school.prototype.\_\_proto\_\_ \=\=\= Vue.prototype
2. 为什么要有这个关系：<u>让组件实例对象（vc）可以访问到Vue原型上的属性、方法。</u>

![image-20211002234456818](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E4%B8%80%E4%B8%AA%E9%87%8D%E8%A6%81%E7%9A%84%E5%86%85%E7%BD%AE%E5%85%B3%E7%B3%BB)

### 单文件组件

***定义***

一个文件中只包含有1个组件`a.vue`

***命名***

1. school.vue
2. School.vue（常用
3. my-school.vue
4. MySchool.vue（常用

在单文件中，school组件：1.组件的结构 2.组件的交互

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6" alt="image-20211003100323902" style="zoom:50%;" />

在vue文件中：1.结构 2.交互 3.样式

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BB%A3%E7%A0%81%E7%BB%93%E6%9E%84" alt="image-20211003101159048" style="zoom:50%;" />

详见vscode中的“单文件组件”文件夹

```vue
<template>
    <!--组件的结构 -->
    <div id="demo">
        <h2>姓名:{{name}}</h2>
        <h2>年龄:{{age}}</h2>
        <button @click="run">点我提示学校名</button>
    </div>
</template>
<script>
    /* 组件交互相关的代码(数据、方法等) */
    export default {
        //直接暴露组件的配置项
        name:"Student",//一般来说和文件名最好保持一致
        data:function(){
            return {
                name:"kwongliegaai",
                age:20
            }
        }
    }
</script>

<style>
    /* 组件的样式 */
    .demo {
        background-color:purple;
    }
</style>
```

## 脚手架

vue-cli（command line interface）命令行接口工具

### 初始化脚手架

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E5%88%9D%E5%A7%8B%E5%8C%96%E8%84%9A%E6%89%8B%E6%9E%B6%E6%95%99%E7%A8%8B" alt="image-20211003115636562" style="zoom:50%;" />

<img src="./vue%E7%AC%94%E8%AE%B0.assets/image-20211003115742397.png" alt="image-20211003115742397" style="zoom:50%;" />

### 分析脚手架结构

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E8%84%9A%E6%89%8B%E6%9E%B6%E7%9A%84%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84" alt="image-20211007190725573" style="zoom: 80%;" />

***gitgnore***

git的忽略文件

***babel.config.js***

babel的控制文件，涉及到es6转es5。配置babel，目的是为了设置babel如何去转换、采用什么样的标准

***package.json***

只要打开的东西是属于npm规范的，都会有包的说明书（package.json）：包的名字，包的版本，采用的依赖、用了那些库、常用的命令

***packaeg-lock.json***

为包版本控制文件。


<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/vue%E9%A1%B9%E7%9B%AE%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84" alt="image-20211007192146037" style="zoom:70%;" />





***main.js***

整个项目的入口文件

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/main.js%E6%96%87%E4%BB%B6" alt="image-20211007192852678" style="zoom: 80%;" />

将其改为

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/202203061526402.png" alt="image-20211007192953750" style="zoom:80%;" />

`ctrl+·`打开终端，在终端运行`npm run server`

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/202203061526291.png" alt="image-20211007193204762" style="zoom:80%;" />

打开地址可以看到输出：kwongliegaai

<img src="./vue%E7%AC%94%E8%AE%B0.assets/image-20211007193402461.png" alt="image-20211007193402461" style="zoom:80%;" />

HMR：热更新





#### 脚手架中的render

* vue.js与vue.runtime.xxx.js的区别：
  1. vue.js是完整的Vue，包含：核心功能+模板解析器
  2. vue.runtime.xxx.js是运行版的vue，只包含：核心功能；没有模板解析器
* 因为vue.runtime.xxx.js没有模板解析器，所以不能用template配置项，需要使用render函数接收到的createElement函数法指定具体内容

**将脚手架中提供的render改为熟悉的形式**

![image-20211007202455539](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E5%B0%86%E8%84%9A%E6%89%8B%E6%9E%B6%E4%B8%AD%E7%9A%84render%E6%94%B9%E4%B8%BA%E7%86%9F%E6%82%89%E7%9A%84%E5%BD%A2%E5%BC%8F)

运行后会发现：你正在使用一个没有模板解析器的运行版本。残缺版本vue

1. 要么使用render配置结构
2. 要么引入一个带有模板解析器的vue（完整版vue

![image-20211007202524411](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/vue%E6%B2%A1%E6%9C%89%E6%A8%A1%E6%9D%BF%E8%A7%A3%E6%9E%90%E5%99%A8%E7%9A%84%E4%BA%A7%E7%94%9F%E6%8A%A5%E9%94%99)

***分析原因***

在node_modules/vue/package.json目录下（vue的项目目录）可以看到，我们引入的vue的版本为“dist/vue.runtime.esm.js”，

其缺少了模板解析器 ，template选项便不再解析

![image-20211007203234557](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/vue%E6%A8%A1%E6%9D%BF%E8%A7%A3%E6%9E%90%E5%A4%B1%E8%B4%A5%E5%8E%9F%E5%9B%A0)

dist目录下的其他vue版本

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/dist%E4%B8%8B%E7%9A%84%E5%85%B6%E5%AE%83vue%E7%89%88%E6%9C%AC" alt="image-20211007203608406" style="zoom:100%;" />

##### 查看render

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/render%E5%87%BD%E6%95%B0" alt="image-20211007204526121" style="zoom:80%;" />

![image-20211007204828475](./vue%E7%AC%94%E8%AE%B0.assets/image-20211007204828475.png)

可以发现a是一个函数

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/render%E5%87%BD%E6%95%B02" alt="image-20211007210318375" style="zoom:80%;" />

**结论**

render是一个函数，vue会调用，在调用的时候会传递一个函数

下面简化一下vue中的render函数

```js
// 1
render(createElement){
    return createElement('h1','hello,world');
}
// 2
render:createElement => createElement('h1','hello,world');
// 3
render:a => a('h1','hello,world');
```

之所以要写`a('h1','hello,world');`中的第二个参数要写，是因为我们要创建的是一个html中已经有的标签，我们要配置这个标签。

我们使用模板的时候可以不用这个参数，因为一切的配置都已弄好。

```js
import App from './App.vue'
render:a => a(App);
```

##### 为什么不提供模板解析器

因为模板解析器将.vue文件转化为.js文件，但是我们在webpack打包的时候已经把文件转化了。那么模板解析器就没有必要占用在其中了（模板解析器占vue的1/3大小

![image-20211007212009653](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E7%94%A8%E6%A8%A1%E6%9D%BF%E8%A7%A3%E6%9E%90%E5%99%A8)

类比生活中的例子

装修：铺瓷砖

1. 买瓷砖（vue核心）+ 买工人（模板解析器） → 铺好的瓷砖 + 工人
2. 买瓷砖（vue核心）+ 雇工人（模板解析器） → 铺好的瓷砖



**标签中的template`<template></template>`**

已经在package.json中配置好了“vue-template-compiler”用于专门解析`.vue`文件中的template。至于main.js中vue的template我们还是无法解析。

![image-20211007230914896](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/202203061528068.png)

#### 查看webpack配置

我们之所以能够解析到main.js为入口，是因为webpack配置，默认的配置是在src目录下找到main.js。那么通过修改webpack配置我们就可以设置其他的xxx.js为入口了

<img src="./vue%E7%AC%94%E8%AE%B0.assets/image-20211007233254096.png" alt="image-20211007233254096" style="zoom:80%;" />

生成的output.js所在目录：

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/output.js%E7%9A%84%E4%BD%8D%E7%BD%AE" alt="image-20211007233356239" style="zoom: 50%; " />

在output.js中搜索main.js关键字:

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/output.js%E4%B8%ADmain.js%E7%9A%84%E4%BD%8D%E7%BD%AE" alt="image-20211007233608599" style="zoom:50%;" />

<u>但是output.js只负责为我们输出一下，在output.js中修改对脚手架是不起作用的</u>

#### 默认配置下不可修改的文件

* 红色：可改
* 绿色：不可改

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/vue%E9%BB%98%E8%AE%A4%E9%85%8D%E7%BD%AE%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%B8%8D%E5%8F%AF%E4%BF%AE%E6%94%B9%E7%9A%84%E6%96%87%E4%BB%B6" alt="image-20211007234454633" style="zoom:50%;" />

#### 修改默认配置

参考vue官方下的配置参考

![image-20211007234701333](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/%E4%BF%AE%E6%94%B9%E9%BB%98%E8%AE%A4%E9%85%8D%E7%BD%AE%E7%9A%84%E5%8F%82%E8%80%83)

找到<u>pages</u>，粘贴进vue.config.js

<img src="./vue%E7%AC%94%E8%AE%B0.assets/image-20211007235422917.png" alt="image-20211007235422917" style="zoom:67%;" />

##### **注意**

pages配置用到了**CommonJS**暴露，因为vue.config.js最终会被vue输送到webpack上，而webpack是**基于node**的

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/202203061530103.png" alt="image-20211008000050429" style="zoom: 67%;" />

脚手架会将vue.config.js拎出来，将其与webpack中已经写好的配置进行一个合并

### ref属性

1. 被用来给元素或<u>子组件</u>注册引用信息（id的替代者
2. 应用在html标签上获取的是真实的DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
   * 打标识：\<h1\ ref = “xxx”>…..\</h1\> 
   * 获取：this.$refs​.xxx

```vue
<template>
    <div>
        <h1 v-text="msg" ref="h1"></h1>
        <button v-on:click="clg">点我输出上方的DOM元素</button>
        <School/>
    </div>
</template>

<script>
import School from "./components/School"
export default {
    name:"App",
    components:{School},
    data(){
        return {
            msg:"welcome kwongliegaai!"
        }
    },
    methods:{
        clg(){
            // console.log(this)  this为vc VueComponents
            console.log(this);
        }
    }
}
</script>
```

可以在vc中看到\$refs属性，并找到被ref标记的DOM元素

![image-20211008010441573](https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/202203061530668.png)

### 与id的区别

<u>**当ref和id绑定到组件上的时候**</u>

```html
<School ref="sch" id="sch"></School>
```

ref输出：组件vc

```js
console.log(this.$refs.sch);
```

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/202203061530650.png" alt="image-20211008011703644" style="zoom: 50%;" />

id输出：组件渲染的内容

```js
console.log(document.getElementById("sch"));
```

<img src="https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/vue/202203061530946.png" alt="image-20211008011802688" style="zoom:50%;" />