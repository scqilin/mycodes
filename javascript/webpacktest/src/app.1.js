var $ = require('jquery')
var aMoud = require('./amoud')
var THREE = require('./three')

var div1 = $('#div1')
div1.html('jquery')

var div2 = document.getElementById('div2')
div2.innerHTML = 'getElementById'

aMoud.print()

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(-40,45,40);
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(new THREE.Color('#CCCCCC'));
function drawCube() {
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var color = new THREE.Color(0xFF0000);

    var colorArray = new Float32Array([Math.random(), Math.random(), Math.random()]);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: color.fromArray(colorArray)
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = Math.random() * 60 - 30;
    cube.position.y = Math.random() * 30 - 10;
    cube.position.z = Math.random() * 40 - 20;
    scene.add(cube);
}

var ambientLight = new THREE.AmbientLight('#222222');
scene.add(ambientLight);
var pointLight = new THREE.PointLight('#DDDDDD');
pointLight.position.set(-15,30,20);
scene.add(pointLight);

document.body.appendChild(renderer.domElement);
renderer.render(scene,camera);
var timeri = 0;
function run() {
    drawCube();
    timeri ++;
    renderer.render(scene,camera);
    var timer = setTimeout(run,100);
    if(timeri > 99){
        clearTimeout(timer);
    }
}
run();
