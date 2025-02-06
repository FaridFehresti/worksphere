import { Component, OnInit, HostListener } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

@Component({
  selector: 'app-three-d-model',
  templateUrl: './three-d-model.component.html',
  styleUrls: ['./three-d-model.component.scss']
})
export class ThreeDModelComponent implements OnInit {
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private controls!: OrbitControls;
  private model: THREE.Object3D | null = null;
  modelRotation: number = 0;

  constructor() { }

  ngOnInit() {
    this.initThreeJS();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  initThreeJS() {
    const container = document.getElementById('container')!;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Initial camera position
    this.camera.position.set(0, 0, 0); // Assuming head

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.domElement.className = 'model';
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = '-21%';
    this.renderer.domElement.style.left = '-87%';

    // Set the background to transparent

    container.appendChild(this.renderer.domElement);

    const loader = new GLTFLoader();
    loader.load('/models/mask.glb', (gltf) => {
      this.model = gltf.scene;
      
      // Position the model properly
      this.model.position.set(0, 0, 0); //change model position

      // Add model to the scene
      this.scene.add(this.model);

      // Add a Box3Helper to visualize the bounding box
      const box = new THREE.Box3().setFromObject(this.model);
      const boxHelper = new THREE.Box3Helper(box, 0xff0000);

      // Adjust the camera position based on the bounding box size
      const boxSize = new THREE.Vector3();
      box.getSize(boxSize);
      const maxDim = Math.max(boxSize.x, boxSize.y, boxSize.z);
      const fov = this.camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 * Math.tan(fov * 2));
      cameraZ *= 1.5; // Add some distance to ensure the model fits well
      this.camera.position.z = 600.8 ; // Increase the z position to move the camera further back
      this.camera.position.y = 191.7 ; // Move the camera up
      this.camera.position.x = -1.76 ; // Move the camera right
      // Update the controls' target to ensure rotation around the model's center
      this.controls.target.copy(box.getCenter(new THREE.Vector3()));
      this.controls.update();

      this.animate();
    });


    // Adding a directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.position.set(5, 5, 5).normalize();
    this.scene.add(directionalLight);

    // Adding an ambient light
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    this.scene.add(ambientLight);

    // Initialize OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.25;
    this.controls.maxPolarAngle = Math.PI;
    this.controls.screenSpacePanning = false;
    this.controls.enableZoom = false; // Disable zooming
    this.controls.enablePan = false; // Disable panning
    this.controls.maxPolarAngle = Math.PI; //rotate freely
    this.controls.update();
  }

  animate() {

    requestAnimationFrame(() => this.animate());

    // Update controls
    this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    //slowly rotate
    this.modelRotation = 0.001;
    this.model?.rotateY(this.modelRotation);
    // Render the scene
    this.renderer.render(this.scene, this.camera);

  }
}
