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
//m.multiply(rot);

//m.set(1, 0, 0, -0.7, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

const mcam = new THREE.Matrix4();
mcam.set(
    1.25739582e2,
    2.11867494e2,
    -6.20730557e1,
    8.44056055e2,
    -3.30132837,
    -4.8253344e1,
    -2.3892796e2,
    8.72524733e2,
    -5.76879082e-2,
    6.22131521e-2,
    -2.99223647e-2,
    1.0,
    0,
    0,
    0,
    1
);
m.multiply(mcam);

console.log(m);

camera.matrixAutoUpdate = false;
camera.projectionMatrix = m;
//camera.projectionMatrix.elements[4] = -0.67;
//camera.projectionMatrix.elements[5] = 6.8;
//camera.projectionMatrix.elements[6] = 0.5;

console.log(camera.projectionMatrix);
//console.log(camera.projectionMatrix);
//camera.updateProjectionMatrix();
const geometry = new THREE.BoxGeometry(20, 20, 0);
const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    wireframe: false
});

const cube = new THREE.Mesh(geometry, material);

const cube2 = new THREE.Mesh(geometry, material);
cube2.position.set(10, 10, 0);
scene.add(cube2);

const cube3 = new THREE.Mesh(geometry, material);
cube3.position.set(1920, 1080, 0);
scene.add(cube3);

const light = new THREE.DirectionalLight(0xffffff, 1);

light.position.set(0, 0, 10);

scene.add(cube);
scene.add(light);
camera.position.z = 5;

let xDir = +1;
let yDir = +1;

const getXMax = () => 3 * camera.aspect;
const getYMax = () => 3;

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    cube.position.x += xDir * 0.05;
    cube.position.y += yDir * 0.03;

    const { x, y } = cube.position;

    const xMax = getXMax();
    const yMax = getYMax();

    if (x >= xMax || x <= -xMax) {
        xDir *= -1;
    }

    if (y >= yMax || y <= -yMax) {
        yDir *= -1;
    }

    renderer.render(scene, camera);
}

animate();
