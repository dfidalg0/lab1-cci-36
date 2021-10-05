import * as THREE from 'three';
import * as instructions from './instructions';
import car from './car';

const canvas = document.querySelector('canvas');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight
);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
    alpha: true
});

const BASE_WIDTH = 1920;
const BASE_HEIGHT = 948;
const BASE_ASPECT = BASE_WIDTH / BASE_HEIGHT;

// Seno do ângulo de inclinação da pintura amarela na fotografia estimado para
// o aspecto 1920:948.
const BASE_SIN = Math.sin(THREE.Math.degToRad(4.2));

function setView() {
    // Definição do tamanho da vista
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    // Ajustes na posição da câmera
    camera.position.y = 3.5;
    camera.position.z = -5;
    // Correção na imperfeição do centro da fotografia
    camera.position.x = (0.18 * window.innerWidth) / BASE_WIDTH;
    // Correção da imperfeição da rotação da fotografia
    camera.rotation.y =
        Math.PI - Math.asin((BASE_SIN * camera.aspect) / BASE_ASPECT);
    // Correção do ângulo de projeção
    // NÃO há nenhuma garantia de que isso funcione em telas diferentes
    camera.rotation.x = THREE.Math.degToRad(-1.3);
    // Atualização da matriz de projeção
    camera.updateProjectionMatrix();
}

setView();

window.addEventListener('resize', setView);

const light = new THREE.PointLight(0xffb3ec, 15);
const ambientlight = new THREE.AmbientLight(0xffb3ec, 0.25);

light.position.set(0,40,120);

scene.add(light, ambientlight);

const helpers = [
    new THREE.AxesHelper(2),
    new THREE.GridHelper(9.5, 10),
    new THREE.PointLightHelper(light),
];

const movements = {
    x: 0,
    z: 0
};

let showUI = true;
let showCar = true;

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;

    switch (e.key) {
        case 't':
        case 'T':
            instructions.toggle();
            showUI = !showUI;
            break;
        case 'c':
        case 'C':
            showCar = !showCar;
            break;
        case 'w':
        case 'W':
        case 'ArrowUp':
            movements.z = +0.2;
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            movements.z = -0.2;
            break;
        case 'a':
        case 'A':
        case 'ArrowLeft':
            movements.x = +0.05;
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            movements.x = -0.05;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.repeat) return;

    switch (e.key) {
        case 'w':
        case 'W':
        case 's':
        case 'S':
        case 'ArrowUp':
        case 'ArrowDown':
            movements.z = 0;
            break;
        case 'a':
        case 'A':
        case 'd':
        case 'D':
        case 'ArrowLeft':
        case 'ArrowRight':
            movements.x = 0;
            break;
    }
});

const infinity = 235;

function animate() {
    requestAnimationFrame(animate);

    for (const [dir, inc] of Object.entries(movements)) {
        car.position[dir] += inc;
    }

    if (car.position.z > infinity) {
        car.position.z = -1;
    }
    else if (car.position.z < -1) {
        car.position.z = infinity;
    }

    if (showUI) {
        scene.add(...helpers);
    }
    else{
        scene.remove(...helpers);
    }

    if (showCar) {
        scene.add(car);
    }
    else{
        scene.remove(car);
    }

    renderer.render(scene, camera);
}

animate();
