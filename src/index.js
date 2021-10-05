import * as THREE from 'three';
import * as instructions from './instructions';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
const baseSin = Math.sin(THREE.Math.degToRad(4.2));

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
        Math.PI - Math.asin((baseSin * camera.aspect) / BASE_ASPECT);
    // Correção do ângulo de projeção
    // NÃO há nenhuma garantia de que isso funcione em telas diferentes
    camera.rotation.x = THREE.Math.degToRad(-1.3);
    // Atualização da matriz de projeção
    camera.updateProjectionMatrix();
}

setView();

window.addEventListener('resize', setView);

// criação do grupo que será futuramente um carrinho
const car = new THREE.Group();
const material = new THREE.MeshPhongMaterial({
    color: 0x3366ff,
    wireframe: false
});
const material2 = new THREE.MeshPhongMaterial({
    color: 0x00b300,
    wireframe: false
});

// rodas
const wheelGeometry = new THREE.TorusGeometry(1 / 7, 1 / 6, 16, 100);
const wheel = new THREE.Mesh(wheelGeometry, material2);
wheel.rotateY((90 * Math.PI) / 180);
wheel.translateY(1 / 7 + 1 / 6);

const wheelPositions = [
    [1 - 1 / 3, -0.55 + 1 / 6],
    [1 - 1 / 3, 0.55 - 1 / 6],
    [-1 + 1 / 3, -0.55 + 1 / 6],
    [-1 + 1 / 3, 0.55 - 1 / 6]
];

for (let i = 0; i < wheelPositions.length; i++) {
    const m = wheel.clone();
    m.translateX(wheelPositions[i][0]);
    m.translateZ(wheelPositions[i][1]);
    car.add(m);
}

// parte superior do carro (paralelepípedo)
const upGeometry = new THREE.BoxGeometry(1, 0.4, 0.6);
const cubeUp = new THREE.Mesh(upGeometry, material);
cubeUp.position.y = 1 / 6 + 1 / 7 + 0.8;
cubeUp.position.z = -0.3;
car.add(cubeUp);

// parte inferior do carro (paralelepípedo)
const downGeometry = new THREE.BoxGeometry(1, 0.6, 2);
const cubeDown = new THREE.Mesh(downGeometry, material);
cubeDown.position.y = 1 / 6 + 1 / 7 + 0.3;
car.add(cubeDown);

// estrutura auxiliar (1/4 de cilindro) para o carro
// ficar com arestas mais arredondadas
const cilynderGeometry = new THREE.CylinderGeometry(
    0.4,
    0.4,
    1,
    32,
    32,
    false,
    0,
    Math.PI / 2
);
const auxGeo = new THREE.Mesh(cilynderGeometry, material);
auxGeo.rotateZ(Math.PI / 2);
auxGeo.translateX(1 / 6 + 1 / 7 + 0.6);
car.add(auxGeo);

const auxGeo2 = auxGeo.clone();
auxGeo2.rotateX(Math.PI);
auxGeo2.translateZ(0.6);
car.add(auxGeo2);

const light = new THREE.PointLight(0xffb3ec, 15);
light.position.set(0,40,120);
const ambientlight = new THREE.AmbientLight(0xffb3ec, 0.25);

scene.add(car, light,ambientlight);

let toggleOn = true;

const axes = new THREE.AxesHelper(2);
const grid = new THREE.GridHelper(9.5, 10);
const lighthelper = new THREE.PointLightHelper(light);
//const controls = new OrbitControls(camera, renderer.domElement);


const movements = {
    x: 0,
    z: 0
};

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;

    switch (e.key) {
        case 't':
        case 'T':
            instructions.toggle();
            toggleOn = !toggleOn;
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

    if (toggleOn) {
        scene.add(axes, grid, lighthelper);
    }
    else{
        scene.remove(axes, grid, lighthelper);
    }

    renderer.render(scene, camera);
}

animate();
