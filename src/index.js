import './style.css';
import * as THREE from 'three';

const image = document.getElementById('road');
const imageDimensions = image.getBoundingClientRect();
const canvas = document.createElement('canvas');

canvas.width = imageDimensions.width;
canvas.height = imageDimensions.height;

document.body.appendChild(canvas);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
    alpha: true
});

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(1, 1);
scene.add(gridHelper);

// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(imageDimensions.width, imageDimensions.height);
// });

const m = new THREE.Matrix4();

const trans = new THREE.Matrix4();
trans.makeTranslation(-1, 1, 0);

const rX = new THREE.Matrix4();
rX.makeRotationX((180 * Math.PI) / 180);

// const rY = new THREE.Matrix4();
// rY.makeRotationY((20 * Math.PI) / 180);

// const rZ = new THREE.Matrix4();
// rZ.makeRotationZ((46 * Math.PI) / 180);

const esc = new THREE.Matrix4();
esc.makeScale(2 / 1920, 2 / 1080, 1);

const rot = new THREE.Matrix4();
rot.makeRotationFromQuaternion(new THREE.Quaternion(0.52, 0.25, 0.241, 0.78));

m.multiply(trans);
m.multiply(rX);
//m.multiply(rY);
//m.multiply(rZ);
m.multiply(esc);

const mcam = new THREE.Matrix4();
mcam.set(
    126.1253,
    211.557,
    -61.9818,
    844.3818,
    -3.2165,
    -48.4095,
    -238.9409,
    873.1383,
    -0.0576,
    0.062,
    -0.03,
    0.9841,
    -0.0574,
    0.0619,
    -0.0299,
    1.0
);
m.multiply(mcam);

console.log(m);

camera.matrixAutoUpdate = false;
camera.projectionMatrix = m;

console.log(camera.projectionMatrix);

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    wireframe: false
});

const cube2 = new THREE.Mesh(geometry, material);
cube2.position.set(2, 2, 2);
scene.add(cube2);

const light = new THREE.DirectionalLight(0xffffff, 1);

light.position.set(1, 1, 0);

scene.add(light);

renderer.render(scene, camera);
