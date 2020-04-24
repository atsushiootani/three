window.addEventListener('DOMContentLoaded', init);

function init() {
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, +1000);

  const box = new THREE.Mesh(
      new THREE.BoxGeometry(100, 100, 100),
      new THREE.MeshStandardMaterial({color: 0xFFFFFF})
  );
  scene.add(box);

  const boxx = new THREE.Mesh(
      new THREE.BoxGeometry(100, 100, 100),
      new THREE.MeshStandardMaterial({color: 0xFF0000})
  );
  scene.add(boxx);
  boxx.position.x = 100;

  const boxy = new THREE.Mesh(
      new THREE.BoxGeometry(100, 100, 100),
      new THREE.MeshStandardMaterial({color: 0x00FF00})
  );
  scene.add(boxy);
  boxy.position.y = 100;

  const boxz = new THREE.Mesh(
      new THREE.BoxGeometry(100, 100, 100),
      new THREE.MeshStandardMaterial({color: 0x0000FF})
  );
  scene.add(boxz);
  boxz.position.z = 100;

  // 平行光源
  const light = new THREE.DirectionalLight(0xFFFFFF);
  light.intensity = 2; // 光の強さを倍に
  light.position.set(1, 1, 1);
  // シーンに追加
  scene.add(light);

  // 初回実行
  tick();

  function tick() {
    requestAnimationFrame(tick);

    // 箱を回転させる
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    //alert(boxx.getWorldPosition().x + ' ' + boxx.getWorldPosition().y + ' ' + boxx.getWorldPosition().z);

    // レンダリング
    renderer.render(scene, camera);
  }
}