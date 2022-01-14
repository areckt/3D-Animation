import './style.css';
import * as BABYLON from 'babylonjs';
import Stats from 'stats-js';

const NUM_OF_SPHERES = 1000;
const NUM_OF_COLS = Math.ceil(Math.sqrt(NUM_OF_SPHERES));

let scene, camera, engine, spheres, stats;
let counter = 0;

function init() {
  // Canvas
  const canvas = document.querySelector('canvas.webgl');

  // Engine
  engine = new BABYLON.Engine(canvas, true);

  // Scene
  scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0.06, 0.07, 0.12);

  // Camera
  camera = new BABYLON.ArcRotateCamera(
    'camera',
    Math.PI / 2,
    Math.PI / 2,
    NUM_OF_COLS * 3,
    new BABYLON.Vector3.Zero(),
    scene
  );
  camera.wheelDeltaPercentage = 0.01;
  camera.panningSensibility = 300;
  camera.attachControl(canvas, true);

  // Light
  const pointLight = new BABYLON.PointLight(
    'pointLight',
    new BABYLON.Vector3(0, 0, NUM_OF_COLS + 5),
    scene
  );
  pointLight.intensity = 2;
  pointLight.diffuse = new BABYLON.Color3(1, 1, 1);
  pointLight.specular = new BABYLON.Color3(1, 1, 1);

  // Create the Spheres
  spheres = [];
  for (let i = 0; i < NUM_OF_SPHERES; i++) {
    let sphereSize = Math.random() * (0.8 - 0.5) + 0.5;
    let sphere = BABYLON.MeshBuilder.CreateSphere(
      's' + i,
      { diameter: sphereSize },
      scene
    );

    // Sphere Standard Material
    let sphereMaterial = new BABYLON.StandardMaterial('std' + i, scene);
    sphereMaterial.diffuseColor = new BABYLON.Color3(
      Math.random(),
      Math.random(),
      Math.random()
    );

    sphere.material = sphereMaterial;
    positionSphere(sphere);

    spheres.push(sphere);
  }

  function positionSphere(sphere) {
    sphere.position.x = BABYLON.Scalar.RandomRange(
      -NUM_OF_COLS / 2,
      NUM_OF_COLS / 2
    );
    sphere.position.y = BABYLON.Scalar.RandomRange(
      -NUM_OF_COLS / 2,
      NUM_OF_COLS / 2
    );
    sphere.position.z = BABYLON.Scalar.RandomRange(
      -NUM_OF_COLS / 2,
      NUM_OF_COLS / 2
    );
  }

  // Stats Monitor
  setTimeout(() => {
    stats = createStats();
    document.body.appendChild(stats.domElement);
  }, 2000);
}

function handleResize() {
  engine.resize();
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
  engine.runRenderLoop(function () {
    counter += 0.05;
    for (let i = 0; i < NUM_OF_SPHERES; i++) {
      spheres[i].position.x += 0.03 * Math.sin(counter + i);
      spheres[i].position.y += 0.03 * Math.cos(counter - i);
      spheres[i].position.z += 0.1 * Math.sin(counter + i);
    }
    scene.render();

    if (stats) stats.update();
  });
}

window.addEventListener('resize', handleResize);
init();
animate();
