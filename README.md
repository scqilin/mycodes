# mycodes
# webgl\three.js 开发

[Three.js案例列表一](https://scqilin.github.io/mycodes/threejs01/threejs.html)  

[Three.js案例列表二](https://scqilin.github.io/mycodes/threejs02/example01.html)


 CommonJS 的模块化规范，大概的语法是： 如果 a.js 依赖 b.js 和 c.js， 那么就在 a.js 的头部，引入这些依赖文件：
var b = require('./b')
var c = require('./c')

wenpack.config.js 中模式设置
development模式不会压缩代码  production模式会压缩代码 
"test": "echo \"Error: no test specified\" && exit 1",
"dev": "webpack --mode development",
"start": "webpack --mode production"

项目移植备份：把项目移植到其他电脑或者系统中去。
只要文件夹中有package.json文件。运行“npm install” 命令系统会自动下载相应的依赖包。
在移植备份中除了node_modules文件夹。其他的文件都需要拷贝。
node_modules文件是安装依赖包时候自动生成的，而且window和Linux系统编译生成的文件不一样，所以拷贝这个文件夹是没有用的，而且文件众多，拷贝也浪费时间。
项目使用git的时候，也要忽略这个文件夹。


2019年4月13日 18点21分
