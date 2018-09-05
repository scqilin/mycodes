import initScene from './initScene.js' 
initScene.printMe()

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

function init() {
    var scene,camera,renderer,light,controls;
    var clock = new THREE.Clock();

    drawScene();

    function drawScene() {
        iniScene();
        iniLight();
        orbitControls();
        windowResize();

        linexDr(4,4,2,0);
        linezDr(2,0,2,0);
        var linex1 = roundXY().values()
        var linez1 = roundXY().values()
        var linex2 = roundXY().values()
        var linez2 = roundXY().values()
        for(var i=0;i<50;i++){
            linexDr(roundL(),linex1.next().value,2,linez1.next().value);
            linezDr(roundL(),linex2.next().value,2,linez2.next().value);           
        }
       
        iniPlane();
        render();
    }
    function roundL(){
        return Math.round(Math.random()*15+5)
        
    }
    function roundXY(){
        //return Math.round(Math.random()*70-35)
        var set = new Set()
        while(set.size < 50){
            var xy = Math.round(Math.random()*70-35)
            set.add(xy)
        }
       return set
    }
   
    //场景
    function iniScene() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
        renderer = new THREE.WebGLRenderer();
        camera.position.set(-30,30,30);
        camera.lookAt(scene.position);
        renderer.setClearColor(0x333333);
        renderer.shadowMap.enabled = true;

        renderer.setSize(window.innerWidth,window.innerHeight);
        scene.add(new THREE.AxesHelper(4));
        document.body.appendChild(renderer.domElement);
    }
    //灯光
    function iniLight() {
        light = new THREE.AmbientLight(0x333333);
        scene.add(light);

        light = new THREE.SpotLight(0x888888);
        light.position.set(0,40,30);
        light.castShadow = true;
        light.shadow.mapSize.height = 4096;
        light.shadow.mapSize.width = 4096;
        scene.add(light);

        light = new THREE.HemisphereLight( 0xffffff,0x444444,0.6 );
        light.position.set( 0, 200, 0 );
        scene.add( light );
    }
    //地面 和 辅助网格
    function iniPlane() {
        var planeGeo = new THREE.PlaneGeometry(80,80);
        var planeMat = new THREE.MeshPhongMaterial( { color: 0x999999} );
        var plane = new THREE.Mesh(planeGeo,planeMat);
        plane.receiveShadow = true;
        plane.position.y = -0.01;
        plane.rotation.x = -0.5*Math.PI;
        scene.add(plane);

        var grid = new THREE.GridHelper( 80, 20, 0x000000, 0x000000 );
        grid.material.transparent = true;
        grid.material.opacity = 0.3;
        scene.add( grid );
    }
    //立方体
    function linezDr(a,x,y,z) {
        var cubeGeo = new THREE.BoxGeometry(0.2,4,a);
        var cubeMat = new THREE.MeshPhongMaterial({
            color:0xfff000*Math.random()
        });
        var cube = new THREE.Mesh(cubeGeo,cubeMat);
        cube.position.set(x,y,z);
        cube.castShadow = true;
        scene.add(cube);
        return cube;
    }
    //立方体
    function linexDr(a,x,y,z) {
        var cubeGeo = new THREE.BoxGeometry(a,4,0.2);
        var cubeMat = new THREE.MeshPhongMaterial({
            color:0xfff000*Math.random()
        });
        var cube = new THREE.Mesh(cubeGeo,cubeMat);
        cube.position.set(x,y,z);
        cube.castShadow = true;
        scene.add(cube);
        return cube;
    }
    //相机轨道控制器
    function orbitControls() {
        controls = new THREE.OrbitControls(camera,renderer.domElement);
        //自转
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.2;
        //阻尼 阻尼系数
        controls.enableDamping = true;
        controls.dampingFactor = 0.4;
        //缩放
        controls.enableZoom = true;
        controls.minDistance = 5;
        controls.maxDistance = 100;
        //右键拖拽
        controls.enablePan = false;
    }
    //改变窗口大小
    function windowResize() {
        window.addEventListener( 'resize', onWindowResize, false );
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }
    //渲染动画
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene,camera);
        controls.update(clock.getDelta());
    }

}
window.onload = init;