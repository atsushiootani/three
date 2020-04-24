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
      new THREE.BoxGeometry(2, 1, 0.1),
      new THREE.MeshStandardMaterial({color: 0xFF0000})
  );
  landscape.position.set(2, 1, 0);
  scene.add(landscape);

  const portrait = new THREE.Mesh(
      new THREE.BoxGeometry(1, 2, 0.1),
      new THREE.MeshStandardMaterial({color: 0x00FF00})
  );
  portrait.position.set(-2, 1.5, 0);
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
    requestAnimationFrame(tick);

    // 箱を回転させる
    //box.rotation.x += 0.01;
    //box.rotation.y += 0.01;

    // レンダリング
    renderer.render(scene, camera);
  }
}