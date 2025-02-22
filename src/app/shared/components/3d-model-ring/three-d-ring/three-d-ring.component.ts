import { Component, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';

@Component({
  selector: 'app-holographic-ring',
  templateUrl: './three-d-ring.component.html',
  standalone: true,
  styleUrls: ['./three-d-ring.component.scss'],
})
export class HolographicRingComponent implements OnInit, OnDestroy {
  @Input() expandRing: boolean = false; // Boolean input to control animation

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private lines: THREE.Line[] = [];
  private clock!: THREE.Clock;
  private targetRadius = 3; // Initial radius
  private currentRadius = 3; // Smooth transition value
  private spinSpeed = 1.1; // Normal spin speed
  private targetSpinSpeed = 0.005; // Smooth transition speed
  private pointLight!: THREE.PointLight; // Light for illuminating the scene
  private randomSpinAxis: THREE.Vector3 = new THREE.Vector3(1, 0, 0); // Initial random spin axis
  private randomSpinSpeed: number = 0.02; // Speed of random spin

  private originalPosition: THREE.Vector3 = new THREE.Vector3(0, -15, 10); // To restore original position
  private sphere!: THREE.Object3D; // Sphere with lines and shapes to be created when expanding

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.initThreeJS();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.renderer) {
      this.renderer.dispose();
    }
    window.removeEventListener('resize', this.onWindowResize);
  }

  private initThreeJS(): void {
    this.scene = new THREE.Scene();
  
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(400, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(-6, -10, 8.7);
  
    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.el.nativeElement.appendChild(this.renderer.domElement);
  
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light for visibility
    this.scene.add(ambientLight);
  
    // Add scene lighting
    this.pointLight = new THREE.PointLight(0xffffff, 10, 100); // White point light for floating effect
    this.pointLight.position.set(0, 0, 10);
    this.scene.add(this.pointLight);
  
    // Set up controls
    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  
    this.createHolographicRing();
  }

  private createHolographicRing(): void {
    const numLines = 60;
    const segments = 100;

    for (let i = 0; i < numLines; i++) {
      const points: THREE.Vector3[] = [];
      const angleOffset = (i / numLines) * Math.PI * 2;

      for (let j = 0; j <= segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        const x = (this.currentRadius + 0.5 * Math.sin(angle * 2)) * Math.cos(angle + angleOffset);
        const y = (this.currentRadius + 0.5 * Math.sin(angle * 2)) * Math.sin(angle + angleOffset);
        const z = 0.5 * Math.cos(angle * 3);
        points.push(new THREE.Vector3(x, y, z));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const colors = new Float32Array(points.length * 3).fill(0.1); // Dark lines with slight ambient light
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const material = new THREE.MeshBasicMaterial({ vertexColors: true });
      const line = new THREE.Line(geometry, material);
      this.scene.add(line);
      this.lines.push(line);
    }
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    const elapsed = this.clock.getElapsedTime();

    // Adjust the target values based on expandRing input
    if (this.expandRing) {
      this.targetRadius = 5;
      this.targetSpinSpeed = 0.1;
      // Set random spin direction when expandRing is true
      if (Math.random() < 0.01) {
        this.randomSpinAxis.set(Math.random(), Math.random(), Math.random()).normalize();
      }
      
      if (!this.sphere) {
        this.createSphere(); // Create sphere when expanding
      }
    } else {
      this.targetRadius = 3;
      this.targetSpinSpeed = 0.1;
      if (this.sphere) {
        this.sphere.scale.set(1, 1, 1); // Shrink sphere back to original size
      }
    }

    // Smoothly interpolate the radius and spin speed
    const easeFactor = this.expandRing ? 0.05 : 0.02;
    this.currentRadius += (this.targetRadius - this.currentRadius) * easeFactor;
    this.spinSpeed += (this.targetSpinSpeed - this.spinSpeed) * easeFactor;

    // Update the ring's animation
    this.lines.forEach((line, i) => {
      const geometry = line.geometry as THREE.BufferGeometry;
      const points = geometry.attributes['position'].array as Float32Array;

      // Add a white light effect moving along the line
      for (let j = 0; j <= 100; j++) {
        const angle = (j / 100) * Math.PI * 2;
        const angleOffset = (i / this.lines.length) * Math.PI * 2;
        const waveOffset = Math.sin(elapsed * 2 + angleOffset) * 0.02;

        const x = (this.currentRadius + waveOffset + 0.5 * Math.sin(angle * 2)) * Math.cos(angle + angleOffset);
        const y = (this.currentRadius + waveOffset + 0.5 * Math.sin(angle * 2)) * Math.sin(angle + angleOffset);
        const z = 0.5 * Math.cos(angle * 3);

        points[j * 3] = x;
        points[j * 3 + 1] = y;
        points[j * 3 + 2] = z;

        // Moving white light effect
        const lightPosition = (elapsed * 5 + j / 5) % 100;
        const intensity = Math.exp(-Math.pow(j - lightPosition, 2) / 50); // Smooth glowing effect
        const colorValue = Math.min(1, intensity); // Ensure it doesn’t exceed white

        (geometry.attributes['color'].array as Float32Array)[j * 3] = colorValue;
        (geometry.attributes['color'].array as Float32Array)[j * 3 + 1] = colorValue;
        (geometry.attributes['color'].array as Float32Array)[j * 3 + 2] = colorValue;
      }

      geometry.attributes['position'].needsUpdate = true;
      geometry.attributes['color'].needsUpdate = true;
      line.rotation.z = elapsed * this.spinSpeed;
      line.rotation.x = Math.sin(elapsed * 0.2 + i * 0.1) * 0.3;
    });

    // Update light position for continuous effect
    this.pointLight.position.x = Math.sin(elapsed * 0.1) * 5;
    this.pointLight.position.y = Math.cos(elapsed * 0.1) * 5;

    // Rotate the whole model (scene) randomly
    this.scene.rotation.x += this.randomSpinSpeed * this.randomSpinAxis.x;
    this.scene.rotation.y += this.randomSpinSpeed * this.randomSpinAxis.y;
    this.scene.rotation.z += this.randomSpinSpeed * this.randomSpinAxis.z;

    // Reset camera position after expansion
    if (!this.expandRing) {
      this.camera.position.lerp(this.originalPosition, 0.005); // Smoothly return to original position
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private createSphere(): void {
    const radius = 1;
    const segments = 30;
    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.8 });

    // Create lines around each triangle of the sphere geometry
    const wireframe = new THREE.WireframeGeometry(geometry);
    const lines = new THREE.LineSegments(wireframe, material);

    // Make the lines sparkle by adjusting their opacity based on time
    lines.material.opacity = 0.5 + Math.sin(this.clock.getElapsedTime() * 10) * 0.5;

    this.sphere = new THREE.Object3D();
    this.sphere.add(lines);
    this.scene.add(this.sphere);
  }
}
