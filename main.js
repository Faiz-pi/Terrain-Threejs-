import * as THREE from "three";
import { OrbitControls } from "https://unpkg.com/three@0.179.1/examples/jsm/controls/OrbitControls.js";

const canvas = document.getElementById("bg");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 10, 15);
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambient = new THREE.AmbientLight(
    0xffffff,
    0.3
);
scene.add(ambient);
const light = new THREE.DirectionalLight(
    0xffffff,
    1.5
);
light.position.set(30, 30, 0)
scene.add(light);

// MAIN LEARNING AREA-------------------------

const geometry = new THREE.PlaneGeometry(
    50,
    50,
    100,
    100
    
);
const material = new THREE.MeshStandardMaterial({
    color: 0x55aa55,
    wireframe: false
})
const terrain = new THREE.Mesh(geometry, material);
scene.add(terrain);
terrain.rotation.x = -Math.PI / 2;

const positions = geometry.attributes.position;

// MAIN LEARNING AREA-------------------------
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    const time = clock.getElapsedTime();
    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        //const height = Math.sin(x + time) + Math.cos(y + time);
        const height = Math.random() * 5;
        positions.setZ(i, height);
    }
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
    renderer.render(scene, camera);
}

animate();