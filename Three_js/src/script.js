import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'stats-js';

const NUM_OF_SPHERES = 1000;
const NUM_OF_COLS = Math.ceil(Math.sqrt(NUM_OF_SPHERES));

let scene, camera, renderer, spheres, controls, stats;
let counter = 0;

function init() {
  // Canvas
  const canvas = document.querySelector('canvas.webgl');

  // Scene
  scene = new THREE.Scene();

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Camera
  camera = new THREE.PerspectiveCamera(
    24,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = NUM_OF_COLS * 4;

  // Camera Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.update();

  // Light
  const colorLight = new THREE.Color('hsl(70, 100%, 100%)');
  const light = new THREE.PointLight(colorLight, 2);
  light.position.set(0, 0, NUM_OF_COLS + 5);
  scene.add(light);

  // Create the Spheres
  spheres = [];
  for (let i = 0; i < NUM_OF_SPHERES; i++) {
    let sphereColor = new THREE.Color(
      `rgb(${Math.round(Math.random() * 256)}, ${Math.round(
        Math.random() * 256
      )}, ${Math.round(Math.random() * 256)})`
    );
    let sphereMaterial = new THREE.MeshPhongMaterial({
      color: sphereColor,
      shininess: 80,
    });
    let sphereSize = Math.random() * (0.5 - 0.2) + 0.2;
    let sphereGeometry = new THREE.SphereGeometry(sphereSize, 32, 16);
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    positionSphere(sphere);
    spheres.push(sphere);
  }
  // Add the Spheres to the scene
  for (let i = 0; i < NUM_OF_SPHERES; i++) {
    scene.add(spheres[i]);
  }

  // Stats Monitor
  setTimeout(() => {
    stats = createStats();
    document.body.appendChild(stats.domElement);
  }, 2000);
}

function positionSphere(sphere) {
  sphere.position.set(
    Math.random() * NUM_OF_COLS - NUM_OF_COLS / 2,
    Math.random() * NUM_OF_COLS - NUM_OF_COLS / 2,
    Math.random() * NUM_OF_COLS - NUM_OF_COLS / 2
  );
}

function handleResize() {
  const { innerWidth, innerHeight } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}

function createStats() {
  var stats = new Stats();
  stats.setMode(0);

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0';
  stats.domElement.style.top = '250px';

  return stats;
}

function animate() {
  requestAnimationFrame(animate);

  counter += 0.05;
  for (let i = 0; i < NUM_OF_SPHERES; i++) {
    spheres[i].position.x += 0.03 * Math.sin(counter + i);
    spheres[i].position.y += 0.03 * Math.cos(counter - i);
    spheres[i].position.z += 0.1 * Math.sin(counter + i);
  }
  controls.update();
  renderer.render(scene, camera);

  if (stats) stats.update();
}

window.addEventListener('resize', handleResize);
init();
animate();
