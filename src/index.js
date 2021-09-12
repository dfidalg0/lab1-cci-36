import './style.css';
import * as THREE from 'three';

const canvas = document.querySelector('canvas');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight
);

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: false,
    antialias: false
});

renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    wireframe: false
});

const cube = new THREE.Mesh(geometry, material);

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
