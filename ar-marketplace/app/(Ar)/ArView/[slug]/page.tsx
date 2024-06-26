/* eslint no-use-before-define: 0 */  // -->
//@ts-nocheck
'use client';
import './App.css';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { XREstimatedLight } from 'three/examples/jsm/webxr/XREstimatedLight';
import {useEffect, useState} from 'react';
import { toast } from 'sonner';
import {usePathname, useRouter} from 'next/navigation';
import JsonList from '../../../../mocks/mock.json';
import {Button} from '@/components/ui/button';

function ArScene() {
  const router = useRouter();
  const pathname = usePathname();
  const [desiredItem, setDesiredItem] = useState();

  let reticle;
  let hitTestSource = null;
  let hitTestSourceRequested = false;

  let scene, camera, renderer;

  let items = [];
  let itemSelectedIndex = 0;

  let controller;

  useEffect(() => {
    init();
    animate();
  }, [desiredItem]);

  const init =  () => {
    JsonList.map((product)=>{
      product.categories.map( (category) => {
        category.items.map( (item) => {
          if (item.slug === pathname.split('/')[2]){
            setDesiredItem(item);
          }
        });
      });
    });

    if(!desiredItem){
      return;
    }

    let myCanvas = document.getElementById('canvas');
    if (myCanvas == null) return;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      70,
      myCanvas.innerWidth / myCanvas.innerHeight,
      0.01,
      20
    );

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({
      canvas: myCanvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(myCanvas.innerWidth, myCanvas.innerHeight);
    renderer.xr.enabled = true;

    const xrLight = new XREstimatedLight(renderer);
    xrLight.addEventListener('estimationstart', () => {
      scene.add(xrLight);
      scene.remove(light);
      if (xrLight.environment) {
        scene.environment = xrLight.environment;
      }
    });

    xrLight.addEventListener('estimationend', () => {
      scene.add(light);
      scene.remove(xrLight);
    });

    let arButton = ARButton.createButton(renderer, {
      requiredFeatures: ['hit-test'],
      optionalFeatures: ['dom-overlay', 'light-estimation'],
      domOverlay: { root: document.body },
    });
    arButton.style.bottom = '20%';
    arButton.style.opacity = '1';
    arButton.addEventListener('click', ()=>{
      toast('Modo AR ativado', {
        style: {
          marginTop: '20px'
        }
      });
    });
    console.log(arButton);
    document.body.appendChild(arButton);

    const loader = new GLTFLoader();
    loader.load(desiredItem.modelPath, function (glb) {
      items[itemSelectedIndex] = glb.scene;
    });

    controller = renderer.xr.getController(0);
    controller.addEventListener('select', onSelect);
    scene.add(controller);

    reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial()
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);
  };

  const onSelect = () => {
    if (reticle.visible) {
      let newModel = items[itemSelectedIndex].clone();
      newModel.visible = true;
      reticle.matrix.decompose(
        newModel.position,
        newModel.quaternion,
        newModel.scale
      );
      let scaleFactor = desiredItem.modelScale;
      newModel.scale.set(scaleFactor, scaleFactor, scaleFactor);

      scene.add(newModel);
    }
  };

  // const onClicked = (e, selectItem, index) => {
  //   itemSelectedIndex = index;
  //   for (let i = 0; i < models.length; i++) {
  //     const el = document.querySelector('#item' + i);
  //     el.classList.remove('clicked');
  //   }
  //   e.target.classList.add('clicked');
  // };

  // const setupFurnitureSelection = () => {
  //   for (let i = 0; i < models.length; i++) {
  //     const el = document.querySelector('#item' + i);
  //     if (el != null) {
  //       el.addEventListener('beforexrselect', (e) => {
  //         e.preventDefault();
  //         e.stopPropagation();
  //       });
  //       el.addEventListener('click', (e) => {
  //         e.preventDefault();
  //         e.stopPropagation();
  //         onClicked(e, items[i], i);
  //       });
  //     }
  //   }
  // };

  const animate = () => {
    if (renderer !== null && renderer !== undefined) {
      renderer.setAnimationLoop(render);
    }
  };

  const render = (timestamp, frame) => {
    if (frame) {
      const elements = document.querySelectorAll('#ARButton');
      elements.forEach(element => {
        element.style.display = 'none';
      });
      const referenceSpace = renderer.xr.getReferenceSpace();
      const session = renderer.xr.getSession();

      if (hitTestSourceRequested === false) {
        session.requestReferenceSpace('viewer').then(function (referenceSpace) {
          session
            .requestHitTestSource({ space: referenceSpace })
            .then(function (source) {
              hitTestSource = source;
            });
        });

        session.addEventListener('end', function () {
          hitTestSourceRequested = false;
          hitTestSource = null;
        });

        hitTestSourceRequested = true;
      }

      if (hitTestSource) {
        const hitTestResults = frame.getHitTestResults(hitTestSource);

        if (hitTestResults.length) {
          const hit = hitTestResults[0];

          reticle.visible = true;
          reticle.matrix.fromArray(
            hit.getPose(referenceSpace).transform.matrix
          );
        } else {
          reticle.visible = false;
        }
      }
    }

    renderer.render(scene, camera);
  };

  return (
    <div className="ar-scene h-full">
      <canvas id="canvas" className=""></canvas>
      <div className="flex items-center justify-center">
        <Button  onClick={()=> {
          window.location.href = '/';
          setDesiredItem(null);
          renderer = null;
        }} className=" w-28 h-12">
          Home
        </Button>
      </div>
    </div>
  );
}

export default ArScene;
