import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements AfterViewInit {

  @ViewChild('canvas') canvasRef: ElementRef;

 private renderer: THREE.WebGLRenderer;
 private scene: THREE.Scene;
 private camera: THREE.Camera; 
 private controls: OrbitControls;
 private material: THREE.Material;
 private material2: THREE.Material; 
 private material3: THREE.Material; 
 private material4: THREE.Material; 
 private materialflor: THREE.Material;

 private get canvas(): HTMLCanvasElement{
  return this.canvasRef.nativeElement;
}

 ngAfterViewInit(): void {
   this.init();
   this.renderer.render(this.scene, this.camera);
 }

  init() {
    // this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.canvas });
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.setClearColor(0x889988);

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setClearColor(0x889988);


    // scene
    this.scene = new THREE.Scene();

    // camera
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(20, 20, 20);
    this.scene.add(this.camera); // required, since adding light as child of camera


    // controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = true;
    this.controls.enablePan = false;

    this.controls.addEventListener('change', () => {
      this.renderer.render(this.scene, this.camera);
    });
    // this.controls.maxPolarAngle = Math.PI / 2;

    // ambient
    var ambient = new THREE.AmbientLight(0x444444)
    this.scene.add(ambient);

    // light
    var light = new THREE.PointLight(0xffffff, 0.8);
    this.camera.add(light);

    // geometry
    var geometry = new THREE.BoxGeometry(4, 2, 2);

    // material
    var material1 = new THREE.MeshPhongMaterial({
        color: 'sandybrown'
    });

    // meshTable1
    var meshTable1 = new THREE.Mesh(geometry, material1);
    meshTable1.position.set(2, - 4, 6);
    this.scene.add(meshTable1);



    // geometry
    var geometry = new THREE.BoxGeometry(2, 2, 2);

    // material
    var material1 = new THREE.MeshPhongMaterial({
        color: 'gray'
    });

    // meshTable2
    var meshTable2 = new THREE.Mesh(geometry, material1);
    meshTable2.position.set(-2, - 4, - 6);
    this.scene.add(meshTable2);

    // geometry
    var geometry = new THREE.BoxGeometry(20.5, 10, 0.25);


    // let textureBlue = new THREE.TextureLoader().load('modules/room/textures/Blue_2_normal.png')
    // let textureCyan = new THREE.TextureLoader().load('modules/room/textures/Cyan_2_baseColor.jpeg')
    // let textureCyan5 = new THREE.TextureLoader().load('modules/room/textures/Cyan_5_baseColor.jpeg')
    // let textureCyan6 = new THREE.TextureLoader().load('modules/room/textures/Cyan_6_baseColor.jpeg')




    this.material = new THREE.MeshBasicMaterial({
       color: 0x00FFFF,
    });

    this.material2 = new THREE.MeshPhysicalMaterial({
        color: 0x00FFFF,
    });

    this.material3 = new THREE.MeshPhysicalMaterial({
        color: 0x00FFFF,
    });

    this.material4 = new THREE.MeshPhysicalMaterial({
        color: 0x00FFFF,
    });

    this.materialflor = new THREE.MeshPhysicalMaterial({
        color: 0x00FFFF,
    });

    // var onBeforeRender =  () => {

    //   var v = new THREE.Vector3();

    //   return (renderer: THREE.WebGLRenderer, scene: THREE.Scene, 
    //     camera: THREE.Camera, geometry: THREE.BoxGeometry, 
    //     material: THREE.Material, group: THREE.Group) => {

    //       // this is one way. adapt to your use case.
    //       if (v.subVectors(camera.position, this.position).dot(this.userData.normal) < 0) {

    //           geometry.setDrawRange(0, 0);

    //       }

    //   };

  // }();


    var mesh1 = new THREE.Mesh(geometry, this.material);
    mesh1.position.set(0, 0, 10);
    mesh1.rotation.set(0, 0, 0);

    this.scene.add(mesh1);
    mesh1.userData['normal'] = new THREE.Vector3(0, 0, - 1);

    // mesh
    var mesh2 = new THREE.Mesh(geometry, this.material2);
    mesh2.position.set(0, 0, - 10);
    mesh2.rotation.set(0, 0, 0);
    this.scene.add(mesh2);
    mesh2.userData['normal'] = new THREE.Vector3(0, 0, 1);
    // mesh2.onBeforeRender = onBeforeRender;
    // mesh2.onAfterRender = onAfterRender;


    // mesh
    var mesh3 = new THREE.Mesh(geometry, this.material3);
    mesh3.position.set(10, 0, 0);
    mesh3.rotation.set(0, - Math.PI / 2, 0);
    this.scene.add(mesh3);
    mesh3.userData['normal'] = new THREE.Vector3(- 1, 0, 0);
    // mesh3.onBeforeRender = onBeforeRender;
    // mesh3.onAfterRender = onAfterRender;


    // mesh
    var mesh4 = new THREE.Mesh(geometry, this.material4);
    mesh4.position.set(- 10, 0, 0);
    mesh4.rotation.set(0, Math.PI / 2, 0);
    this.scene.add(mesh4);
    mesh4.userData['normal'] = new THREE.Vector3(1, 0, 0);
    // mesh4.onBeforeRender = onBeforeRender;
    // mesh4.onAfterRender = onAfterRender;


    // geometry
    var geometry = new THREE.BoxGeometry(20.5, 20.5, 0.25);

    // mesh - floor
    var meshFlor = new THREE.Mesh(geometry, this.materialflor);

    meshFlor.position.set(0, - 5, 0);
    meshFlor.rotation.set(- Math.PI / 2, 0, 0);
    this.scene.add(meshFlor);
    meshFlor.userData['normal'] = new THREE.Vector3(0, 1, 0);
    // meshFlor.onBeforeRender = onBeforeRender;
    // meshFlor.onAfterRender = onAfterRender;
  }
}
