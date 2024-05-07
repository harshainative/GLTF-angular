import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'scene-object',
  templateUrl: './scene-object.component.html',
  styleUrl: './scene-object.component.scss'
})
export class SceneObjectComponent implements AfterViewInit {

  @ViewChild('canvas') canvasRef: ElementRef;

  cameraZ: number = 400;
  fov: number = 1;
  nearClippingPlane: number = 1;
  farClippingPlane: number = 1000;

  private camera: THREE.PerspectiveCamera;
  private get canvas(): HTMLCanvasElement{
    return this.canvasRef.nativeElement;
  }
  // private geometry = new THREE.BoxGeometry(1, 1, 1);
  private geometry: THREE.BufferGeometry;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  // private material = new THREE.MeshBasicMaterial({color: 0xFF8001});
  // private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  private cube: THREE.Mesh;
  private controls: OrbitControls;

  ngAfterViewInit(): void {
    this.createScene();
    this.renderScene();
  }

  private createScene(){
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array([
      // front
      -1, 1, 1, // 0
      -1, -1, 1, // 1
      1, 1, 1, // 2
      1, -1, 1, // 3
      // right
      1, 1, 1, // 4
      1, -1, 1, // 5
      1, 1, -1, // 6
      1, -1, -1, // 7
      // back
      1, 1, -1, // 8
      1, -1, -1, // 9
      -1, 1, -1, // 10
      -1, -1, -1, // 11
      // left
      -1, 1, -1, // 12
      -1, -1, -1, // 13
      -1, 1, 1, // 14
      -1, -1, 1, // 15
      // top
      -1, 1, -1, // 16
      -1, 1, 1, // 17
      1, 1, -1, // 18
      1, 1, 1, // 19
      // bottom
      -1, -1, 1, // 20
      -1, -1, -1, // 21
      1, -1, 1, // 22
      1, -1, -1 // 23
    ]), 3));
    this.geometry.setAttribute("normal", new THREE.BufferAttribute(new Float32Array([
      // front
      0, 0, 1, // 0
      0, 0, 1, // 1
      0, 0, 1, // 2
      0, 0, 1, // 3
      // right
      1, 0, 0, // 4
      1, 0, 0, // 5
      1, 0, 0, // 6
      1, 0, 0, // 7
      // back
      0, 0, -1, // 8
      0, 0, -1, // 9
      0, 0, -1, // 10
      0, 0, -1, // 11
      // left
      -1, 0, 0, // 12
      -1, 0, 0, // 13
      -1, 0, 0, // 14
      -1, 0, 0, // 15
      // top
      0, 1, 0, // 16
      0, 1, 0, // 17
      0, 1, 0, // 18
      0, 1, 0, // 19
      // bottom
      0, -1, 0, // 20
      0, -1, 0, // 21
      0, -1, 0, // 22
      0, -1, 0 // 23
    ]), 3));
    this.geometry.setIndex(new THREE.BufferAttribute(new Uint32Array([
      // front 0
      0, 1, 2,
      3, 2, 1,
      // right 6
      4, 5, 6,
      7, 6, 5,
      // back 12
      8, 9, 10,
      11, 10, 9,
      // left 18
      12, 13, 14,
      15, 14, 13,
      // top 24
      16, 17, 18,
      19, 18, 17,
      // bottom 30
      20, 21, 22,
      23, 22, 21
    ]), 1));

    this.geometry.clearGroups();
    // start, count, material index
    this.geometry.addGroup(0, 6, 0);
    this.geometry.addGroup(6, 6, 1);
    this.geometry.addGroup(12, 6, 2);
    this.geometry.addGroup(18, 6, 3);
    this.geometry.addGroup(24, 6, 4);
    this.geometry.addGroup(30, 6, 5);

    var materials = [
      new THREE.MeshBasicMaterial({ color: "red" }),
      new THREE.MeshBasicMaterial({ color: "green" }),
      new THREE.MeshBasicMaterial({ color: "blue" }),
      new THREE.MeshBasicMaterial({ color: "cyan" }),
      new THREE.MeshBasicMaterial({ color: "magenta" }),
      new THREE.MeshBasicMaterial({ color: "yellow" })
    ];

    this.cube = new THREE.Mesh(this.geometry, materials);
    this.cube.scale.set(1, 1, 1);

    this.scene.add(this.cube);

    // this.scene.add(this.cube);
    const aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(this.fov, aspectRatio, this.nearClippingPlane, this.farClippingPlane);
    // this.camera.position.z = this.cameraZ;
    // this.camera.position.set(0, 0, 0);
    this.camera.position.set(0.5 ,0.5, 0.5);


  }

  private renderScene(){
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    // Initialize OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.target.set();
    this.controls.addEventListener('change', () => {
      this.renderer.render(this.scene, this.camera);
    });
    this.controls.enableZoom = true
    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }

  private getAspectRatio(){
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }




}
