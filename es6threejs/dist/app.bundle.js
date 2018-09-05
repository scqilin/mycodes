/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!Detector.webgl) Detector.addGetWebGLMessage();

function init() {
    var scene, camera, renderer, light, controls;
    var clock = new THREE.Clock();

    drawScene();

    function drawScene() {
        iniScene();
        iniLight();
        orbitControls();
        windowResize();
        cubeDr(4, 0, 2, 0);
        cubeDr(2, 0, 5, 0);
        iniPlane();
        render();
    }
    //场景
    function iniScene() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        camera.position.set(-30, 30, 30);
        camera.lookAt(scene.position);
        renderer.setClearColor(0x333333);
        renderer.shadowMap.enabled = true;

        renderer.setSize(window.innerWidth, window.innerHeight);
        scene.add(new THREE.AxesHelper(4));
        document.body.appendChild(renderer.domElement);
    }
    //灯光
    function iniLight() {
        light = new THREE.AmbientLight(0x333333);
        scene.add(light);

        light = new THREE.SpotLight(0x888888);
        light.position.set(0, 40, 30);
        light.castShadow = true;
        light.shadow.mapSize.height = 4096;
        light.shadow.mapSize.width = 4096;
        scene.add(light);

        light = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
        light.position.set(0, 200, 0);
        scene.add(light);
    }
    //地面 和 辅助网格
    function iniPlane() {
        var planeGeo = new THREE.PlaneGeometry(40, 40);
        var planeMat = new THREE.MeshPhongMaterial({ color: 0x999999 });
        var plane = new THREE.Mesh(planeGeo, planeMat);
        plane.receiveShadow = true;
        plane.position.y = -0.01;
        plane.rotation.x = -0.5 * Math.PI;
        scene.add(plane);

        var grid = new THREE.GridHelper(40, 20, 0x000000, 0x000000);
        grid.material.transparent = true;
        grid.material.opacity = 0.3;
        scene.add(grid);
    }
    //立方体
    function cubeDr(a, x, y, z) {
        var cubeGeo = new THREE.BoxGeometry(a, a, a);
        var cubeMat = new THREE.MeshPhongMaterial({
            color: 0xfff000 * Math.random()
        });
        var cube = new THREE.Mesh(cubeGeo, cubeMat);
        cube.position.set(x, y, z);
        cube.castShadow = true;
        scene.add(cube);
        return cube;
    }
    //相机轨道控制器
    function orbitControls() {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
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
        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }
    //渲染动画
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        controls.update(clock.getDelta());
    }
}
window.onload = init;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkRldGVjdG9yIiwid2ViZ2wiLCJhZGRHZXRXZWJHTE1lc3NhZ2UiLCJpbml0Iiwic2NlbmUiLCJjYW1lcmEiLCJyZW5kZXJlciIsImxpZ2h0IiwiY29udHJvbHMiLCJjbG9jayIsIlRIUkVFIiwiQ2xvY2siLCJkcmF3U2NlbmUiLCJpbmlTY2VuZSIsImluaUxpZ2h0Iiwib3JiaXRDb250cm9scyIsIndpbmRvd1Jlc2l6ZSIsImN1YmVEciIsImluaVBsYW5lIiwicmVuZGVyIiwiU2NlbmUiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsIldlYkdMUmVuZGVyZXIiLCJwb3NpdGlvbiIsInNldCIsImxvb2tBdCIsInNldENsZWFyQ29sb3IiLCJzaGFkb3dNYXAiLCJlbmFibGVkIiwic2V0U2l6ZSIsImFkZCIsIkF4ZXNIZWxwZXIiLCJkb2N1bWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImRvbUVsZW1lbnQiLCJBbWJpZW50TGlnaHQiLCJTcG90TGlnaHQiLCJjYXN0U2hhZG93Iiwic2hhZG93IiwibWFwU2l6ZSIsImhlaWdodCIsIndpZHRoIiwiSGVtaXNwaGVyZUxpZ2h0IiwicGxhbmVHZW8iLCJQbGFuZUdlb21ldHJ5IiwicGxhbmVNYXQiLCJNZXNoUGhvbmdNYXRlcmlhbCIsImNvbG9yIiwicGxhbmUiLCJNZXNoIiwicmVjZWl2ZVNoYWRvdyIsInkiLCJyb3RhdGlvbiIsIngiLCJNYXRoIiwiUEkiLCJncmlkIiwiR3JpZEhlbHBlciIsIm1hdGVyaWFsIiwidHJhbnNwYXJlbnQiLCJvcGFjaXR5IiwiYSIsInoiLCJjdWJlR2VvIiwiQm94R2VvbWV0cnkiLCJjdWJlTWF0IiwicmFuZG9tIiwiY3ViZSIsIk9yYml0Q29udHJvbHMiLCJhdXRvUm90YXRlIiwiYXV0b1JvdGF0ZVNwZWVkIiwiZW5hYmxlRGFtcGluZyIsImRhbXBpbmdGYWN0b3IiLCJlbmFibGVab29tIiwibWluRGlzdGFuY2UiLCJtYXhEaXN0YW5jZSIsImVuYWJsZVBhbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbldpbmRvd1Jlc2l6ZSIsImFzcGVjdCIsInVwZGF0ZVByb2plY3Rpb25NYXRyaXgiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ1cGRhdGUiLCJnZXREZWx0YSIsIm9ubG9hZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDaEZBLElBQUssQ0FBRUEsU0FBU0MsS0FBaEIsRUFBd0JELFNBQVNFLGtCQUFUOztBQUV4QixTQUFTQyxJQUFULEdBQWdCO0FBQ1osUUFBSUMsS0FBSixFQUFVQyxNQUFWLEVBQWlCQyxRQUFqQixFQUEwQkMsS0FBMUIsRUFBZ0NDLFFBQWhDO0FBQ0EsUUFBSUMsUUFBUSxJQUFJQyxNQUFNQyxLQUFWLEVBQVo7O0FBRUFD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QUFDQXZFLGlCQUFTd0UsU0FBVCxHQUFxQixLQUFyQjtBQUNIO0FBQ0Q7QUFDQSxhQUFTaEUsWUFBVCxHQUF3QjtBQUNwQk0sZUFBTzJELGdCQUFQLENBQXlCLFFBQXpCLEVBQW1DQyxjQUFuQyxFQUFtRCxLQUFuRDtBQUNBLGlCQUFTQSxjQUFULEdBQTBCO0FBQ3RCN0UsbUJBQU84RSxNQUFQLEdBQWdCN0QsT0FBT0MsVUFBUCxHQUFvQkQsT0FBT0UsV0FBM0M7QUFDQW5CLG1CQUFPK0Usc0JBQVA7QUFDQTlFLHFCQUFTMEIsT0FBVCxDQUFpQlYsT0FBT0MsVUFBeEIsRUFBb0NELE9BQU9FLFdBQTNDO0FBQ0g7QUFDSjtBQUNEO0FBQ0EsYUFBU0wsTUFBVCxHQUFrQjtBQUNka0UsOEJBQXNCbEUsTUFBdEI7QUFDQWIsaUJBQVNhLE1BQVQsQ0FBZ0JmLEtBQWhCLEVBQXNCQyxNQUF0QjtBQUNBRyxpQkFBUzhFLE1BQVQsQ0FBZ0I3RSxNQUFNOEUsUUFBTixFQUFoQjtBQUNIO0FBRUo7QUFDRGpFLE9BQU9rRSxNQUFQLEdBQWdCckYsSUFBaEIsQyIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJcclxuXHJcbmlmICggISBEZXRlY3Rvci53ZWJnbCApIERldGVjdG9yLmFkZEdldFdlYkdMTWVzc2FnZSgpO1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHZhciBzY2VuZSxjYW1lcmEscmVuZGVyZXIsbGlnaHQsY29udHJvbHM7XHJcbiAgICB2YXIgY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcclxuXHJcbiAgICBkcmF3U2NlbmUoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBkcmF3U2NlbmUoKSB7XHJcbiAgICAgICAgaW5pU2NlbmUoKTtcclxuICAgICAgICBpbmlMaWdodCgpO1xyXG4gICAgICAgIG9yYml0Q29udHJvbHMoKTtcclxuICAgICAgICB3aW5kb3dSZXNpemUoKTtcclxuICAgICAgICBjdWJlRHIoNCwwLDIsMCk7XHJcbiAgICAgICAgY3ViZURyKDIsMCw1LDApO1xyXG4gICAgICAgIGluaVBsYW5lKCk7XHJcbiAgICAgICAgcmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICAvL+WcuuaZr1xyXG4gICAgZnVuY3Rpb24gaW5pU2NlbmUoKSB7XHJcbiAgICAgICAgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcclxuICAgICAgICBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNDUsd2luZG93LmlubmVyV2lkdGgvd2luZG93LmlubmVySGVpZ2h0LDAuMSwxMDAwKTtcclxuICAgICAgICByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XHJcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnNldCgtMzAsMzAsMzApO1xyXG4gICAgICAgIGNhbWVyYS5sb29rQXQoc2NlbmUucG9zaXRpb24pO1xyXG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IoMHgzMzMzMzMpO1xyXG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCx3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICAgIHNjZW5lLmFkZChuZXcgVEhSRUUuQXhlc0hlbHBlcig0KSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcclxuICAgIH1cclxuICAgIC8v54Gv5YWJXHJcbiAgICBmdW5jdGlvbiBpbmlMaWdodCgpIHtcclxuICAgICAgICBsaWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHgzMzMzMzMpO1xyXG4gICAgICAgIHNjZW5lLmFkZChsaWdodCk7XHJcblxyXG4gICAgICAgIGxpZ2h0ID0gbmV3IFRIUkVFLlNwb3RMaWdodCgweDg4ODg4OCk7XHJcbiAgICAgICAgbGlnaHQucG9zaXRpb24uc2V0KDAsNDAsMzApO1xyXG4gICAgICAgIGxpZ2h0LmNhc3RTaGFkb3cgPSB0cnVlO1xyXG4gICAgICAgIGxpZ2h0LnNoYWRvdy5tYXBTaXplLmhlaWdodCA9IDQwOTY7XHJcbiAgICAgICAgbGlnaHQuc2hhZG93Lm1hcFNpemUud2lkdGggPSA0MDk2O1xyXG4gICAgICAgIHNjZW5lLmFkZChsaWdodCk7XHJcblxyXG4gICAgICAgIGxpZ2h0ID0gbmV3IFRIUkVFLkhlbWlzcGhlcmVMaWdodCggMHhmZmZmZmYsMHg0NDQ0NDQsMC42ICk7XHJcbiAgICAgICAgbGlnaHQucG9zaXRpb24uc2V0KCAwLCAyMDAsIDAgKTtcclxuICAgICAgICBzY2VuZS5hZGQoIGxpZ2h0ICk7XHJcbiAgICB9XHJcbiAgICAvL+WcsOmdoiDlkowg6L6F5Yqp572R5qC8XHJcbiAgICBmdW5jdGlvbiBpbmlQbGFuZSgpIHtcclxuICAgICAgICB2YXIgcGxhbmVHZW8gPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSg0MCw0MCk7XHJcbiAgICAgICAgdmFyIHBsYW5lTWF0ID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKCB7IGNvbG9yOiAweDk5OTk5OX0gKTtcclxuICAgICAgICB2YXIgcGxhbmUgPSBuZXcgVEhSRUUuTWVzaChwbGFuZUdlbyxwbGFuZU1hdCk7XHJcbiAgICAgICAgcGxhbmUucmVjZWl2ZVNoYWRvdyA9IHRydWU7XHJcbiAgICAgICAgcGxhbmUucG9zaXRpb24ueSA9IC0wLjAxO1xyXG4gICAgICAgIHBsYW5lLnJvdGF0aW9uLnggPSAtMC41Kk1hdGguUEk7XHJcbiAgICAgICAgc2NlbmUuYWRkKHBsYW5lKTtcclxuXHJcbiAgICAgICAgdmFyIGdyaWQgPSBuZXcgVEhSRUUuR3JpZEhlbHBlciggNDAsIDIwLCAweDAwMDAwMCwgMHgwMDAwMDAgKTtcclxuICAgICAgICBncmlkLm1hdGVyaWFsLnRyYW5zcGFyZW50ID0gdHJ1ZTtcclxuICAgICAgICBncmlkLm1hdGVyaWFsLm9wYWNpdHkgPSAwLjM7XHJcbiAgICAgICAgc2NlbmUuYWRkKCBncmlkICk7XHJcbiAgICB9XHJcbiAgICAvL+eri+aWueS9k1xyXG4gICAgZnVuY3Rpb24gY3ViZURyKGEseCx5LHopIHtcclxuICAgICAgICB2YXIgY3ViZUdlbyA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeShhLGEsYSk7XHJcbiAgICAgICAgdmFyIGN1YmVNYXQgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoe1xyXG4gICAgICAgICAgICBjb2xvcjoweGZmZjAwMCpNYXRoLnJhbmRvbSgpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGN1YmUgPSBuZXcgVEhSRUUuTWVzaChjdWJlR2VvLGN1YmVNYXQpO1xyXG4gICAgICAgIGN1YmUucG9zaXRpb24uc2V0KHgseSx6KTtcclxuICAgICAgICBjdWJlLmNhc3RTaGFkb3cgPSB0cnVlO1xyXG4gICAgICAgIHNjZW5lLmFkZChjdWJlKTtcclxuICAgICAgICByZXR1cm4gY3ViZTtcclxuICAgIH1cclxuICAgIC8v55u45py66L2o6YGT5o6n5Yi25ZmoXHJcbiAgICBmdW5jdGlvbiBvcmJpdENvbnRyb2xzKCkge1xyXG4gICAgICAgIGNvbnRyb2xzID0gbmV3IFRIUkVFLk9yYml0Q29udHJvbHMoY2FtZXJhLHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG4gICAgICAgIC8v6Ieq6L2sXHJcbiAgICAgICAgY29udHJvbHMuYXV0b1JvdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbHMuYXV0b1JvdGF0ZVNwZWVkID0gMC4yO1xyXG4gICAgICAgIC8v6Zi75bC8IOmYu+WwvOezu+aVsFxyXG4gICAgICAgIGNvbnRyb2xzLmVuYWJsZURhbXBpbmcgPSB0cnVlO1xyXG4gICAgICAgIGNvbnRyb2xzLmRhbXBpbmdGYWN0b3IgPSAwLjQ7XHJcbiAgICAgICAgLy/nvKnmlL5cclxuICAgICAgICBjb250cm9scy5lbmFibGVab29tID0gdHJ1ZTtcclxuICAgICAgICBjb250cm9scy5taW5EaXN0YW5jZSA9IDU7XHJcbiAgICAgICAgY29udHJvbHMubWF4RGlzdGFuY2UgPSAxMDA7XHJcbiAgICAgICAgLy/lj7PplK7mi5bmi71cclxuICAgICAgICBjb250cm9scy5lbmFibGVQYW4gPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8v5pS55Y+Y56qX5Y+j5aSn5bCPXHJcbiAgICBmdW5jdGlvbiB3aW5kb3dSZXNpemUoKSB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCBvbldpbmRvd1Jlc2l6ZSwgZmFsc2UgKTtcclxuICAgICAgICBmdW5jdGlvbiBvbldpbmRvd1Jlc2l6ZSgpIHtcclxuICAgICAgICAgICAgY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgICAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xyXG4gICAgICAgICAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5riy5p+T5Yqo55S7XHJcbiAgICBmdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XHJcbiAgICAgICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLGNhbWVyYSk7XHJcbiAgICAgICAgY29udHJvbHMudXBkYXRlKGNsb2NrLmdldERlbHRhKCkpO1xyXG4gICAgfVxyXG5cclxufVxyXG53aW5kb3cub25sb2FkID0gaW5pdDsiXSwic291cmNlUm9vdCI6IiJ9