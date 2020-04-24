window.addEventListener('DOMContentLoaded', init);

function init() {
  const width = 960;
  const height = 540;
  const eyeHeight = 1.5; //人間の目の高さ
  const viewingAngle = 45; //視野角(degree)

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(viewingAngle, width / height, 1, 10000);
  camera.position.set(0, eyeHeight, 5);
  camera.rotation.set(0, 0, 0);

  // カメラコントローラーを作成
  const controls = new THREE.FlyControls(camera, renderer.domElement);
  controls.movementSpeed = 1;	//移動速度
  controls.rollSpeed = Math.PI / 24;   //回転速度
  controls.autoForward = false;         //true:自動で移動する,false:自動で移動しない
  controls.dragToLook = false;        //true:ドラッグによる視点移動を禁止する,false:ドラッグによる視点移動をする

  // 床
  const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      new THREE.MeshStandardMaterial({color: 0xBBBBBB, side: THREE.DoubleSide})
  );
  plane.rotation.set(1.57, 0, 0);
  scene.add(plane);

  // 壁
  const wall = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      new THREE.MeshStandardMaterial({color: 0xFFFF88, side: THREE.DoubleSide})
  );
  wall.position.set(0, 0, 0);
  wall.rotation.set(0, 0, 0);
  scene.add(wall);

  // const box = new THREE.Mesh(
  //     new THREE.BoxGeometry(10, 10, 10),
  //     new THREE.MeshStandardMaterial({color: 0xFFFFFF})
  // );
  // scene.add(box);

  // 額装
  const landscape = new THREE.Mesh(
      new THREE.BoxGeometry(2, 1, 0.2),
      new THREE.MeshStandardMaterial({color: 0xFF0000})
  );
  landscape.position.set(2, 1, 0.1);
  scene.add(landscape);

  const portrait = new THREE.Mesh(
      new THREE.BoxGeometry(1, 2, 0.2),
      new THREE.MeshStandardMaterial({color: 0x00FF00})
  );
  portrait.position.set(-2, 1.5, 0.1);
  scene.add(portrait);

  // 平行光源
  const light = new THREE.DirectionalLight(0xFFFFFF);
  light.intensity = 2; // 光の強さを倍に
  light.position.set(1, 1, 1);
  light.rotation.y += 3.14;
  // シーンに追加
  scene.add(light);

  // 初回実行
  tick();

  function tick() {
    controls.update();

    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  }
}