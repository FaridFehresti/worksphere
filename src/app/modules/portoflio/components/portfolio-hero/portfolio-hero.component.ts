import { Component, ElementRef, AfterViewInit, ViewChild, NgZone } from '@angular/core';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-portfolio-hero',
  template: '<div #rendererContainer class="hero-container"></div>',
  styleUrls: ['./portfolio-hero.component.scss']
})
export class PortfolioHeroComponent implements AfterViewInit {
  @ViewChild('rendererContainer', { static: true }) container!: ElementRef;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private world!: CANNON.World;
  private blocks: { mesh: THREE.Mesh; body: CANNON.Body }[] = [];
  private pyramidBase = new THREE.Vector3(0, 0, 0);
  private blockSize = { width: 3, height: 1, depth: 3 };
  private pyramidHeight = 4;
  private physicsActive = false;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.initScene();
    this.initPhysicsWorld();
    this.createTriangleSurface();
    this.spawnBlocks();
    this.animate();
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x222222);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 15, 30);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.nativeElement.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    const light = new THREE.AmbientLight(0xffffff, 1.5);
    this.scene.add(light);
  }

  private initPhysicsWorld(): void {
    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.8, 0);
  }

  private createTriangleSurface(): void {
    const geometry = new THREE.PlaneGeometry(30, 30, 10, 10);
    geometry.rotateX(-Math.PI / 2);
    const material = new THREE.MeshStandardMaterial({ color: 0x444444, wireframe: true });
    const surface = new THREE.Mesh(geometry, material);
    this.scene.add(surface);

    // Physics ground
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 0 });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    this.world.addBody(groundBody);
  }

  private spawnBlocks(): void {
    let index = 0;
    const totalBlocks = (this.pyramidHeight * (this.pyramidHeight + 1)) / 2;
    const interval = setInterval(() => {
      if (index >= totalBlocks) {
        clearInterval(interval);
        setTimeout(() => this.activatePhysics(), 1000);
        return;
      }
      this.createBlock(index);
      index++;
    }, 20);
  }

  private createBlock(index: number): void {
    const layer = Math.floor((-1 + Math.sqrt(1 + 8 * index)) / 2);
    const layerSize = this.pyramidHeight - layer;
    const posInLayer = index - (layer * (layer + 1)) / 2;
    const x = (posInLayer % layerSize) * this.blockSize.width - (layerSize / 2) * this.blockSize.width;
    const z = Math.floor(posInLayer / layerSize) * this.blockSize.depth - (layerSize / 2) * this.blockSize.depth;
    const y = layer * this.blockSize.height;

    const geometry = new THREE.BoxGeometry(this.blockSize.width, this.blockSize.height, this.blockSize.depth);
    const material = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 10, z);
    this.scene.add(mesh);

    const body = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(new CANNON.Vec3(this.blockSize.width / 2, this.blockSize.height / 2, this.blockSize.depth / 2)),
      position: new CANNON.Vec3(x, y + 10, z),
    });

    this.world.addBody(body);
    this.blocks.push({ mesh, body });
  }

  private activatePhysics(): void {
    this.physicsActive = true;
  }

  private animate(): void {
    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        requestAnimationFrame(loop);
        this.world.step(1 / 60);
        this.blocks.forEach(({ mesh, body }) => {
          mesh.position.copy(body.position as any);
          mesh.quaternion.copy(body.quaternion as any);
        });
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      };
      loop();
    });
  }
}
