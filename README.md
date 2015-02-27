# AngularJS快速入门

##为什么使用AngularJS

- 扩展HTML
> Angular使用directive(指令)扩展HTML标签原声属性，使用这些directive可以帮助我们节省一些重复性代码，把注意力放在业务逻辑开发上

- Scope
> Scope内的变量生命周期只在当前scope中，不会污染全局变量

- 使用灵活
> 通过定义ng-app来确定某块使用angular,可以不必全部使用。当引入angular后，即可使用angular提供的directive,filter,module等功能


##安装

访问官方网址http://angularjs.org,下载最新的Stable + Minified版本，或者使用CDN,或者使用bower安装。

如果结合Server Side(服务端)，则需要下载angular-resource.js(点击下载页面上的"Extra",进入页面并下载)

这里服务端使用的是Ruby on Rails,代码结构如下

	public
	  - javascripts
	      - angular.min.js
	  - index.html
	  
首先看index.html内容

	<!DOCTYPE html>
	<html ng-app>
	  <head>
		<meta charset="utf-8" />
		<title>Demo</title>
		<script type="text/javascript" src="javascripts/angular.min.js"></script>
	  </head>
	  <body>
		<h1>Welcome {{name}}!</h1>
		<input type="text" placeholder="请输入你的姓名" ng-model="name" />
	  </body>
	</html>

ng-app表明html DOM接下来由angular接管。{{name}}是angular的自省表达式。ng-model是angular的一种directive, 这里会反射h1种的name,做到动态绑定。

##初始化项目

这里使用CSS框架Bootstrap, 下载bootstrap-min.css, bootstrap-theme-min.css, 和bootstrap.min.js。将这些第三方库以及框架放入libs目录下，形成的目录如下

![skeleton](images/1.png)

启动Rails程序后查看源码，应该如下:

	<!DOCTYPE html>
	<html ng-app>
	<head>
  	  <title>Flights</title>
      <link data-turbolinks-track="true" href="/assets/libs/bootstrap.min.css?body=1" media="all" rel="stylesheet" />
      <link data-turbolinks-track="true" href="/assets/libs/bootstrap-theme.min.css?body=1" media="all" rel="stylesheet" />       
      <link data-turbolinks-track="true" href="/assets/application.css?body=1" media="all" rel="stylesheet" />
      <script data-turbolinks-track="true" src="/assets/jquery.js?body=1"></script>
      <script data-turbolinks-track="true" src="/assets/jquery_ujs.js?body=1"></script>
      <script data-turbolinks-track="true" src="/assets/turbolinks.js?body=1"></script>
      <script data-turbolinks-track="true" src="/assets/libs/angular.min.js?body=1"></script>
	  <script data-turbolinks-track="true" src="/assets/libs/angular-resource.min.js?body=1"></script>
      <script data-turbolinks-track="true" src="/assets/libs/bootstrap.min.js?body=1"></script>
      <script data-turbolinks-track="true" src="/assets/application.js?body=1"></script>
      <meta content="authenticity_token" name="csrf-param" />
      <meta content="MV9htXR6EbPMIF9bIdAZ3T0ckEyWXR3jmfQapiNSK3s=" name="csrf-token" />
    </head>
    <body>
      <h1>Welcome {{name}}!</h1>
      <input type="text" placeholder="请输入你的姓名" ng-model="name" />
    </body>
    </html>
    
在输入框中输入Foobar,Welcome Foobar!将会立刻显示

![foobar](images/2.png)

##Scope数据

Angular管辖的每一个Element都有它们自己的scope, 一旦element绑定到一个controller,那么这个controller的$scope对象将会注入到这个element中,在element上下文中可以访问$scope中的数据。

- 作用域包含了渲染视图时所需的功能和数据,它是所有视图的唯一源头。可以将作用域理解成视图模型(view model)
- 应用的作用域是和应用的数据模型相关联的,同时作用域也是表达式({{}})执行的上下文。$scope 对象是定义应用业务逻辑、控制器方法和视图属性的地方。
- 作用域是视图和控制器之间的胶水。在应用将视图渲染并呈献给用户之前,视图中的模板会 和作用域进行连接,然后应用会对DOM进行设置以便将属性变化通知给AngularJS
- 作用域是应用状态的基础。基于动态绑定,我们可以依赖视图在修改数据时立刻更新$scope, 也可以依赖$scope在其发生变化时立刻重新渲染视图。
- AngularJS将$scope设计成和DOM类似的结构,因此$scope可以进行嵌套,也就是说我们可 以引用父级$scope中的属性
- 作用域提供了监视数据模型变化的能力。它允许开发者使用其中的apply机制,将数据模型 的变化在整个应用范围内进行通知。我们在作用域的上下文中定义和执行表达式,同时它也是将 事件通知给另一个控制器和应用其他部分的中介
- 将应用的业务逻辑都放在控制器中,而将相关的数据都放在控制器的作用域中
- AngularJS启动并生成视图时,会将根ng-app元素同$rootScope进行绑定。$rootScope是所有$scope对象的最上层
- $rootScope是AngularJS中最接近全局作用域的对象。在$rootScope上附加太多业务逻并不是好主意,这与污染JavaScript的全局作用域是一样的
- $scope对象在AngularJS中充当数据模型,但与传统的数据模型不一样,$scope并不负责处 理和操作数据,它只是视图和HTML之间的桥梁,它是视图和控制器之间的胶水
- $scope的所有属性,都可以自动被视图访问到
- ng-controller指令为DOM元素创建了一个新的$scope对象,并将它嵌套在$rootScope中
- 作用域的表达式就是赋值给作用域对象的变量

$scope对象的生命周期处理有四个不同阶段

- 创建
> 在创建控制器或指令时,AngularJS会用$injector创建一个新的作用域,并在这个新建的控 制器或指令运行时将作用域传递进去

- 链接
>当Angular开始运行时,所有的$scope对象都会附加或者链接到视图中。所有创建$scope对 象的函数也会将自身附加到视图中。这些作用域将会注册当Angular应用上下文中发生变化时需 要运行的函数。(这些函数叫$watch函数，通过这些函数知道何时启动事件循环)

- 更新
>当事件循环运行时,它通常执行在顶层$scope对象上(被称作$rootScope),每个子作用域 都执行自己的脏值检测。每个监控函数都会检查变化。如果检测到任意变化,$scope对象就会触 发指定的回调函数

- 销毁
>当一个$scope在视图中不再需要时,这个作用域将会清理和销毁自己。尽管永远不会需要清理作用域(因为Angular会为你处理),但是知道是谁创建了这个作用域 还是有用的,因为你可以使用这个$scope上叫做$destory()的方法来清理这个作用域

指令通常不会创建自己的$scope,但也有例外。比如ng-controller和ng-repeat指令会创建自己的子作用域并将它们附加到DOM元素上

Scope能做什么？

- 提供观察者以监视数据模型的变化
- 可以将数据模型的变化通知给整个应用,甚至是系统外的组件
- 可以进行嵌套,隔离业务功能和数据
- 给表达式提供运算时所需的执行环境


## Filter过滤器

可以在视图中使用的函数,用来进行格式化