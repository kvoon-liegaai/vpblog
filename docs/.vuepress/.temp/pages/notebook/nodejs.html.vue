<template><p>[TOC]</p>
<h1 id="node-js" tabindex="-1"><a class="header-anchor" href="#node-js" aria-hidden="true">#</a> Node.js</h1>
<img src="nodejs.assets/image-20211008225950543.png" alt="image-20211008225950543" style="zoom:50%;" />
<p><img src="nodejs.assets/image-20211008230017658.png" alt="image-20211008230017658"></p>
<h2 id="模块化的历史" tabindex="-1"><a class="header-anchor" href="#模块化的历史" aria-hidden="true">#</a> 模块化的历史</h2>
<p><em><strong>早期</strong></em></p>
<ul>
<li>global被污染，很容易命名冲突</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><em><strong>namespace模式</strong></em></p>
<ul>
<li>减少Global上的变量数目</li>
<li>本质是对象，==一点都不安全==</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token constant">MYAPP</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">foo</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">bar</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token constant">MYAPP</span><span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><em><strong>匿名闭包：IIFE模式</strong></em></p>
<ul>
<li>函数是js唯一的local scope</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> Module <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> _private <span class="token operator">=</span> <span class="token string">"safe now"</span><span class="token punctuation">,</span>
    <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"向外暴露了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">foo</span><span class="token operator">:</span>foo
    <span class="token punctuation">}</span>
    <span class="token comment">/*window.moduel = {
    	foo:foo //放在window里也行
    }*/</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Module<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 向外暴露了</span>
Module<span class="token punctuation">.</span>_private<span class="token punctuation">;</span> <span class="token comment">//undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><em><strong>IIFE增强版本</strong></em></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window<span class="token punctuation">,</span> $</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> msg <span class="token operator">=</span> <span class="token string">"模块信息"</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    window<span class="token punctuation">.</span>module1 <span class="token operator">=</span> foo<span class="token punctuation">;</span>
    <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'body'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">css</span><span class="token punctuation">(</span><span class="token string">"background"</span><span class="token punctuation">,</span><span class="token string">"red"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">,</span> jQuery<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><em><strong>引入依赖</strong></em></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> Module <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">$</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> _$body <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"body"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>_$body<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">foo</span><span class="token operator">:</span>foo
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>jQuery<span class="token punctuation">)</span><span class="token punctuation">;</span>

Module<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="模块化的目的" tabindex="-1"><a class="header-anchor" href="#模块化的目的" aria-hidden="true">#</a> 模块化的目的</h3>
<ol>
<li>降低复杂度</li>
<li>减少耦合</li>
<li>方便部署</li>
</ol>
<h2 id="commonjs" tabindex="-1"><a class="header-anchor" href="#commonjs" aria-hidden="true">#</a> commonJS</h2>
<p><img src="nodejs.assets/image-20211009120959281.png" alt="image-20211009120959281"></p>
<p>暴露模块：module.exports和export.xxx暴露的本质是暴露了exports对象</p>
<p>引入模块：第三方模块：npm下的包</p>
<h3 id="node-js模块化" tabindex="-1"><a class="header-anchor" href="#node-js模块化" aria-hidden="true">#</a> Node.js模块化</h3>
<img src="nodejs.assets/image-20211009121201154.png" alt="image-20211009121201154" style="zoom:50%;" />
<p><img src="nodejs.assets/image-20211009122751847.png" alt="image-20211009122751847"></p>
<p><em><strong>运行app.js</strong></em></p>
<p><img src="nodejs.assets/image-20211009125030713.png" alt="image-20211009125030713"></p>
<h3 id="browserify模块化" tabindex="-1"><a class="header-anchor" href="#browserify模块化" aria-hidden="true">#</a> Browserify模块化</h3>
<p><em><strong>创建文件目录</strong></em></p>
<ul>
<li>
<p>js</p>
<ul>
<li>dist   //打包生成文件所在目录</li>
<li>src    //源码所在文件
<ul>
<li>module1.js</li>
<li>module2.js</li>
<li>module3.js</li>
<li>app.js    //应用主源文件</li>
</ul>
</li>
</ul>
</li>
<li>
<p>index.html</p>
</li>
<li>
<p>package.json</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
    <span class="token string-property property">"name"</span><span class="token operator">:</span> <span class="token string">"commonjs_browserify"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li>
</ul>
<p><em><strong>下载browserify包</strong></em></p>
<ul>
<li>全局安装一次browserify：npm install browserify -g</li>
<li>局部安装一次：npm install browserify --save -dev</li>
</ul>
<h2 id="node服务器对比java服务器" tabindex="-1"><a class="header-anchor" href="#node服务器对比java服务器" aria-hidden="true">#</a> node服务器对比java服务器</h2>
<p>java解决高并发：专人专用</p>
<p>node解决高并发：回调</p>
<p>两种情况：</p>
<ol>
<li>客人点菜快（I/O密集型</li>
<li>客人点餐墨迹（cpu密集型</li>
</ol>
<p><img src="nodejs.assets/image-20211009143148528.png" alt="image-20211009143148528"></p>
<h2 id="node中函数的特点" tabindex="-1"><a class="header-anchor" href="#node中函数的特点" aria-hidden="true">#</a> node中函数的特点</h2>
<ol>
<li>
<img src="nodejs.assets/image-20211009151015634.png" alt="image-20211009151015634" style="zoom: 50%;float:left" />
</li>
</ol>
<p><em><strong>在函数内部找到自己外层的函数</strong></em></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span>b<span class="token punctuation">,</span>c</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arguments<span class="token punctuation">.</span>callee<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//在node中运行</span>
<span class="token punctuation">}</span>
<span class="token function">run</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><img src="nodejs.assets/image-20211009150107251.png" alt="image-20211009150107251"></p>
<p>为什么我们能使用<code>module.exports = </code>和<code>exports.xxx</code>，因为在node中包裹的函数体给我们了</p>
<h2 id="node中的global" tabindex="-1"><a class="header-anchor" href="#node中的global" aria-hidden="true">#</a> node中的global</h2>
<p><img src="nodejs.assets/image-20211009164142864.png" alt="image-20211009164142864"></p>
<img src="nodejs.assets/image-20211009165526775.png" alt="image-20211009165526775" style="zoom: 67%; float: left;" />
<p>node中禁止函数的this找到global，而是指向了一个空对象</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>console.log(this);//{}
console.log(global);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><em><strong>延迟定时器</strong></em></p>
<p>setTimeout</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"后执行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"先执行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><em><strong>立即执行函数（回调</strong></em></p>
<p>setImmediate</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">setImmediate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"后执行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"先执行主线程"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><em><strong>立即执行函数（回调</strong></em></p>
<p>process.nextTick()</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>process<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"后执行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"先执行"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="node中的事件循环模型" tabindex="-1"><a class="header-anchor" href="#node中的事件循环模型" aria-hidden="true">#</a> node中的事件循环模型</h2>
<p><img src="nodejs.assets/image-20211009174652672.png" alt="image-20211009174652672"></p>
<h2 id="包和包管理器" tabindex="-1"><a class="header-anchor" href="#包和包管理器" aria-hidden="true">#</a> 包和包管理器</h2>
<h3 id="package包" tabindex="-1"><a class="header-anchor" href="#package包" aria-hidden="true">#</a> package包</h3>
<p>Node.js的包基本遵循CommonJS规范，包将一组相关的模块组合在一起，形成一组完整的工具。</p>
<p>包由包结构和包描述两个部分组成：</p>
<ol>
<li>包结构：用于组织包中的各种文件</li>
<li>包描述文件：描述包的相关信息，以供外部读取分析</li>
</ol>
<img src="nodejs.assets/image-20211009181323633.png" alt="image-20211009181323633" style="zoom:50%;float:left" />
<img src="nodejs.assets/image-20211009182830310.png" alt="image-20211009182830310" style="zoom:50%;float:left" />
<h3 id="如何让一个普通文件变成一个包" tabindex="-1"><a class="header-anchor" href="#如何让一个普通文件变成一个包" aria-hidden="true">#</a> 如何让一个普通文件变成一个包？</h3>
<ol>
<li>让这个文件夹拥有一个：package.json文件即可，且package.json中的内容要合法。</li>
<li>执行命令：npm init</li>
<li>包名的要求：不能有中文、不能有大写字母、尽量不用数字开头、不能与npm仓库上其他包同名</li>
</ol>
<h3 id="npm使用" tabindex="-1"><a class="header-anchor" href="#npm使用" aria-hidden="true">#</a> npm使用</h3>
<p>通过npm可以对node的包进行搜索、下载、安装、删除、上传</p>
<p><em><strong>搜索</strong></em></p>
<ol>
<li>npm search xxx</li>
<li>通过网址搜索：www.npmjs.com</li>
</ol>
<p><em><strong>安装</strong></em></p>
<p>一、</p>
<ol>
<li>npm install xxxx --save   （--save是早期用法，当时不写--save，package.json中是没有依赖的</li>
<li>npm install xxxx -S  （简化版</li>
<li><strong>npm i xxxx</strong></li>
<li>备注
<ul>
<li>局部安装完的第三方包，放在当前目录中node_modules这个文件夹里</li>
<li>安装完毕会自动生成一个package-lock.json（npm版本在5以后才有），里面缓存的是每个下载过的包的地址，目的是下次安装时速度快一点。</li>
<li>当安装完一个包，该包的名字会自动写入到package.json中【dependencies(生产依赖)里】。npm5及之前版本要加上--save后缀才可以。</li>
</ul>
</li>
</ol>
<p>二、</p>
<ol>
<li>npm install xxx –save -dev</li>
<li><strong>npm i xxx -D</strong> 安装该包并将该包写入到【developendencies(开发依赖中)】</li>
</ol>
<p>三、</p>
<ol>
<li>
<p>npm i xxx -g 全局安装xxx包（一般来说，带有指令集的包要进行全局安装，例如：browserify、babel等）</p>
<p>全局安装的包，其<u>指令</u>到处可用.</p>
<p>查看全局安装的位置：npm root -g</p>
</li>
</ol>
<p>四、</p>
<ul>
<li>npm i xxx@yyy  安装指定版本的包</li>
</ul>
<p>五、</p>
<ul>
<li>npm i   安装package.json中声明的所有包</li>
</ul>
<p><u>什么是开发依赖、生产依赖？</u></p>
<img src="nodejs.assets/image-20211009194729904.png" alt="image-20211009194729904" style="zoom: 50%;float:left" />
<p>要发布项目的时候，就将package.json中的开发依赖删除，然后重新<code>npm i</code></p>
<p><u>package-lock.json干了什么？</u></p>
<img src="nodejs.assets/image-20211009192823277.png" alt="image-20211009192823277" style="zoom: 33%;" />
<p>当我们使用npm i xxx时，我们向美国的npm服务器发送了两次请求</p>
<ol>
<li><code>我需要jquery</code>。而npm主服务器并没有存储任何的包，在得知我们需要这个包时，主服务器就会向其他子节点要这个包，然后将这个有这个包的节点返回给我们</li>
<li><code>我要去jquery-url指向的那个节点拿jquery</code>。我们得在第二次请求后才能拿到我们想要的包。而==package-lock.json帮我们存了这个子节点的地址==</li>
</ol>
<p><em><strong>移除</strong></em></p>
<p>npm remove xxx  在node_module中删除xxx包，同时删除该包在package.json中的声明</p>
<p><em><strong>其他命令</strong></em></p>
<ol>
<li>npm aduit fix ：检查项目中依赖的一些问题，并尝试修复</li>
<li>npm view xxx versions：查看远程npm仓库xxx包的所有版本</li>
<li>npm view xxx version：查看远程npm仓库xxx包的最新版本</li>
<li>npm ls xxx：查看我们所安装的xxx包的版本</li>
</ol>
<p><em><strong>关于版本号</strong></em></p>
<img src="nodejs.assets/image-20211009213618227.png" alt="image-20211009213618227" style="zoom: 50%;float:left" />
<h3 id="cnpm使用" tabindex="-1"><a class="header-anchor" href="#cnpm使用" aria-hidden="true">#</a> cnpm使用</h3>
<p>安装淘宝镜像</p>
<img src="nodejs.assets/image-20211009215724029.png" alt="image-20211009215724029" style="zoom:100%;" />
<h3 id="yarn" tabindex="-1"><a class="header-anchor" href="#yarn" aria-hidden="true">#</a> yarn</h3>
<p><img src="nodejs.assets/image-20211009221356606.png" alt="image-20211009221356606"></p>
<p><img src="nodejs.assets/image-20211009221441472.png" alt="image-20211009221441472"></p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<h3 id="node的优缺点" tabindex="-1"><a class="header-anchor" href="#node的优缺点" aria-hidden="true">#</a> node的优缺点</h3>
<img src="nodejs.assets/image-20211009222937830.png" alt="image-20211009222937830" style="zoom:50%;float:left" />
<h2 id="buffer缓冲器" tabindex="-1"><a class="header-anchor" href="#buffer缓冲器" aria-hidden="true">#</a> Buffer缓冲器</h2>
<img src="nodejs.assets/image-20211010103307896.png" alt="image-20211010103307896" style="zoom:50%;float:left" />
<h3 id="buffer是什么" tabindex="-1"><a class="header-anchor" href="#buffer是什么" aria-hidden="true">#</a> Buffer是什么？</h3>
<ol>
<li>它是一个【类似于数组】的对象，用于存储数据（存储的是二进制数组）</li>
<li>Buffer的效率很高，存储和读取很快，它是直接对计算机内存进行操作的</li>
<li>Buffer的大小一旦确定了，不可修改</li>
<li><u>每个元素占用内存的大小为1字节</u></li>
<li>Buffer是node中的非常核心的模块，无需下载，无需引入，直接使用即可</li>
</ol>
<p><em><strong>创建一个Buffer实例</strong></em></p>
<p><img src="nodejs.assets/image-20211010111253757.png" alt="image-20211010111253757"></p>
<p><em><strong>将数据存入一个Buffer实例</strong></em></p>
<img src="nodejs.assets/image-20211010112002300.png" alt="image-20211010112002300" style="zoom: 50%;float:left" />
<h2 id="node中的文件操作-写入" tabindex="-1"><a class="header-anchor" href="#node中的文件操作-写入" aria-hidden="true">#</a> node中的文件操作（写入）</h2>
<h3 id="简单文件写入" tabindex="-1"><a class="header-anchor" href="#简单文件写入" aria-hidden="true">#</a> 简单文件写入</h3>
<p><img src="nodejs.assets/image-20211010115207288.png" alt="image-20211010115207288"></p>
<p>options：配置对象（可选参数）</p>
<p><img src="nodejs.assets/image-20211010122232165.png" alt="image-20211010122232165"></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fs<span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span><span class="token string">'./demo.txt'</span><span class="token punctuation">,</span><span class="token string">'今天天气真晴朗！'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">mode</span><span class="token operator">:</span><span class="token number">0o444</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"文件写入失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"文件写入成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="流式文件写入" tabindex="-1"><a class="header-anchor" href="#流式文件写入" aria-hidden="true">#</a> 流式文件写入</h3>
<p>生活中：水流</p>
<p>node中：文件流</p>
<img src="nodejs.assets/image-20211010122558896.png" alt="image-20211010122558896" style="zoom: 35%;float:left" />
<img src="nodejs.assets/image-20211010125924152.png" alt="image-20211010125924152" style="zoom: 67%;float:left" />
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 流式文件写入</span>
<span class="token keyword">let</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 创建一个可写流：水管到位了</span>
<span class="token keyword">let</span> ws <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createWriteStream</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/demo.txt'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 只要用到了流，就必须监测流的状态(类似于事件监听器)</span>
ws<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"open"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"可写流打开了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ws<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"close"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"可写流关闭了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 使用可写流写入数据</span>
ws<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">'第一次写入\n'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ws<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">'第二次写入\n'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ws<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">'第三次写入\n'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ws<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><em><strong>ws.close()和ws.end()</strong></em></p>
<p><code>ws.close()</code>如果在node8版本中，使用此方法关闭流会造成数据丢失</p>
<p><code>ws.end()</code>在node8版本中，要用end方法关闭流</p>
<h2 id="node中的文件操作-读取" tabindex="-1"><a class="header-anchor" href="#node中的文件操作-读取" aria-hidden="true">#</a> node中的文件操作（读取）</h2>
<h3 id="简单文件读取" tabindex="-1"><a class="header-anchor" href="#简单文件读取" aria-hidden="true">#</a> 简单文件读取</h3>
<img src="nodejs.assets/image-20211010134406406.png" alt="image-20211010134406406" style="zoom:67%;float:left" />
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 简单文件读取</span>
<span class="token keyword">let</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/demo.txt'</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="流式文件读取" tabindex="-1"><a class="header-anchor" href="#流式文件读取" aria-hidden="true">#</a> 流式文件读取</h3>
<img src="nodejs.assets/image-20211010153600065.png" alt="image-20211010153600065" style="zoom: 50%;float:left" />
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 流式文件读取</span>
<span class="token comment">//用到了解构</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span>createReadStream<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 创建一个可读流</span>
<span class="token keyword">let</span> rs <span class="token operator">=</span> <span class="token function">createReadStream</span><span class="token punctuation">(</span>__dirname<span class="token operator">+</span> <span class="token string">'/demo.txt'</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token literal-property property">highWaterMark</span><span class="token operator">:</span><span class="token number">10</span><span class="token operator">*</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//只要用到了流，就要监测流的状态</span>
rs<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"open"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"可读流打开了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
rs<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"close"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"可读流关闭了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
rs<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"data"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// Buffer实例的length属性：表示该Buffer实例占用内存空间的大小</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="流式读写" tabindex="-1"><a class="header-anchor" href="#流式读写" aria-hidden="true">#</a> 流式读写</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token punctuation">{</span>createReadStream<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> rs <span class="token operator">=</span> <span class="token function">createReadStream</span><span class="token punctuation">(</span>__dirname<span class="token operator">+</span> <span class="token string">'/demo.txt'</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token literal-property property">highWaterMark</span><span class="token operator">:</span><span class="token number">10</span><span class="token operator">*</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> ws <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createWriteStream</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/demo.txt'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

ws<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"open"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"可写流打开了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ws<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"close"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"可写流关闭了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
rs<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"open"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"可读流打开了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
rs<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"close"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"可读流关闭了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ws<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//!!!!!重要</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

rs<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"data"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    ws<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//ws.close();若在此处关闭流，会写入一次，后续数据丢失</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//ws.close();若在此处关闭流，会导致无法写入数据。因为rs.on("data", 里只是个回调。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h2 id="mongodb" tabindex="-1"><a class="header-anchor" href="#mongodb" aria-hidden="true">#</a> MongoDB</h2>
<img src="nodejs.assets/image-20211010201843238.png" alt="image-20211010201843238" style="zoom:80%;" />
<h3 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h3>
<h4 id="数据库-database" tabindex="-1"><a class="header-anchor" href="#数据库-database" aria-hidden="true">#</a> 数据库（database）</h4>
<p>数据库是一个仓库，在仓库中可以存放集合。</p>
<h4 id="集合-collection" tabindex="-1"><a class="header-anchor" href="#集合-collection" aria-hidden="true">#</a> 集合（collection）</h4>
<p>集合类似于JS中的数组，在集合中可以存放文档。</p>
<p>说白了，集合就是一组文档。</p>
<h4 id="文档-document" tabindex="-1"><a class="header-anchor" href="#文档-document" aria-hidden="true">#</a> 文档（document）</h4>
<p>文档数据库中的最小单位，我们存储和操作的内容都是文档。</p>
<p>类似于JS中的对象，在MongoDB中每一条数据都是一个文档。</p>
<h3 id="基本命令" tabindex="-1"><a class="header-anchor" href="#基本命令" aria-hidden="true">#</a> 基本命令</h3>
<p>显示所有的数据库</p>
<p>​	show dbs</p>
<p>​	show databases</p>
<p>切换到指定的数据库</p>
<p>​	use 数据库名</p>
<p>显示当前所在的数据库</p>
<p>​	db</p>
<p>删除当前数据库</p>
<p>​	db.dropDatabase()</p>
<p>显示当前数据库中的所有集合</p>
<p>​	show collections</p>
<p>删除当前集合</p>
<p>​	db.collection.drop()</p>
<p><img src="nodejs.assets/image-20211013093645728.png" alt="image-20211013093645728"></p>
<h3 id="原生的crud命令" tabindex="-1"><a class="header-anchor" href="#原生的crud命令" aria-hidden="true">#</a> 原生的CRUD命令</h3>
<p><em><strong>create增加</strong></em></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>db.集合名.insert(文档对象)
db.集合名.insertOne(文档对象)
db.集合名.insertMany([文档对象,文档对象])
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//新增</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'kwong'</span><span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">50</span><span class="token punctuation">,</span><span class="token literal-property property">sex</span><span class="token operator">:</span><span class="token string">'男'</span><span class="token punctuation">,</span><span class="token literal-property property">grade</span><span class="token operator">:</span><span class="token string">'高三'</span><span class="token punctuation">,</span><span class="token literal-property property">stu_id</span><span class="token operator">:</span><span class="token string">'001'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">insertOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'Guoodli'</span><span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token literal-property property">sex</span><span class="token operator">:</span><span class="token string">'女'</span><span class="token punctuation">,</span><span class="token literal-property property">grade</span><span class="token operator">:</span><span class="token string">'高三'</span><span class="token punctuation">,</span><span class="token literal-property property">stu_id</span><span class="token operator">:</span><span class="token string">'002'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">insertMany</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
<span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'aaa'</span><span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token literal-property property">sex</span><span class="token operator">:</span><span class="token string">'女'</span><span class="token punctuation">,</span><span class="token literal-property property">grade</span><span class="token operator">:</span><span class="token string">'高二'</span><span class="token punctuation">,</span><span class="token literal-property property">stu_id</span><span class="token operator">:</span><span class="token string">'003'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'bbb'</span><span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">40</span><span class="token punctuation">,</span><span class="token literal-property property">sex</span><span class="token operator">:</span><span class="token string">'男'</span><span class="token punctuation">,</span><span class="token literal-property property">grade</span><span class="token operator">:</span><span class="token string">'高三'</span><span class="token punctuation">,</span><span class="token literal-property property">stu_id</span><span class="token operator">:</span><span class="token string">'004'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'ccc'</span><span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">30</span><span class="token punctuation">,</span><span class="token literal-property property">sex</span><span class="token operator">:</span><span class="token string">'女'</span><span class="token punctuation">,</span><span class="token literal-property property">grade</span><span class="token operator">:</span><span class="token string">'高一'</span><span class="token punctuation">,</span><span class="token literal-property property">stu_id</span><span class="token operator">:</span><span class="token string">'005'</span><span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><em><strong>read查询</strong></em></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>db.集合名.find(查询条件, [投影])
例：
//查询学生集合中年级为高三的，只投影出学号和年级，不投影出id号
db.students.find({grade:"高三"},{stu_id:1,grade:1,_id:0});
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//查询命令</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">grade</span><span class="token operator">:</span><span class="token string">"高三"</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token literal-property property">stu_id</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token literal-property property">grade</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token literal-property property">_id</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>常用操作符</strong></p>
<img src="nodejs.assets/image-20211013164131475.png" alt="image-20211013164131475" style="zoom:50%;float:left" />
<p>投影：过滤掉不想要的数据，只保留想要展示的数据</p>
<p>补充：db.集合名.findOne（查询条件，【投影】），默认只找到一个。</p>
<p>findOne效率更高</p>
<p><em><strong>查询案例</strong></em></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//查询命令</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">grade</span><span class="token operator">:</span><span class="token string">"高三"</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token literal-property property">stu_id</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token literal-property property">grade</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token literal-property property">_id</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// &lt; &lt;= > >= !==</span>
<span class="token comment">//查询年龄&lt;30的</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token literal-property property">$lt</span><span class="token operator">:</span><span class="token number">30</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//查询年龄&lt;=30的</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token literal-property property">$lte</span><span class="token operator">:</span><span class="token number">30</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//查询年龄>30的</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token literal-property property">$gt</span><span class="token operator">:</span><span class="token number">30</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//查询年龄>=30的</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token literal-property property">$gte</span><span class="token operator">:</span><span class="token number">30</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//查询年龄!==30的</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token literal-property property">$ne</span><span class="token operator">:</span><span class="token number">30</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//逻辑或 $in, $or</span>
<span class="token comment">//in</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token punctuation">{</span>$<span class="token keyword">in</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//or</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">$or</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"ccc"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//逻辑非 $nin</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token literal-property property">$nin</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//正则表达式</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^k</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//所有名字开头为k的</span>

<span class="token comment">//写函数</span>
db<span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token function-variable function">$where</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">===</span> <span class="token string">"Guoodli"</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">===</span> <span class="token string">"kwong"</span><span class="token punctuation">;</span><span class="token comment">//this为每一条文档</span>
<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p><em><strong>updata更新</strong></em></p>
<img src="nodejs.assets/image-20211013172926444.png" alt="image-20211013172926444" style="zoom:50%;float:left" />
<p><em><strong>delete删除</strong></em></p>
<img src="nodejs.assets/image-20211013173225969.png" alt="image-20211013173225969" style="zoom:50%;float:left" />
<h3 id="mongoose" tabindex="-1"><a class="header-anchor" href="#mongoose" aria-hidden="true">#</a> mongoose</h3>
<h4 id="连接数据库" tabindex="-1"><a class="header-anchor" href="#连接数据库" aria-hidden="true">#</a> 连接数据库</h4>
<p><u>运用第三方的库连接数据库，原生的麻烦</u></p>
<blockquote>
<p><em>mongoDB:一个数据库品牌的名字</em></p>
<p><em>mongod:启动数据库的命令</em></p>
<p><em>mongo:连接数据库的命令</em></p>
<p><em>mongoose:在Node平台下，一个帮助开发者连接MongoDB的包</em></p>
<p>非关系型数据库：对象文档模型：ODM（object document model）</p>
<p>关系型数据库：对象关系模型：ORM</p>
</blockquote>
<p>Mongoose是一个对象文档模型（ODM）库.</p>
<p><em><strong>对象文档模型：ODM（object document model）</strong></em></p>
<p>​	因为js的对象结构和文档的结构很相似。<u>JS对象 ——》JSON（BSON）格式——》存入数据库</u></p>
<p><em><strong>为什么使用mongoose?</strong></em></p>
<p>​	在Node平台下，更加简单方便、安全稳定得操作mongoDB</p>
<p><em><strong>连接</strong></em></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 引入mongose</span>
<span class="token keyword">let</span> mongoose <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mongoose'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//1.连接数据库</span>
mongoose<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token string">"mongodb://localhost:27017/demo"</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token literal-property property">useNewUrlParser</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//使用一个新的url解析器，用于解决一些安全问题</span>
    <span class="token literal-property property">useUnifiedTopology</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token comment">//统一拓扑结构，写数据的时候按照一定的标准写 ：老的结构标准存在效率问题</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//2.绑定数据库连接的监听</span>
mongoose<span class="token punctuation">.</span>connection<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"open"</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"数据库连接失败"</span><span class="token operator">+</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"数据库连接成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//3.操作数据库</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"操作数据库"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h4 id="mongoose中的crud" tabindex="-1"><a class="header-anchor" href="#mongoose中的crud" aria-hidden="true">#</a> mongoose中的CRUD</h4>
<p><img src="nodejs.assets/image-20211017195243058.png" alt="image-20211017195243058"></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>    <span class="token comment">// 引入mongose</span>
    <span class="token keyword">let</span> mongoose <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mongoose'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// mongoose.set('useCreateIndex', true);//使用一个新的索引创建器</span>
    <span class="token comment">//1.连接数据库</span>
    mongoose<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token string">"mongodb://localhost:27017/demo"</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
        <span class="token literal-property property">useNewUrlParser</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//使用一个新的url解析器，用于解决一些安全问题</span>
        <span class="token literal-property property">useUnifiedTopology</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token comment">//统一拓扑结构，写数据的时候按照一定的标准写 ：老的结构标准存在效率问题</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//2.绑定数据库连接的监听</span>
    mongoose<span class="token punctuation">.</span>connection<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"open"</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"数据库连接失败"</span><span class="token operator">+</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"数据库连接成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//3.操作数据库</span>
            <span class="token comment">//别墅</span>
            <span class="token comment">//1.找来一个看门的保安——引入模式对象</span>
            <span class="token keyword">let</span> Schema <span class="token operator">=</span> mongoose<span class="token punctuation">.</span>Schema
            <span class="token comment">//2.制定进入别墅的规则——创建约束对象</span>
            <span class="token keyword">let</span> studentsRule <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Schema</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">stu_id</span><span class="token operator">:</span><span class="token punctuation">{</span>
                    <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span><span class="token comment">//限制学号必须为：字符串</span>
                    <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">,</span><span class="token comment">//为必填项</span>
                    <span class="token literal-property property">unique</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">//必须唯一</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token punctuation">{</span>
                    <span class="token literal-property property">type</span><span class="token operator">:</span>String<span class="token punctuation">,</span>
                    <span class="token literal-property property">required</span><span class="token operator">:</span><span class="token boolean">true</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token punctuation">{</span>
                    <span class="token literal-property property">type</span><span class="token operator">:</span>Number<span class="token punctuation">,</span>
                    <span class="token literal-property property">required</span><span class="token operator">:</span><span class="token boolean">true</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token literal-property property">sex</span><span class="token operator">:</span><span class="token punctuation">{</span>
                    <span class="token literal-property property">type</span><span class="token operator">:</span>String<span class="token punctuation">,</span>
                    <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span> 
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token literal-property property">hobby</span><span class="token operator">:</span><span class="token punctuation">[</span>String<span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token comment">//限制只能为数组，数组中的每一项必须为字符串</span>
                <span class="token literal-property property">info</span><span class="token operator">:</span>Schema<span class="token punctuation">.</span>Types<span class="token punctuation">.</span>Mixed<span class="token punctuation">,</span> <span class="token comment">//接受所有类型</span>
                <span class="token literal-property property">date</span><span class="token operator">:</span><span class="token punctuation">{</span>
                    <span class="token literal-property property">type</span><span class="token operator">:</span>Date<span class="token punctuation">,</span>
                    <span class="token keyword">default</span><span class="token operator">:</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token literal-property property">enable_flag</span><span class="token operator">:</span><span class="token punctuation">{</span>
                    <span class="token literal-property property">type</span><span class="token operator">:</span>String<span class="token punctuation">,</span>
                    <span class="token keyword">default</span><span class="token operator">:</span><span class="token string">"Y"</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//3.告诉保安制定的规则——创建模式对象</span>
            <span class="token keyword">let</span> stuModel <span class="token operator">=</span> mongoose<span class="token punctuation">.</span><span class="token function">model</span><span class="token punctuation">(</span><span class="token string">'students'</span><span class="token punctuation">,</span>studentsRule<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//生成集合对应的模式对象</span>
            <span class="token comment">//4.真正有人要进入别墅——CRUD</span>
            <span class="token comment">//创建,写入一个对象———>BSON</span>
            <span class="token comment">//新增操作</span>
            stuModel<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">stu_id</span><span class="token operator">:</span><span class="token string">"001"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"kwong"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">18</span><span class="token punctuation">,</span>
                <span class="token literal-property property">sex</span><span class="token operator">:</span><span class="token string">"男"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">hobby</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">"skating"</span><span class="token punctuation">,</span><span class="token string">"painting"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token literal-property property">info</span><span class="token operator">:</span><span class="token string">"never know best"</span> <span class="token comment">//接受所有类型</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>error<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            stuModel<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">stu_id</span><span class="token operator">:</span><span class="token string">"002"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"Guoodli"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">17</span><span class="token punctuation">,</span>
                <span class="token literal-property property">sex</span><span class="token operator">:</span><span class="token string">"女"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">hobby</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">"shopping"</span><span class="token punctuation">,</span><span class="token string">"learning"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token literal-property property">info</span><span class="token operator">:</span><span class="token string">"要芒果吗"</span> <span class="token comment">//接受所有类型</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>error<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            stuModel<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">stu_id</span><span class="token operator">:</span><span class="token string">"003"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"kwongliegaai"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">33</span><span class="token punctuation">,</span>
                <span class="token literal-property property">sex</span><span class="token operator">:</span><span class="token string">"男"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">hobby</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">"skating"</span><span class="token punctuation">,</span><span class="token string">"xxx"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token literal-property property">info</span><span class="token operator">:</span><span class="token string">"i have no wind"</span> <span class="token comment">//接受所有类型</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>error<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            stuModel<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">stu_id</span><span class="token operator">:</span><span class="token string">"004"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"kwongthr"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">40</span><span class="token punctuation">,</span>
                <span class="token literal-property property">sex</span><span class="token operator">:</span><span class="token string">"男"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">hobby</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">"yyy"</span><span class="token punctuation">,</span><span class="token string">"zzz"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token literal-property property">info</span><span class="token operator">:</span><span class="token string">"nothing"</span> <span class="token comment">//接受所有类型</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>error<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//查询操作</span>
            <span class="token comment">/* find方法 */</span>
            <span class="token comment">//1.返回的是一个数组,就算是一条数据也包含一个数组</span>
            <span class="token comment">//2.若查询结果为空，则返回一个空数组</span>
            stuModel<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"kwong"</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">/* findOne方法 */</span>
            <span class="token comment">//1.若有结果，返回的是一个对象</span>
            <span class="token comment">//2.若没有结果，则返回一个NULL</span>
            stuModel<span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"kwong"</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//更新操作</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br></div></div><img src="nodejs.assets/image-20211013201627250.png" alt="image-20211013201627250" style="zoom:50%;" />
<h4 id="mongoose模块化编码" tabindex="-1"><a class="header-anchor" href="#mongoose模块化编码" aria-hidden="true">#</a> mongoose模块化编码</h4>
<ol>
<li>连接数据库(绑定监听)</li>
<li>创建模型对象</li>
<li>操作数据库(CRUD)</li>
</ol>
<p>详细将vscode源文件</p>
<h2 id="nodejs服务器" tabindex="-1"><a class="header-anchor" href="#nodejs服务器" aria-hidden="true">#</a> Nodejs服务器</h2>
<h3 id="node原生服务器" tabindex="-1"><a class="header-anchor" href="#node原生服务器" aria-hidden="true">#</a> Node原生服务器</h3>
<h4 id="设置response" tabindex="-1"><a class="header-anchor" href="#设置response" aria-hidden="true">#</a> 设置response</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/* 
不借助任何第三方库，搭建一个服务器
 */</span>
<span class="token comment">// 1.引入Node内置的http模块</span>
<span class="token keyword">let</span> http <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'http'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 2.创建一个服务员 --创建服务对象</span>
<span class="token keyword">let</span> server <span class="token operator">=</span> http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">request<span class="token punctuation">,</span> response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/* 
        该回调函数的调用时机：只要来一个请求到服务器，马上被触发。若同时发了有一百个请求，函数就被调用一百次
        1.request:请求对象，里面包含着客户端给服务器的”东西“。request被赋值为了客服端的请求集合。
        2.response:响应对象，里面包含着服务器要返回给客户端的东西。response拿到了一个空容器，要由服务器的编写人员往里面写东西
    */</span>
   <span class="token comment">//设置响应头。参数1：key，参数2：value</span>
   response<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">'content-type'</span><span class="token punctuation">,</span><span class="token string">'text/html;charset=utf-8'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   response<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">'&lt;h1>OK,kwong,旷力介&lt;/h1>'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 3.指定服务器运行的端口号（绑定端口监听）</span>
<span class="token comment">//常用端口：3000/4000/5000/8000/8080</span>
server<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"服务器启动成功了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h4 id="拿到requeset" tabindex="-1"><a class="header-anchor" href="#拿到requeset" aria-hidden="true">#</a> 拿到requeset</h4>
<p><em><strong>第一步</strong></em>：在浏览器地址栏写<code>?key=value&amp;key=value.....</code>参数，传给服务器request接收。</p>
<img src="nodejs.assets/image-20211018170026061.png" alt="image-20211018170026061" style="zoom:50%;" />
<p>打印<code>request.url</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> server <span class="token operator">=</span> http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">request<span class="token punctuation">,</span> response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
   response<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">'content-type'</span><span class="token punctuation">,</span><span class="token string">'text/html;charset=utf-8'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   response<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">'&lt;h1>OK,kwong,旷力介&lt;/h1>'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>得到两个东西：①我们在浏览器中写入的参数②浏览器直接发送了一次请求<code>http://localhost:3000/favicon.ico</code></p>
<img src="nodejs.assets/image-20211018170147602.png" alt="image-20211018170147602" style="zoom:50%;float:left" />
<p><em><strong>第二步</strong></em>：由于我们拿到的<code>?key=value&amp;key=value.....</code>的编码形式为<code>urlencoded</code>很不方便，我们要引入一个node内置模块<code>querystring</code>。该模块可以解析<u>查询字符串</u>为我们熟悉的<u>对象</u></p>
<p><em>1.引入qs对象，该对象上有很多有用的方法，最具代表性的：parse()</em></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> qs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'querystring'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><em>2.获取客户端携带过来的urlencoded编码形式的参数</em></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 获取客户端携带过来的urlencoded编码形式的参数</span>
<span class="token keyword">let</span> params <span class="token operator">=</span> request<span class="token punctuation">.</span>url<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">"?"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token comment">//name=kwong&amp;age=20</span>
<span class="token keyword">let</span> paramsObj <span class="token operator">=</span> qs<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//{ name: 'kwong', age: '20' }//！！！传过来的数字也被当作字符串</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>paramsObj<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//{ name: 'kwong', age: '20' }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="get请求与post请求" tabindex="-1"><a class="header-anchor" href="#get请求与post请求" aria-hidden="true">#</a> GET请求与POST请求</h3>
<h4 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h4>
<blockquote>
<p>HTTP设定了八种发送请求方式（也称为八大“动作”）。这八种方法没有任何本质上的区别。只是让请求，更加有语义化而已。
八种方法分别为：OPTIONS、HEAD、GET、POST、PUT、DELETE、TRACE、CONNECT
这八种方法最终经过“岁月沉淀”后，最常用的是这两种：GET、POST</p>
</blockquote>
<h4 id="get" tabindex="-1"><a class="header-anchor" href="#get" aria-hidden="true">#</a> GET</h4>
<pre><code>1. 含义：从指定的资源（位置）获取数据（一种“索取”的感觉）。
2. 什么时候使用GET请求较为合适？
    (1)单纯获取数据的时。
    (2)请求非敏感数据时。
</code></pre>
<h4 id="post" tabindex="-1"><a class="header-anchor" href="#post" aria-hidden="true">#</a> POST</h4>
<pre><code>1.含义：向指定的资源提交要被处理的数据（一种“交差”的感觉）。
2.什么时候使用POST请求较为合适？
    (1)传送相对敏感数据时。
    (2)请求的结果有持续性的副作用，例如：传递的数据要写入数据库时。
    备注：使用了POST不代表的绝对的安全。
</code></pre>
<h4 id="常见的get请求" tabindex="-1"><a class="header-anchor" href="#常见的get请求" aria-hidden="true">#</a> 常见的GET请求：</h4>
<pre><code>1.浏览器地址栏输入网址时（即浏览器请求页面时，且无法手动更改）。
2.可以请求外部资源的html标签，例如：&lt;img&gt; &lt;a&gt; &lt;link&gt; &lt;script&gt;，且无法手动更改。
3.发送Ajax时若没有指定发送请求的方式，则使用GET方式，或者明确指出了使用GET请求。
4.form表单提交时，若没有指明方式，默认使用GET。
</code></pre>
<h4 id="常见的post请求" tabindex="-1"><a class="header-anchor" href="#常见的post请求" aria-hidden="true">#</a> 常见的POST请求：</h4>
<pre><code>1.发送Ajax时,明确指出了使用POST方式时。
2.form表单提交时明确指出使用POST方式
</code></pre>
<h4 id="二者的区别" tabindex="-1"><a class="header-anchor" href="#二者的区别" aria-hidden="true">#</a> 二者的区别</h4>
<p><img src="nodejs.assets/2.GET与POST对比.png" alt="2.GET与POST对比"></p>
<p><em><strong>书签</strong></em></p>
<p>get可以被收藏为书签：get后参数会拼接到地址栏</p>
<p>post不可以被收藏为书签：post后参数==不会==拼接到地址栏</p>
<h3 id="express" tabindex="-1"><a class="header-anchor" href="#express" aria-hidden="true">#</a> Express</h3>
<h3 id="http" tabindex="-1"><a class="header-anchor" href="#http" aria-hidden="true">#</a> HTTP</h3>
<h4 id="http协议是什么" tabindex="-1"><a class="header-anchor" href="#http协议是什么" aria-hidden="true">#</a> http协议是什么？</h4>
<ul>
<li>是什么：超文本传输协议（属于应用层协议）</li>
<li>特点：无状态，现在cookie解决了无状态的问题（早期网页开发时，用cookie解决，现在是cookie和session配合使用）</li>
<li>作用：规定了服务器和客户端传递信息的规则（统称为报文，分为：请求报文、响应报文。）</li>
<li>版本：
<ul>
<li>http 1.0 （老版本） ----------  不支持长连接</li>
<li>http 1.1 （主流版本）---------  优点：支持长连接，弊端：同时发送资源的数量过小。</li>
<li>http 2.0 （最新版） ----------  同时发送资源的数量稍有提升。</li>
</ul>
</li>
<li>报文(请求报文、响应报文)的组成：
1.报文首行
2.报文头
3.空行（仅仅作为一个分割）
4.报文体</li>
</ul>
<img src="nodejs.assets/image-20211018213913982.png" alt="image-20211018213913982" style="zoom: 30%;float:left" />
<h4 id="get请求报文" tabindex="-1"><a class="header-anchor" href="#get请求报文" aria-hidden="true">#</a> GET请求报文</h4>
<p>（给服务器看的）-- 通过form表单发送的GET请求</p>
<pre><code>GET http://localhost:3000/?name=kobe&amp;password=123 HTTP/1.1
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
</code></pre>
<h5 id="请求报文首行" tabindex="-1"><a class="header-anchor" href="#请求报文首行" aria-hidden="true">#</a> 请求报文首行</h5>
<pre><code>GET http://localhost:3000/?name=kobe&amp;password=123 HTTP/1.1
-请求方式 协议名://主机地址:端口号/？urlencoded编码形式的参数 协议名/版本
</code></pre>
<h5 id="请求报文头" tabindex="-1"><a class="header-anchor" href="#请求报文头" aria-hidden="true">#</a> 请求报文头</h5>
<pre><code>Host: localhost:3000
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
</code></pre>
<h5 id="空行" tabindex="-1"><a class="header-anchor" href="#空行" aria-hidden="true">#</a> 空行</h5>
<h5 id="请求报文体" tabindex="-1"><a class="header-anchor" href="#请求报文体" aria-hidden="true">#</a> 请求报文体</h5>
<pre><code>GET请求没有报文体
</code></pre>
<h5 id="备注" tabindex="-1"><a class="header-anchor" href="#备注" aria-hidden="true">#</a> 备注</h5>
<ol>
<li>form表单的post请求和get请求 参数均以urlencoded形式进行编码</li>
<li>get请求将urlencoded编码的参数放入请求地址携带给服务器，所以称之为：查询字符串参数</li>
<li>post请求将urlencoded编码的参数放入请求体，所以称之为请求体参数</li>
</ol>
<p><em><strong>查新字符串参数与请求体参数</strong></em></p>
<img src="nodejs.assets/image-20211019201329101.png" alt="image-20211019201329101" style="zoom: 33%;float:left" />
<h4 id="响应报文" tabindex="-1"><a class="header-anchor" href="#响应报文" aria-hidden="true">#</a> 响应报文</h4>
<img src="nodejs.assets/image-20211019204949689.png" alt="image-20211019204949689" style="zoom:50%;float:left" />
<h4 id="http状态码" tabindex="-1"><a class="header-anchor" href="#http状态码" aria-hidden="true">#</a> HTTP状态码</h4>
<blockquote>
<p>服务器给客户端的东西</p>
</blockquote>
<p>插件</p>
<img src="nodejs.assets/image-20211019205411141.png" alt="image-20211019205411141" style="zoom: 50%;float:left" />
<p>状态码详细</p>
<img src="https://files.catbox.moe/pw9k4b.png" style="zoom:50%;float:left" />
<p>重定向（跳转）</p>
<ul>
<li>服务端跳转</li>
<li>客户端跳转</li>
</ul>
<img src="nodejs.assets/image-20211019212933677.png" alt="image-20211019212933677" style="zoom: 33%;float:left" />
<hr>
<h4 id="经典面试题" tabindex="-1"><a class="header-anchor" href="#经典面试题" aria-hidden="true">#</a> 经典面试题</h4>
<p>问题：从用户输入URl按下回车，一直到用户能看到界面，期间经历了什么？</p>
<p><strong>一、DNS解析----域名翻译成 IP地址（优先走缓存）：</strong></p>
<p>1.找浏览器DNS缓存解析域名</p>
<p>2.找本机DNS缓存：(备注：查看本机DNS缓存命令：ipconfig/displaydns &gt; C:/dns.txt)</p>
<p>3.找路由器DNS缓存</p>
<p>4.找运营商DNS缓存（80%的DNS查找，到这一步就结束）</p>
<p>5.递归查询 (查询全球13台根DNS服务器)</p>
<p><strong>二、进行TCP（协议）连接，三次握手（根据上一步请求回来的ip地址，去联系服务器）</strong></p>
<p>第一次握手：由浏览器发给服务器，我想和你说话，你能“听见”嘛？</p>
<p>第二次握手：由服务器发给浏览器，我能听得见，你说吧！</p>
<p>第三次握手：由浏览器发给服务器，好，那我就开始说话。</p>
<p><strong>三、发送请求（请求报文）</strong></p>
<p><strong>四、得到响应（响应报文）</strong></p>
<p><strong>五、浏览器开始解析html</strong></p>
<p>​    --预解析：将所有外部的资源，发请求出去</p>
<p>​    --解析html，生成DOM树</p>
<p>​    --解析CSS，生成CSS树</p>
<p>​    --合并成一个render树</p>
<p>​    --js是否操作了DOM或样式</p>
<p>​      --有：进行重绘重排（不好，1.尽量避免；2.最小化重绘重排）</p>
<p>​      --没有：null</p>
<p>​    --最终展示界面</p>
<p><strong>六、断开TCP连接，四次挥手（确保数据的完整性）</strong></p>
<p>​    第一次挥手：由浏览器发给服务器，我的东西接受完了，你断开吧。</p>
<p>​    第二次挥手：--由服务器发给浏览器，我还有一些东西没接收完，你等一会，我接收好了且验证好了我告诉你</p>
<p>​         --由服务器发给浏览器，我的东西接收完了，但是你还得等一会，我要验证数据的完整性，验证完了我告诉你。</p>
<p>​    第三次挥手：由服务器发给浏览器，我接收完（验证完）了，你断开吧。</p>
<p>​    第四次挥手：由浏览器发给服务器，好的，那我断开了。</p>
<p><strong>备注：为什么握手要三次，挥手要四次？</strong></p>
<p>​    握手之前，还没有进行数据的传输，确保握手就可以了。</p>
<p>​    挥手之前，正在进行数据的传输，为了确保数据的完整性，必须多经历一次验证（继续接收）</p>
<hr>
<h4 id="路由" tabindex="-1"><a class="header-anchor" href="#路由" aria-hidden="true">#</a> 路由</h4>
<p><strong>request和response的API</strong></p>
<p><em><strong>request</strong></em></p>
<ol>
<li>request.query 获取查询字符串参数（query参数），拿到的是一个对象</li>
<li>request.params 获取get请求参数路由的参数，拿到的是一个对象</li>
<li>request.body 获取post请求体参数，拿到的是一个对象（不可以直接用，要借助一个中间件）</li>
<li>request.get(xxxx) 获取请求头中指定key对应的value</li>
</ol>
<p><em>根路由</em></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"我是根路由"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><em>一级路由</em></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/food"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"我是/food"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><em>参数路由</em></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/food/:id"</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span>res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> <span class="token punctuation">{</span>id<span class="token punctuation">}</span> <span class="token operator">=</span> req<span class="token punctuation">.</span>params<span class="token punctuation">;</span><span class="token comment">//id为34324，则为{ id: '34324' }</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><em><strong>response</strong></em></p>
<ul>
<li>response.send() 给浏览器做出一个响应</li>
<li>response.end() 给浏览器做出一个响应，不会追加响应头</li>
<li>response.download() 告诉浏览器下载一个文件，可以传递相对路径</li>
<li>response.sendFlie() 给浏览器发送一个文件，备注：必须为绝对路径</li>
<li>response.redirect() 重定向到一个新的地址(url)==浏览器重定向==</li>
<li>response.set(key, value) 自定义响应头内容</li>
<li>response.get(key); 获取响应头指定key对应的value（很少使用</li>
<li>response.status(code); 设置响应状态码</li>
</ul>
<h3 id="cookie" tabindex="-1"><a class="header-anchor" href="#cookie" aria-hidden="true">#</a> cookie</h3>
<p><em><strong>定义</strong></em></p>
<ol>
<li>本质是一个<strong>字符串</strong>，里面包含着浏览器和服务器沟通的信息（交互时产生的信息）</li>
<li>存储形式以：<strong>key-value</strong>的形式存储</li>
<li>浏览器会自动携带该网站的cookie，只要是该网站下的cookie，全部携带</li>
</ol>
<p><em><strong>分类</strong></em></p>
<ul>
<li>会话cookie（在浏览器运行的那块<strong>内存上</strong>，关闭浏览器后cookie会消失）</li>
<li>持久化cookie（存储在用户的硬盘上，到了过期时间自动销毁</li>
</ul>
<p><em><strong>工作原理</strong></em></p>
<ul>
<li>当浏览器第一次请求服务器的时候，服务器可能返回一个或多个cookie给浏览器</li>
<li>浏览器判断cookie种类
<ul>
<li>会话cookie</li>
<li>持久化cookie</li>
</ul>
</li>
<li>以后请求该网站的时候，自动携带上该网站的所有cookie(无法进行干预)</li>
<li>服务器拿到之前自己发的cookie，分析里面的内容，校验cookie的合法性，根据cookie里保存的内容，进行具体的业务逻辑</li>
</ul>
<p><em><strong>应用</strong></em></p>
<p>解决http无状态的问题（<u>一般来说不会单独使用cookie，一般配合后台的session存储使用</u>）</p>
<p><strong>不同语言、不同后端框架的cookie的具体语法是不一样的，但是cookie原理和工作过程是不变的</strong></p>
<p>==备注==</p>
<p>cookie不一定只由服务器生成，前端同样可以生成cookie，但意义不大</p>
<h4 id="express中的cookie" tabindex="-1"><a class="header-anchor" href="#express中的cookie" aria-hidden="true">#</a> express中的cookie</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"express"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> cookieParser <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"cookie-parser"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">cookieParser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//demo路由不对cookie进行任何操作</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/demo'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//会话cookie</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/demo1'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// express中给客户端”种“cookie不需要任何的库</span>
    <span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">hobby</span><span class="token operator">:</span><span class="token string">"gaming,painting,cooking"</span><span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"kwong"</span><span class="token punctuation">}</span>
    res<span class="token punctuation">.</span><span class="token function">cookie</span><span class="token punctuation">(</span><span class="token string">"info"</span><span class="token punctuation">,</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"cookie已经种下"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//持久化cookie</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/demo2'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">cookie</span><span class="token punctuation">(</span><span class="token string">"info"</span><span class="token punctuation">,</span><span class="token string">"infomation"</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token literal-property property">maxAge</span><span class="token operator">:</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">30</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"cookie已经种下"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//读取客户端携带过来的cookie</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/demo3'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// express中读取客户端携带过来的cookie要借助一个库(中间件)，名为cookie-parser</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>cookies<span class="token punctuation">)</span><span class="token punctuation">;</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"cookie已经种下"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//删除一个cookie</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/demo4'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">cookie</span><span class="token punctuation">(</span><span class="token string">"info"</span><span class="token punctuation">,</span><span class="token string">""</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token literal-property property">maxAge</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    res<span class="token punctuation">.</span><span class="token function">clearCookie</span><span class="token punctuation">(</span><span class="token string">"info"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token string">"3000"</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"演示服务器启动成功了"</span><span class="token punctuation">)</span>
    <span class="token keyword">else</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><h3 id="session会话存储" tabindex="-1"><a class="header-anchor" href="#session会话存储" aria-hidden="true">#</a> session会话存储</h3>
<p><em><strong>定义</strong></em></p>
<p>标准来说，session这个单词指的是会话</p>
<ol>
<li>前端通过浏览器去查看cookie的时候，会发现有些cookie的过期时间是session，意味着该cookie为会话cookie</li>
<li>后端人员常常把==session会话存储==简称为：session存储，或者更简单的称为：session</li>
</ol>
<p><em><strong>特点</strong></em></p>
<ol>
<li>存在于服务器</li>
<li>存储的是浏览器和服务器之间沟通产生的一些信息</li>
<li>默认session的存储在服务器的内存中，每当一个新客户端发来请求，服务器都会开辟出一块空间，供session会话存储使用</li>
</ol>
<p><em><strong>工作流程</strong></em></p>
<ul>
<li>第一次浏览器请求服务器的时候，服务器开辟一块内存空间，供session会话使用</li>
<li>返回响应的时候，自动返回一个cookie（有时为了安全会返回多个），cookie里包含着，上一步产生会话存储”容器“的编号（id）</li>
<li>之后的请求，浏览器会自动携带这个cookie给服务器</li>
<li>==服务器拿到cookie中对应session的id==，去服务器中匹配</li>
<li>服务器根据匹配信息，决定下一步逻辑</li>
</ul>
<p>备注</p>
<blockquote>
<ol>
<li>一般来说cookie一定会配合session使用</li>
<li>服务器一般会做session的持久化，防止服务器重启，造成session的丢失</li>
</ol>
</blockquote>
<h3 id="ajax" tabindex="-1"><a class="header-anchor" href="#ajax" aria-hidden="true">#</a> Ajax</h3>
<h4 id="原生发送ajax" tabindex="-1"><a class="header-anchor" href="#原生发送ajax" aria-hidden="true">#</a> 原生发送Ajax</h4>
<ol>
<li>实例化一个XMLHttpRequest对象</li>
<li>绑定一个名为onreadstatechange事件监听</li>
<li>调用open方法 ———— 用什么方法发？给谁发？带着什么过去？</li>
<li>调用send方法 ———— 发送什么请求</li>
</ol>
<p><em><strong>监听时 xhr的五种状态</strong></em></p>
<ul>
<li>
<p>0: xhr诞生的时候就是0状态,代表着xhr是初始化状态</p>
</li>
<li>
<p>1: send方法还没有被调用，请求还没有发出去，此时依然可以调用请求头</p>
</li>
<li>
<p>2: send方法被调用了，即请求已经发出去了，此时已经不可以再修改请求头</p>
</li>
<li>
<p>3: 已经回来一部分数据了，如果是比较小的数据，会在此阶段一次性接收完毕</p>
</li>
<li>
<p>4: 数据完美的回来了</p>
</li>
</ul>
<p>源文件</p>
<p>ajax_get.html</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>点我使用原生js发送ajax的get请求<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token keyword">let</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'button'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        btn<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token comment">// 1.创建一个XmlHttpRequest实例</span>
            <span class="token keyword">let</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 2.绑定监听</span>
            xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token comment">//xhr本身有五种状态：0,1,2,3,4</span>
                <span class="token comment">/* 
                    0:xhr诞生的时候就是0状态,代表着xhr是初始化状态
                    1:send方法还没有被调用，请求还没有发出去，此时依然可以调用请求头
                    2:send方法被调用了，即请求已经发出去了，此时已经不可以再修改请求头
                    3:已经回来一部分数据了，如果是比较小的数据，会在此阶段一次性接收完毕
                    4:数据完美的回来了
                 */</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token number">4</span> <span class="token operator">&amp;&amp;</span> xhr<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token comment">// 如果进入此判断，意味着请求成功了，且数据回来了</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">//我们几乎不会在0状态里做任何事情。0状态已经在新建实例的时候完成了，在这里是永远也进不到0状态的判断的</span>
                
                <span class="token comment">//1:修改请求头</span>
                <span class="token comment">// if(xhr.readyState === 1){</span>
                <span class="token comment">//     xhr.setRequestHeader("demo",'123');</span>
                <span class="token comment">// }</span>
            <span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token comment">//3.调用open方法</span>
            xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'get'</span><span class="token punctuation">,</span><span class="token string">'http://localhost:3000/ajax_get?name="kwong'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//4.调用send方法</span>
            xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><p>ajax_post.js</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>点我使用原生js发送ajax的post请求<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token keyword">let</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'button'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        btn<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token comment">// 1.创建一个XmlHttpRequest实例</span>
            <span class="token keyword">let</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 2.绑定监听</span>
            xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token number">4</span> <span class="token operator">&amp;&amp;</span> xhr<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token comment">// 如果进入此判断，意味着请求成功了，且数据回来了</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">let</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    div<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> xhr<span class="token punctuation">.</span>response<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token comment">//3.调用open方法</span>
            xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'post'</span><span class="token punctuation">,</span><span class="token string">'http://localhost:3000/ajax_post'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//特别注意：此处是设置post请求所特有的请求头，若不设置，服务器无法获取参数</span>
            xhr<span class="token punctuation">.</span><span class="token function">setRequestHeader</span><span class="token punctuation">(</span><span class="token string">'content-Type'</span><span class="token punctuation">,</span><span class="token string">'application/x-www-form-urlencoded'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//4.调用send方法</span>
            xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">'name=kwong&amp;age=20'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>server.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//用于解析post请求体参数——参数的编码类型必须为urlencoded</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">urlencoded</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">extended</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/public'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/ajax_get'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"你发来的get请求我收到了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/ajax_post'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"你发来的post请求我收到了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token string">"3000"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"服务器启动成功了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><img src="nodejs.assets/image-20211027082011579.png" alt="image-20211027082011579" style="zoom:50%;float:left" />
<h4 id="取消上一次请求" tabindex="-1"><a class="header-anchor" href="#取消上一次请求" aria-hidden="true">#</a> 取消上一次请求</h4>
<p><em><strong>xhr.abort</strong></em></p>
<ol>
<li>如果来得及，半路取消，请求根本没有到达服务器</li>
<li>如果来不及，拒之门外，请求已经到达了服务器，且服务器已经给出响应</li>
<li>也存在根本不起作用的情况</li>
</ol>
<p>verifiCode.html</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>点我获取验证码<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
      <span class="token keyword">function</span> <span class="token function">getAutoCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token number">4</span> <span class="token operator">&amp;&amp;</span> xhr<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果进入此判断，意味着请求成功了，且数据回来了</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">let</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            div<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> xhr<span class="token punctuation">.</span>response<span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">"get"</span><span class="token punctuation">,</span> <span class="token string">"http://localhost:3000/get_code"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> xhr<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">let</span> lastxhr<span class="token punctuation">;</span>
      <span class="token keyword">let</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"button"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      btn<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>lastxhr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          lastxhr<span class="token punctuation">.</span><span class="token function">abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          lastxhr <span class="token operator">=</span> <span class="token function">getAutoCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          lastxhr <span class="token operator">=</span> <span class="token function">getAutoCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>server.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//用于解析post请求体参数——参数的编码类型必须为urlencoded</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">urlencoded</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">extended</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/public'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//返回验证码的路由，路由返回一个 1000~9999的随机数</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/get_code'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"有人找我要验证码了"</span><span class="token punctuation">)</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> autoCode <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">8999</span> <span class="token operator">+</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//乘以最大值与最小值的差，加上最小值</span>
        res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>autoCode<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//send不能发送纯数字，会被视为状态码</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">4000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token string">"3000"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"服务器启动成功了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h4 id="jquery封装的ajax请求" tabindex="-1"><a class="header-anchor" href="#jquery封装的ajax请求" aria-hidden="true">#</a> jQuery封装的Ajax请求</h4>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/javascript<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./js/jquery-1.12.4.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>点我使用jquery发送ajax-get请求<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>点我使用jquery发送ajax-post请求<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
      <span class="token keyword">let</span> btn1 <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'.btn1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">let</span> btn2 <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'.btn2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>btn1<span class="token punctuation">,</span>btn2<span class="token punctuation">)</span><span class="token punctuation">;</span>
      btn1<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//使用jQuery发送一次ajax请求，完整版</span>
        $<span class="token punctuation">.</span><span class="token function">ajax</span><span class="token punctuation">(</span><span class="token string">"http://localhost:3000/ajax_get"</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
          <span class="token comment">// url:"http://localhost:3000/ajax_get",//也可以将参数一放入配置对象中</span>
          <span class="token literal-property property">method</span><span class="token operator">:</span><span class="token string">"get"</span><span class="token punctuation">,</span>
          <span class="token literal-property property">data</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'kwong'</span><span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token function-variable function">success</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">result</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token function-variable function">error</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//简写</span>
        $<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"http://localhost:3000/ajax_get"</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'kwong'</span><span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">data<span class="token punctuation">,</span> status<span class="token punctuation">,</span> xhr</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      btn2<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        $<span class="token punctuation">.</span><span class="token function">ajax</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">url</span><span class="token operator">:</span><span class="token string">"http://localhost:3000/ajax_post"</span><span class="token punctuation">,</span>
          <span class="token literal-property property">method</span><span class="token operator">:</span><span class="token string">"post"</span><span class="token punctuation">,</span>
          <span class="token function-variable function">success</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token function-variable function">error</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br></div></div><h3 id="跨域问题总结" tabindex="-1"><a class="header-anchor" href="#跨域问题总结" aria-hidden="true">#</a> 跨域问题总结</h3>
<img src="nodejs.assets/image-20211027202426875.png" alt="image-20211027202426875" style="zoom: 33%;" />
<h4 id="_1-为什么会有跨域这个问题" tabindex="-1"><a class="header-anchor" href="#_1-为什么会有跨域这个问题" aria-hidden="true">#</a> 1.为什么会有跨域这个问题？</h4>
<blockquote>
<p>原因是浏览器为了安全，而采用的同源策略（Same origin policy）</p>
</blockquote>
<h4 id="_2-什么是同源策略" tabindex="-1"><a class="header-anchor" href="#_2-什么是同源策略" aria-hidden="true">#</a> 2.什么是同源策略？</h4>
<pre><code>1. 同源策略是由Netscape提出的一个著名的安全策略，现在所有支持JavaScript 的浏览器都会使用这个策略。
2. Web是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现。
3. 所谓同源是指：协议，域名（IP），端口必须要完全相同
   即：协议、域名（IP）、端口都相同，才能算是在同一个域里。
</code></pre>
<p>备注：规则举例如下(假设已有网站地址为：http://study.cn)
<img src="https://s2.ax1x.com/2019/01/26/knAIit.png" alt="Alt text"></p>
<h4 id="_3-没有同源策略的危险场景" tabindex="-1"><a class="header-anchor" href="#_3-没有同源策略的危险场景" aria-hidden="true">#</a> 3.没有同源策略的危险场景：</h4>
<p>危险场景：</p>
<blockquote>
<p>有一天你刚睡醒，收到一封邮件，说是你的银行账号有风险，赶紧点进www.yinghang.com改密码。你着急的赶紧点进去，还是熟悉的银行登录界面，你果断输入你的账号密码，登录进去看看钱有没有少了，睡眼朦胧的你没看清楚，平时访问的银行网站是www.yinhang.com，而现在访问的是www.yinghang.com，随后你来了一条短信，钱没了，这个钓鱼网站做了什么呢？大概是如下思路：</p>
</blockquote>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>iframe</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>baidu<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://www.baidu.com<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>iframe</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/javascript<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">const</span> iframe <span class="token operator">=</span> window<span class="token punctuation">.</span>frames<span class="token punctuation">[</span><span class="token string">'baidu'</span><span class="token punctuation">]</span>
  <span class="token keyword">const</span> inputNode <span class="token operator">=</span> iframe<span class="token punctuation">.</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'输入敏感信息的input的id'</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>inputNode<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>黑客服务器拦截:</p>
<img src="nodejs.assets/image-20211027203042047.png" alt="image-20211027203042047" style="zoom:33%;float:left" />
<p>有可能响应的数据被拦截，并替换为其它数据。</p>
<p><em><strong>form表单不会有跨域问题</strong></em></p>
<img src="nodejs.assets/image-20211027202642772.png" alt="image-20211027202642772" style="zoom:33%;float:left" />
<p>原因：form表单提交后会转跳到和服务器同端口（如：http://localhost:3000）的网页上</p>
<h4 id="_4-非同源受到哪些限制" tabindex="-1"><a class="header-anchor" href="#_4-非同源受到哪些限制" aria-hidden="true">#</a> 4.非同源受到哪些限制？</h4>
<pre><code>1. Cookie不能读取；
2. DOM无法获得；
3. Ajax请求不能发送
</code></pre>
<h4 id="_5-如何在开发中解决跨域问题" tabindex="-1"><a class="header-anchor" href="#_5-如何在开发中解决跨域问题" aria-hidden="true">#</a> 5.如何在开发中解决跨域问题：</h4>
<p>哪些get会受到限制</p>
<ol>
<li>form——不受到同源策略的限制</li>
<li>ajax——收到同源策略的限制</li>
<li>浏览器地址栏——不受到同源策略的限制</li>
<li><u><code>&lt;img&gt;&lt;link&gt;&lt;script src&gt;</code>等引入外部资源的标签——不受到同源策略的限制</u></li>
</ol>
<p><em><strong>script标签不受到同源策略的影响</strong></em></p>
<p>jsonp.html</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token keyword">function</span> <span class="token function">demo</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>param</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- script标签不受到同源策略的影响 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://localhost:3000/test<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>server.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/public'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//如果在浏览器输入http://localhost:3000/test，浏览器通过地址栏发送get请求，拿到send的内容当页面内容解析</span>
<span class="token comment">//如果用script标签,拿到的内容当js代码用</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/test'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">demo(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token string">'3000'</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"演示json跨域的服务器启动了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>为什么用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">demo(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">demo(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>arr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//浏览器只输出了1,arr默认被展开成了1,2,3,4,5,7，即arr.toString()</span>

<span class="token comment">/* 期望向demo传入一个参数，但是却传入了多个参数 */</span>
<span class="token comment">/* 解决方法一： JSON.stringify(arr)*/</span>
res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">demo(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/* 解决方法二： 照常发送多个参数，但是demo那边由...parma吸收多个参数为数组 */</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">demo(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>arr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>1.JSONP解决发送请求跨域问题：</strong></p>
<blockquote>
<p>要明确的是：JSONP不是一种技术，而是程序员“智慧的结晶”（利用了标签请求资源不受同源策略限制的特点）
JSONP需要前后端人员互相配合。</p>
<p><strong>关于jsonp解决跨域</strong></p>
<ol>
<li>原理：利用script标签发请求不受同源策略的限制。所以不会产生跨域问题</li>
<li>套路：动态构建script节点，利用节点的src属性，发出get请求，从而绕开ajax引擎</li>
<li>弊端：
<ol>
<li>只能解决get请求。标签只能发送get请求</li>
<li>后端必须配合前端</li>
</ol>
</li>
<li>备注：有这样一种感觉：前端定义函数，后端“调用”。后端返回的数据，前端以js格式解析，并运行</li>
</ol>
</blockquote>
<p>前端页面写法：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>按钮<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/javascript<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token keyword">var</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'btn'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        btn<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//1. 创建一个script标签</span>
            <span class="token keyword">var</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'script'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//2. 设置回调函数</span>
            window<span class="token punctuation">.</span><span class="token function-variable function">getData</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//拿到数据</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//3. 设置script标签src属性，填写跨域请求的地址</span>
            script<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">'http://localhost:3000/jsonp?callback=getData'</span><span class="token punctuation">;</span>
            <span class="token comment">//4. 将script标签添加到body中生效</span>
            document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//5.不影响整体DOM结构，删除script标签</span>
            document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>后端写法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/jsonp'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">//解构赋值获取请求参数</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>callback<span class="token punctuation">}</span> <span class="token operator">=</span> req<span class="token punctuation">.</span>query
  <span class="token comment">//去数据库查找对应数据</span>
  <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'tom'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'jerry'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>callback <span class="token operator">+</span> <span class="token string">'('</span> <span class="token operator">+</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">')'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>2.后台配置cors解决跨域</strong></p>
<pre><code>以Node为例：
res.set('Access-Control-Allow-Origin', 'http://localhost:63342');
</code></pre>
<p><strong>3.使用代理服务器</strong></p>
<pre><code>例如：nginx等
</code></pre>
</template>
