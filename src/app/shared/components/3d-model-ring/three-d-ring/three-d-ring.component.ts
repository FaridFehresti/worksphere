import { Component, OnInit, OnDestroy, ElementRef, HostListener } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-holographic-ring',
  templateUrl: './three-d-ring.component.html',
  standalone: true,
  styleUrls: ['./three-d-ring.component.scss'],
})
export class HolographicRingComponent implements OnInit, OnDestroy {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private lines: THREE.Line[] = [];
  private clock!: THREE.Clock;
  private isMouseDown = false;
  private targetRadius = 3; // Initial radius
  private currentRadius = 3; // Current radius for smooth transitions
  private spinSpeed = 0.1; // Initial spin speed
  private targetSpinSpeed = 0.005; // Target spin speed for smooth transitions

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

    this.camera = new THREE.PerspectiveCamera(400, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, -10, 7);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.el.nativeElement.appendChild(this.renderer.domElement);

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
      const material = new THREE.LineBasicMaterial({ color: new THREE.Color(`hsl(${(i / numLines) * 360}, 100%, 70%)`) });
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
    const delta = this.clock.getDelta();

    // Smoothly interpolate the radius and spin speed with easing
    this.currentRadius += (this.targetRadius - this.currentRadius) * 0.05; // Slower interpolation for smoother transition
    this.spinSpeed += (this.targetSpinSpeed - this.spinSpeed) * 0.05; // Slower interpolation for smoother transition

    // Update the ring's geometry and animation
    this.lines.forEach((line, i) => {
      const geometry = line.geometry as THREE.BufferGeometry;
      const points = geometry.attributes['position'].array as Float32Array;

      for (let j = 0; j <= 100; j++) {
        const angle = (j / 100) * Math.PI * 2;
        const angleOffset = (i / this.lines.length) * Math.PI * 2;
        const waveOffset = Math.sin(elapsed * 2 + angleOffset) * 0.02; // Wave-like animation

        const x = (this.currentRadius + waveOffset + 0.5 * Math.sin(angle * 2)) * Math.cos(angle + angleOffset);
        const y = (this.currentRadius + waveOffset + 0.5 * Math.sin(angle * 2)) * Math.sin(angle + angleOffset);
        const z = 0.5 * Math.cos(angle * 3);

        points[j * 3] = x;
        points[j * 3 + 1] = y;
        points[j * 3 + 2] = z;
      }

      geometry.attributes['position'].needsUpdate = true; // Update the geometry
      line.rotation.z = elapsed * this.spinSpeed ; // Apply spin speed
      line.rotation.x = Math.sin(elapsed * 0.2 + i * 0.1) * 0.3; // Wobble effect
    });

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  // Handle mouse events for interactivity
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.isMouseDown = true;
    this.targetRadius = 5; // Expand the ring further
    this.targetSpinSpeed = 0.3; // Increase spin speed moderately
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.isMouseDown = false;
    this.targetRadius = 3; // Return to original radius
    this.targetSpinSpeed = 0.1; // Return to original spin speed
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isMouseDown) {
      // Optional: Add additional interactivity based on mouse movement
    }
  }
}