import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-holographic-background',
  templateUrl: './three-d-model.component.html',
  standalone: true,
  styleUrls: ['./three-d-model.component.css']
})
export class HolographicBackgroundComponent implements OnInit, OnDestroy {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private composer!: EffectComposer;
  private geometry!: THREE.BufferGeometry;
  private material!: THREE.MeshStandardMaterial;
  private wireframeMaterial!: THREE.MeshStandardMaterial;
  private mesh!: THREE.Mesh;
  private wireframeMesh!: THREE.Mesh;
  private clock!: THREE.Clock;
  private maxWaveAmplitude = 5;
  private waveSpeed = 0.7;
  private texture!: THREE.Texture;
  private textureLoader = new THREE.TextureLoader();
  private controls!: OrbitControls;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.initThreeJS();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initThreeJS(): void {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(1.99580658190663, -179.73965483323897, 11.703327370351154); // Adjusted position
    this.camera.lookAt(new THREE.Vector3(20, 100, 0));

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.el.nativeElement.appendChild(this.renderer.domElement);
 
    this.clock = new THREE.Clock();

    // Load Texture
    this.texture = this.textureLoader.load('/texture/texture.jpg');
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.repeat.set(4, 4); // Adjust for tiling
 
    this.createTriangularGround();
    this.addLighting();

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.4,
      0.2,
      0.6
    );
    this.composer.addPass(bloomPass);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // Smooth movement
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.maxDistance = 1000; // Limit zoom out
    this.controls.minDistance = 5; // Limit zoom in
  
    this.controls.addEventListener('change', () => {
      console.log(`Camera Position: x=${this.camera.position.x}, y=${this.camera.position.y}, z=${this.camera.position.z}`);
    });
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  private addLighting(): void {
    const directionalLight = new THREE.DirectionalLight(0x333333, 100);
    directionalLight.position.set(200, -300, 90);
    directionalLight.target.position.set(0, 0, 0);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
    this.scene.add(directionalLight.target);
    const ambientLight = new THREE.AmbientLight(0x404040, 0);
    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000);
    // this.scene.add(directionalLightHelper)
    this.scene.add(ambientLight);
  }

  private createTriangularGround(): void {
    const size = 500;
    const segments = 30;
    const vertices = [];
    const uvs = [];
    const indices = [];
  
    // Generate vertices and UVs
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        const x = (i / segments - 0.5) * size;
        const z = (j / segments - 0.5) * size;
        const y = 0;
  
        vertices.push(x, y, z);
        uvs.push(i / segments, j / segments); // Assign UV coordinates
      }
    }
  
    // Generate indices for triangles
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const a = i * (segments + 1) + j;
        const b = a + 1;
        const c = (i + 1) * (segments + 1) + j;
        const d = c + 1;
  
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }
  
    // Create geometry
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    this.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    this.geometry.setIndex(indices);
    this.geometry.computeVertexNormals();
  
    // Configure texture wrapping
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.repeat.set(4, 4); // Repeat texture 4 times
  
    // Material for the surface
    this.material = new THREE.MeshStandardMaterial({
      map: this.texture,
      roughness: 0.7,
      metalness: 1,
      side: THREE.DoubleSide,
      
      
    });
  
    // Material for the wireframe
    this.wireframeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0,
      wireframe: true,
      metalness: 0,
      side: THREE.DoubleSide,
    });
  
    // Create the main mesh
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true; // Enable shadow receiving
    this.mesh.castShadow = true;
  
    // Create the wireframe mesh
    this.wireframeMesh = new THREE.Mesh(this.geometry, this.wireframeMaterial);
    this.wireframeMesh.rotation.x = -Math.PI / 2;
    // this.wireframeMesh.receiveShadow = true;
    // this.wireframeMesh.castShadow = true;
  
    // Add meshes to the scene
    this.scene.add(this.mesh);
    this.scene.add(this.wireframeMesh);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
  
    const time = this.clock.getElapsedTime();
    const positions = (this.geometry.attributes['position'] as THREE.BufferAttribute).array;
  
    const size = 500; // Same as ground size
    const waveAmplitude = this.maxWaveAmplitude;
    const waveFrequency = 0.029; // Adjust for faster/slower waves
  
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];
  
      // Create a slight curvature to the surface
      const curveHeight = Math.sin((x * z) * 0.1011) * 3; // Small bump effect
  
      // Waves moving from edges towards the center
      const distanceFromEdge = Math.abs(x) + Math.abs(z); // Distance metric
      const waveEffect = waveAmplitude * Math.sin(distanceFromEdge * waveFrequency - time * this.waveSpeed);
  
      // Apply both curvature and wave effect
      positions[i + 1] = curveHeight + waveEffect;
    }
  
    (this.geometry.attributes['position'] as THREE.BufferAttribute).needsUpdate = true;
  
    this.composer.render();
  }
  
}
