# webpack 静态服务器

基本打包和模块化演示
引入了npm jQuery
引入 three.js 

app.js中 写的是 three.js的代码。 
<script src="./src/three.js"></script>
//在html中引入了./src/three.js 文件了 这里不需要再次引入，为什么引入了也不冲突呢
//var THREE = require('./three') 

app.js 是通过 require('./three') 方式引入的的 

通过require 方式引入的会通过webpack 打包到 bundle.js文件中。
而在html head 中通过 script方式引入的不会一起打包。