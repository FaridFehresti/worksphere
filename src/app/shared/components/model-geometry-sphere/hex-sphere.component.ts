import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-hex-sphere',
  templateUrl: './hex-sphere.component.html',
  standalone: true,
  styleUrls: ['./hex-sphere.component.scss']
})
export class HexSphereComponent implements OnInit, OnDestroy {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private hexTiles: THREE.Mesh[] = [];
  private radius = 20; // Sphere radius

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.initThreeJS();
    this.createHexagonalSphere();
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
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10).normalize();
    this.scene.add(light);
    this.scene.add(new THREE.AmbientLight(0x404040, 1));

    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  private createHexagonalSphere(): void {
    const radius = this.radius;
    const geometry = new THREE.IcosahedronGeometry(radius, 1);
    const positions = geometry.getAttribute('position').array as Float32Array;
    const indices = geometry.index ? geometry.index.array : [];

    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide });

    const uniqueFaces: { [key: string]: THREE.Vector3[] } = {};

    // Extract face data
    for (let i = 0; i < indices.length; i += 3) {
      const a = indices[i] * 3;
      const b = indices[i + 1] * 3;
      const c = indices[i + 2] * 3;

      const vA = new THREE.Vector3(positions[a], positions[a + 1], positions[a + 2]);
      const vB = new THREE.Vector3(positions[b], positions[b + 1], positions[b + 2]);
      const vC = new THREE.Vector3(positions[c], positions[c + 1], positions[c + 2]);

      const key = [a, b, c].sort().join('-');
      if (!uniqueFaces[key]) {
        uniqueFaces[key] = [vA, vB, vC];
      }
    }

    // Create hexagons and pentagons
    Object.values(uniqueFaces).forEach((points) => {
      const center = new THREE.Vector3();
      points.forEach((v) => center.add(v));
      center.divideScalar(points.length).normalize().multiplyScalar(radius);

      const isPentagon = this.isPentagon(center);
      const shape = isPentagon ? this.createPentagonGeometry() : this.createHexagonGeometry();
      const mesh = new THREE.Mesh(shape, material);
      mesh.position.copy(center);

      // Rotate the tile to face outward
      const normal = center.clone().normalize();
      const quaternion = new THREE.Quaternion();
      quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      mesh.setRotationFromQuaternion(quaternion);

      this.scene.add(mesh);
      this.hexTiles.push(mesh);
    });
  }

  private isPentagon(position: THREE.Vector3): boolean {
    return Math.abs(position.z) > this.radius * 0.9; // Near poles
  }

  private createHexagonGeometry(): THREE.BufferGeometry {
    const shape = new THREE.Shape();
    const size = 3; // Adjust this size to make it visible
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      if (i === 0) shape.moveTo(Math.cos(angle) * size, Math.sin(angle) * size);
      else shape.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth: 0.5, bevelEnabled: false });
  }

  private createPentagonGeometry(): THREE.BufferGeometry {
    const shape = new THREE.Shape();
    const size = 3; // Adjust this size to make it visible
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      if (i === 0) shape.moveTo(Math.cos(angle) * size, Math.sin(angle) * size);
      else shape.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth: 0.5, bevelEnabled: false });
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
