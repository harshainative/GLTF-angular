import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min';

@Component({
  selector: 'model-viewer',
  templateUrl: './model-viewer.component.html',
  styleUrl: './model-viewer.component.scss'
})
export class ModelViewerComponent implements AfterViewInit {

  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;
  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public renderer!: any;
  public controls!: OrbitControls;
  public loader: GLTFLoader;
  private outlinePass: any;
  visibleEdgeColor: any;
  hiddenEdgeColor: any;


  params = {
    edgeStrength: 3.0,
    edgeGlow: 0.0,
    edgeThickness: 1.0,
    pulsePeriod: 0,
    rotate: false,
    usePatternTexture: false
  };

  constructor(){
    this.loader = new GLTFLoader();
    this.loader.setCrossOrigin('no-cors');

    // // Init gui

		// 	const gui = new GUI( { width: 280 } );

		// 	gui.add( this.params, 'edgeStrength', 0.01, 10 ).onChange(  ( value ) => {

		// 		this.outlinePass.edgeStrength = Number( value );

		// 	} );

		// 	gui.add( this.params, 'edgeGlow', 0.0, 1 ).onChange( ( value ) => {

		// 		this.outlinePass.edgeGlow = Number( value );

		// 	} );

		// 	gui.add( this.params, 'edgeThickness', 1, 4 ).onChange( ( value ) => {

		// 		this.outlinePass.edgeThickness = Number( value );

		// 	} );

		// 	gui.add( this.params, 'pulsePeriod', 0.0, 5 ).onChange( ( value ) => {

		// 		this.outlinePass.pulsePeriod = Number( value );

		// 	} );

		// 	gui.add( this.params, 'rotate' );

		// 	gui.add( this.params, 'usePatternTexture' ).onChange( ( value ) => {

		// 		this.outlinePass.usePatternTexture = value;

		// 	} );

		// 	let conf:any = {
		// 		visibleEdgeColor :'#ffffff',
		// 		hiddenEdgeColor: '#190a05',
		// 	};

		// 	gui.addColor( conf, 'visibleEdgeColor' ).onChange( ( value ) => {

		// 		this.outlinePass.visibleEdgeColor.set( value );

		// 	} );

		// 	gui.addColor( conf, 'hiddenEdgeColor' ).onChange( ( value ) => {

		// 		this.outlinePass.hiddenEdgeColor.set( value );

		// 	} );

  }

  ngAfterViewInit(): void {

    this.initThree();

  }


  initThree() {
    // Initialize scene
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    // // Initialize camera
    this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 10, 2000 );
    // this.camera.position.set( - 1.8, 1.5, 2.7 );
    // this.camera.position.z = 10;
    // this.camera.position.set(-1.8, 0.6, 2.7);

    // // Initialize renderer
    // this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.rendererContainer?.nativeElement.appendChild(this.renderer.domElement);

    // Initialize OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.target.set();
    this.controls.addEventListener('change', () => {
      this.renderer.render(this.scene, this.camera);
    });
    this.controls.enableZoom = true
    this.controls.update();


    // Load 3D model
    // this.loader.load('../../assets/the_great_drawing_room/scene.gltf', async (gltf) => {
      // this.loader.load('../../assets/cozy_modern_living_room/scene.gltf', async (gltf) => {
      this.loader.load('https://sketchfab.com/3d-models/white-modern-living-room-afb8cb0cbee1488caf61471ef14041e9/scene.gltf', async (gltf) => {
      console.log('gltf: ', gltf);
      const model = gltf.scene;

      // let bbox = new THREE.Box3().setFromObject(gltf.scene);
      // let measure = new THREE.Vector3();
      // let size = bbox.getSize(measure);
      // console.log('size: ', size);

      // this.camera.position.set(size.x/2, size.y/2, size.z/2);

      // this.camera.lookAt(model.position);

      gltf.scene.traverse((child) => {
        if(child instanceof THREE.Mesh){
          console.log('mesh: ', child);

          // child.geometry.center();
          // child.geometry.computeBoundingSphere();

        }
      })


      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      model.position.x += (model.position.x - center.x);
      model.position.y += (model.position.y - center.y);
      model.position.z += (model.position.z - center.z);
      this.controls.maxDistance = size * 10;
      this.camera.position.copy(center);
      this.camera.position.x += size / 2.0;
      this.camera.position.y += size / 5.0;
      this.camera.position.z += size / 2.0;
      this.camera.near = size / 100;
      this.camera.far = size * 100;
      this.camera.updateProjectionMatrix();
      this.camera.lookAt(center);

      console.log('position: ', this.camera.position);
      console.log('near: ', this.camera.near);
      console.log('far: ', this.camera.far);
      console.log('center: ', center);



      await this.renderer.compileAsync(model, this.camera, this.scene);
      this.scene.add(model);
      this.renderer.render(this.scene, this.camera);
    }, (xhr) => {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    }, (error) => {
      console.error('Error loading GLTF:', error);
    });
  }

}
