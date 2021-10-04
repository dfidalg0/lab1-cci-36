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

renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    wireframe: false
});

const cube = new THREE.Mesh(geometry, material);

const light = new THREE.DirectionalLight(0xffffff, 1);

scene.add(cube, light);
camera.position.y = 3.5;
camera.position.x = 0.1;
camera.position.z = -5;
camera.rotateY(THREE.Math.degToRad(176));

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
