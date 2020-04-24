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
  let loader = new THREE.TextureLoader();

  {
    var spriteMap = loader.load('./textures/cat.jpg');
    var spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, color: 0xffffff});
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(1.7, 1, 1); //ここを画像サイズのアスペクトに合わせて指定する必要がある
    sprite.position.set(2, eyeHeight, 0.2);
    scene.add(sprite);
  }

  {
    var spriteMap = loader.load('./textures/icecream.jpg');
    var spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, color: 0xffffff});
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(1, 1.7, 1); //ここを画像サイズのアスペクトに合わせて指定する必要がある
    sprite.position.set(-2, eyeHeight, 0.2);
    scene.add(sprite);
  }

  // 平行光源
  const light = new THREE.DirectionalLight(0xFFFFFF);
  light.intensity = 2; // 光の強さを倍に
  light.position.set(1, 1, 1);
  light.rotation.y += 3.14;
  // シーンに追加
  scene.add(light);

  // マウス座標を取得
  let mouseX = 0;
  document.addEventListener('mousemove', event => {
    mouseX = event.pageX / width * 2 - 1; //-1 ~ 1 を返す
  });

  // マウスをクリックしているか
  let mouseDown = false;
  document.addEventListener('mousedown', event=>{
    mouseDown = true;
  });
  document.addEventListener('mouseup', event => {
    mouseDown = false;
  })

  // 初回実行
  tick();

  function tick() {

    // マウスカーソルが右にあったら右に、左にあったら左にカメラを移動
    if (mouseX < -0.1 || 0.1 < mouseX) {
      camera.position.x += 0.02 * mouseX;
    }

    // マウスをクリックしていたらズーム
    if (mouseDown) {
      camera.zoom += (2 - camera.zoom) * 0.1;
    }
    else{
      camera.zoom += (1 - camera.zoom) * 0.1;
    }
    camera.updateProjectionMatrix();

    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  }
}