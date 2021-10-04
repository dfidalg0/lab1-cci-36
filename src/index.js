import * as THREE from 'three';

const canvas = document.querySelector('canvas');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
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
    camera.position.x = 0.18 * window.innerWidth / BASE_WIDTH;
    // Correção da imperfeição da rotação da fotografia
    camera.rotation.y = Math.PI - Math.asin(baseSin * camera.aspect / BASE_ASPECT);
    // Atualização da matriz de projeção
    camera.updateProjectionMatrix();
}

setView();

window.addEventListener('resize', setView);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    wireframe: false
});

const cube = new THREE.Mesh(geometry, material);

const light = new THREE.DirectionalLight(0xffffff, 1);

scene.add(cube, light);

if (import.meta.env.DEV) {
    const axes = new THREE.AxesHelper(2);
    const grid = new THREE.GridHelper(5, 10);

    scene.add(axes, grid);
}

function animate() {
    requestAnimationFrame(animate);

    cube.position.z += 0.2;

    if (cube.position.z >= 110) {
        cube.position.z = -1;
    }

    renderer.render(scene, camera);
}

animate();
