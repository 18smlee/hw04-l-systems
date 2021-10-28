import {vec3, mat4} from 'gl-matrix';
import * as Stats from 'stats-js';
import * as ran from 'ranjs';
import * as DAT from 'dat-gui';
import Square from './geometry/Square';
import ScreenQuad from './geometry/ScreenQuad';
import OpenGLRenderer from './rendering/gl/OpenGLRenderer';
import Camera from './Camera';
import {setGL} from './globals';
import {readTextFile} from './globals';
import ShaderProgram, {Shader} from './rendering/gl/ShaderProgram';
import Mesh from './geometry/Mesh';
import Plant from './lsystem/Plant';

// Define an object with application parameters and button callbacks
// This will be referred to by dat.GUI's functions that add GUI elements.

// Procedural Controls
let prevIterations: number = 3.0;
let prevBranchThickness: number = 0.5;
let prevSeed: number = 1.0;

const controls = {
  iterations: 3,
  branchThickness: 0.5,
  seed: 1.0,
};

let square: Square;
let screenQuad: ScreenQuad;
let time: number = 0.0;

let plantCylinderOBJ: string = readTextFile('./src/geometry/plantCylinder.obj');
let plantCylinder: Mesh;

let leafOBJ: string = readTextFile('./src/geometry/leaf.obj');
let leaf: Mesh;

let potOBJ: string = readTextFile('./src/geometry/pot.obj');
let pot: Mesh;

let groundOBJ: string = readTextFile('./src/geometry/ground.obj');
let ground: Mesh;


function loadScene(seed:number, branchThickness: number) {
  square = new Square();
  square.create();
  screenQuad = new ScreenQuad();
  screenQuad.create();

  plantCylinder = new Mesh(plantCylinderOBJ, vec3.fromValues(0.0, 0.0, 0.0));
  plantCylinder.create();

  leaf = new Mesh(leafOBJ, vec3.fromValues(0.0, 0.0, 0.0));
  leaf.create();

  pot = new Mesh(potOBJ, vec3.fromValues(0.0, 0.0, 0.0));
  pot.create();

  ground = new Mesh(groundOBJ, vec3.fromValues(0.0, 0.0, 0.0));
  ground.create();

  // Create plant
  let plant = new Plant("TTTTTTTTX", controls.iterations, 30.0, seed, branchThickness);
  plant.create();

  // Set up instanced rendering data arrays for plant
  let num: number = plant.transformationMats.length;

  let colorsArray = [];
  let transform1Array = [];
  let transform2Array = [];
  let transform3Array = [];
  let transform4Array = [];
  for (let i = 0; i < num; i++) {
    let T = plant.transformationMats[i];
    transform1Array.push(T[0]);
    transform1Array.push(T[1]);
    transform1Array.push(T[2]);
    transform1Array.push(T[3]);

    transform2Array.push(T[4]);
    transform2Array.push(T[5]);
    transform2Array.push(T[6]);
    transform2Array.push(T[7]);

    transform3Array.push(T[8]);
    transform3Array.push(T[9]);
    transform3Array.push(T[10]);
    transform3Array.push(T[11]);

    transform4Array.push(T[12]);
    transform4Array.push(T[13]);
    transform4Array.push(T[14]);
    transform4Array.push(1);

    colorsArray.push(114.0 / 255.0);
    colorsArray.push(69.0 / 255.0);
    colorsArray.push(12.0 / 255.0);
    colorsArray.push(1.0);
  }

  let colors: Float32Array = new Float32Array(colorsArray);
  let transform1: Float32Array = new Float32Array(transform1Array);
  let transform2: Float32Array = new Float32Array(transform2Array);
  let transform3: Float32Array = new Float32Array(transform3Array);
  let transform4: Float32Array = new Float32Array(transform4Array);

  plantCylinder.setInstanceVBOs(colors, transform1, transform2, transform3, transform4);
  plantCylinder.setNumInstances(plant.transformationMats.length);

  // Set up instanced rendering data arrays for plant's leaves
  let leafNum: number = plant.leafTransformationMats.length;

  let leafColorsArray = [];
  let leafTransform1Array = [];
  let leafTransform2Array = [];
  let leafTransform3Array = [];
  let leafTransform4Array = [];

  for (let i = 0; i < leafNum; i++) {
    let T = plant.leafTransformationMats[i];
    leafTransform1Array.push(T[0]);
    leafTransform1Array.push(T[1]);
    leafTransform1Array.push(T[2]);
    leafTransform1Array.push(T[3]);

    leafTransform2Array.push(T[4]);
    leafTransform2Array.push(T[5]);
    leafTransform2Array.push(T[6]);
    leafTransform2Array.push(T[7]);

    leafTransform3Array.push(T[8]);
    leafTransform3Array.push(T[9]);
    leafTransform3Array.push(T[10]);
    leafTransform3Array.push(T[11]);

    leafTransform4Array.push(T[12]);
    leafTransform4Array.push(T[13]);
    leafTransform4Array.push(T[14]);
    leafTransform4Array.push(1);

    leafColorsArray.push(32.0 / 255.0);
    leafColorsArray.push(132.0 / 255.0);
    leafColorsArray.push(77.0 / 255.0);
    leafColorsArray.push(1.0);
  }

  let leafColors: Float32Array = new Float32Array(leafColorsArray);
  let leafTransform1: Float32Array = new Float32Array(leafTransform1Array);
  let leafTransform2: Float32Array = new Float32Array(leafTransform2Array);
  let leafTransform3: Float32Array = new Float32Array(leafTransform3Array);
  let leafTransform4: Float32Array = new Float32Array(leafTransform4Array);

  leaf.setInstanceVBOs(leafColors, leafTransform1, leafTransform2, leafTransform3, leafTransform4);
  leaf.setNumInstances(plant.leafTransformationMats.length);

  // Set up instanced rendering data arrays for pot
  let potNum: number = 1;

  let potColorsArray = [];
  let potTransform1Array = [];
  let potTransform2Array = [];
  let potTransform3Array = [];
  let potTransform4Array = [];
  for (let i = 0; i < potNum; i++) {
    let T = mat4.create();
    mat4.identity(T);
    potTransform1Array.push(T[0]);
    potTransform1Array.push(T[1]);
    potTransform1Array.push(T[2]);
    potTransform1Array.push(T[3]);

    potTransform2Array.push(T[4]);
    potTransform2Array.push(T[5]);
    potTransform2Array.push(T[6]);
    potTransform2Array.push(T[7]);

    potTransform3Array.push(T[8]);
    potTransform3Array.push(T[9]);
    potTransform3Array.push(T[10]);
    potTransform3Array.push(T[11]);

    potTransform4Array.push(T[12]);
    potTransform4Array.push(T[13]);
    potTransform4Array.push(T[14]);
    potTransform4Array.push(1);

    potColorsArray.push(161.0/255.0);
    potColorsArray.push(71.0/255.0);
    potColorsArray.push(39.0/255.0);
    potColorsArray.push(1.0);
  }

  let potColors: Float32Array = new Float32Array(potColorsArray);
  let potTransform1: Float32Array = new Float32Array(potTransform1Array);
  let potTransform2: Float32Array = new Float32Array(potTransform2Array);
  let potTransform3: Float32Array = new Float32Array(potTransform3Array);
  let potTransform4: Float32Array = new Float32Array(potTransform4Array);

  pot.setInstanceVBOs(potColors, potTransform1, potTransform2, potTransform3, potTransform4);
  pot.setNumInstances(potNum);

  // Set up instanced rendering data arrays for pot
  let groundNum: number = 1;

  let groundColorsArray = [];
  let groundTransform1Array = [];
  let groundTransform2Array = [];
  let groundTransform3Array = [];
  let groundTransform4Array = [];
  for (let i = 0; i < potNum; i++) {
    let T = mat4.create();
    mat4.identity(T);
    groundTransform1Array.push(T[0]);
    groundTransform1Array.push(T[1]);
    groundTransform1Array.push(T[2]);
    groundTransform1Array.push(T[3]);

    groundTransform2Array.push(T[4]);
    groundTransform2Array.push(T[5]);
    groundTransform2Array.push(T[6]);
    groundTransform2Array.push(T[7]);

    groundTransform3Array.push(T[8]);
    groundTransform3Array.push(T[9]);
    groundTransform3Array.push(T[10]);
    groundTransform3Array.push(T[11]);

    groundTransform4Array.push(T[12]);
    groundTransform4Array.push(T[13]);
    groundTransform4Array.push(T[14]);
    groundTransform4Array.push(1);

    groundColorsArray.push(230.0/255.0);
    groundColorsArray.push(172.0/255.0);
    groundColorsArray.push(95.0/255.0);
    groundColorsArray.push(1.0);
  }

  let groundColors: Float32Array = new Float32Array(groundColorsArray);
  let groundTransform1: Float32Array = new Float32Array(groundTransform1Array);
  let groundTransform2: Float32Array = new Float32Array(groundTransform2Array);
  let groundTransform3: Float32Array = new Float32Array(groundTransform3Array);
  let groundTransform4: Float32Array = new Float32Array(groundTransform4Array);

  ground.setInstanceVBOs(groundColors, groundTransform1, groundTransform2, groundTransform3, groundTransform4);
  ground.setNumInstances(groundNum);
}

function main() {
  // Initial display for framerate
  const stats = Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);

  // Add controls to the gui
  const gui = new DAT.GUI();
  
  gui.add(controls, 'iterations', 1, 6).step(1.0);
  gui.add(controls, 'branchThickness', 0.3, 0.8).step(0.02);
  gui.add(controls, 'seed', 1.0, 10.0).step(1.0);


  // get canvas and webgl context
  const canvas = <HTMLCanvasElement> document.getElementById('canvas');
  const gl = <WebGL2RenderingContext> canvas.getContext('webgl2');
  if (!gl) {
    alert('WebGL 2 not supported!');
  }
  // `setGL` is a function imported above which sets the value of `gl` in the `globals.ts` module.
  // Later, we can import `gl` from `globals.ts` to access it
  setGL(gl);

  // Initial call to load scene
  loadScene(controls.seed, controls.branchThickness);

  const camera = new Camera(vec3.fromValues(0, 10, 30), vec3.fromValues(0, 5, 0));

  const renderer = new OpenGLRenderer(canvas);
  renderer.setClearColor(0.1, 0.1, 0.1, 1);
  gl.enable(gl.DEPTH_TEST);

  const instancedShader = new ShaderProgram([
    new Shader(gl.VERTEX_SHADER, require('./shaders/instanced-vert.glsl')),
    new Shader(gl.FRAGMENT_SHADER, require('./shaders/instanced-frag.glsl')),
  ]);

  const flat = new ShaderProgram([
    new Shader(gl.VERTEX_SHADER, require('./shaders/flat-vert.glsl')),
    new Shader(gl.FRAGMENT_SHADER, require('./shaders/flat-frag.glsl')),
  ]);
  // This function will be called every frame
  function tick() {
    camera.update();
    stats.begin();
    instancedShader.setTime(time);
    flat.setTime(time++);
    gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.clear();

    if (controls.iterations != prevIterations) {
      loadScene(controls.seed, controls.branchThickness);
      prevIterations = controls.iterations;
    }

    if (controls.branchThickness != prevBranchThickness) {
      loadScene(controls.seed, controls.branchThickness);
      prevBranchThickness = controls.branchThickness;
    }

    if (controls.seed != prevSeed) {
      loadScene(controls.seed, controls.branchThickness);
      prevSeed = controls.seed;
    }

    renderer.render(camera, flat, [screenQuad]);
    renderer.render(camera, instancedShader, [
      plantCylinder,
      leaf,
      pot,
      ground,
    ]);
    stats.end();

    // Tell the browser to call `tick` again whenever it renders a new frame
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.setAspectRatio(window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
    flat.setDimensions(window.innerWidth, window.innerHeight);
  }, false);

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.setAspectRatio(window.innerWidth / window.innerHeight);
  camera.updateProjectionMatrix();
  flat.setDimensions(window.innerWidth, window.innerHeight);

  // Start the render loop
  tick();
}

main();
