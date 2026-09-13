import * as THREE from '/vendor/three.module.js';

export function mountDinnerScene(host) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.className = 'dinner-canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.set(0, 0.15, 8.9);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xfffcf1, 0x778768, 1.8));
  const key = new THREE.DirectionalLight(0xfff4d8, 2.5);
  key.position.set(-3, 8, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 1.2);
  rim.position.set(4, 3, -5);
  scene.add(rim);
  const group = new THREE.Group();
  scene.add(group);
  const paper = new THREE.MeshStandardMaterial({ color: 0xeee7d5, roughness: 0.92 });
  const olive = new THREE.MeshStandardMaterial({ color: 0x243c2e, roughness: 0.72 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xc5ad72, roughness: 0.42, metalness: 0.6 });
  const cover = new THREE.Mesh(new THREE.BoxGeometry(3.18, 4.42, 0.08), olive);
  cover.position.set(-0.2, 0.035, -0.15);
  cover.rotation.z = 0.135;
  group.add(cover);
  const underlay = new THREE.Mesh(new THREE.BoxGeometry(3.02, 4.27, 0.035), paper);
  underlay.position.set(0.055, -0.04, -0.055);
  underlay.rotation.z = -0.024;
  group.add(underlay);
  const menu = new THREE.Mesh(new THREE.BoxGeometry(3, 4.25, 0.055), paper);
  group.add(menu);
  const cardCanvas = document.createElement('canvas');
  cardCanvas.width = 768; cardCanvas.height = 1088;
  const ctx = cardCanvas.getContext('2d');
  ctx.fillStyle = '#f8f4e9'; ctx.fillRect(0, 0, 768, 1088);
  ctx.strokeStyle = '#b5a174'; ctx.lineWidth = 1.5; ctx.strokeRect(32, 32, 704, 1024);
  ctx.strokeStyle = '#d9cfb5'; ctx.lineWidth = 1; ctx.strokeRect(43, 43, 682, 1002);
  ctx.textAlign = 'center'; ctx.fillStyle = '#293e30';
  ctx.font = '20px Georgia'; ctx.fillText('THE FOUNDER’S TABLE', 384, 117);
  ctx.font = 'italic 29px Georgia'; ctx.fillText('An evening in good company', 384, 169);
  ctx.font = '94px Georgia'; ctx.fillText('Menu', 384, 308);
  ctx.fillStyle = '#9e895d'; ctx.font = '31px Georgia'; ctx.fillText('✳', 384, 374);
  ctx.strokeStyle = '#c8b995'; ctx.beginPath();
  ctx.moveTo(229, 363); ctx.lineTo(327, 363);
  ctx.moveTo(441, 363); ctx.lineTo(539, 363); ctx.stroke();
  const courses = [
    ['TO BEGIN', 'Burrata & heirloom tomatoes', 'Basil · extra virgin olive oil'],
    ['AT THE TABLE', 'Wild mushroom risotto', 'Aged parmesan · fresh thyme'],
    ['SOMETHING SWEET', 'Lemon & olive oil cake', 'Seasonal berries · crème fraîche']
  ];
  courses.forEach(([label, dish, note], index) => {
    const y = 451 + index * 161;
    ctx.fillStyle = '#7e704f'; ctx.font = '17px sans-serif'; ctx.fillText(label, 384, y);
    ctx.fillStyle = '#293e30'; ctx.font = '37px Georgia'; ctx.fillText(dish, 384, y + 48);
    ctx.fillStyle = '#59634f'; ctx.font = 'italic 23px Georgia'; ctx.fillText(note, 384, y + 85);
  });
  ctx.strokeStyle = '#c6bb96'; ctx.beginPath(); ctx.moveTo(268, 928); ctx.lineTo(500, 928); ctx.stroke();
  ctx.fillStyle = '#6d705d'; ctx.font = '17px sans-serif'; ctx.fillText('SAMPLE MENU · FINAL DISHES TO BE CONFIRMED', 384, 981);
  const texture = new THREE.CanvasTexture(cardCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  const face = new THREE.Mesh(new THREE.PlaneGeometry(3, 4.25), new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }));
  face.position.z = 0.029;
  menu.add(face);
  const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 4.2, 8), gold);
  spine.position.set(-1.49, 0, 0.048); cover.add(spine);
  const seal = new THREE.Group();
  seal.position.set(-1.4, -1.66, 0.105);
  seal.rotation.z = 0.12;
  const wax = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.3, 0.065, 48), olive);
  wax.rotation.x = Math.PI / 2;
  seal.add(wax);
  const sealRim = new THREE.Mesh(new THREE.TorusGeometry(0.235, 0.01, 6, 48), gold);
  sealRim.position.z = 0.038;
  seal.add(sealRim);
  const sealCanvas = document.createElement('canvas');
  sealCanvas.width = sealCanvas.height = 128;
  const sealCtx = sealCanvas.getContext('2d');
  sealCtx.fillStyle = '#d4c397'; sealCtx.textAlign = 'center'; sealCtx.font = 'italic 75px Georgia';
  sealCtx.fillText('f', 60, 82);
  const sealTexture = new THREE.CanvasTexture(sealCanvas);
  sealTexture.colorSpace = THREE.SRGBColorSpace;
  const monogram = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.4), new THREE.MeshBasicMaterial({ map: sealTexture, transparent: true, toneMapped: false }));
  monogram.position.z = 0.042;
  seal.add(monogram);
  group.add(seal);
  // One texture supplies a soft shadow without per-frame shadow maps.
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = shadowCanvas.height = 128;
  const shadowCtx = shadowCanvas.getContext('2d');
  const gradient = shadowCtx.createRadialGradient(64, 64, 10, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(36,50,28,0.24)'); gradient.addColorStop(1, 'rgba(36,50,28,0)');
  shadowCtx.fillStyle = gradient; shadowCtx.fillRect(0, 0, 128, 128);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(4.7, 1.0), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false }));
  shadow.position.set(0, -2.42, -0.6); scene.add(shadow);
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = true, frame = 0, last = 0, pointerX = 0, pointerY = 0, lost = false;
  function render(time = 0) {
    frame = 0;
    if (!visible || document.hidden || lost) return;
    if (time - last >= 32 || motion.matches || time === 0) {
      const t = motion.matches ? 0 : time / 1000;
      const scroll = motion.matches ? 0 : Math.min(window.scrollY / window.innerHeight, 1.5);
      group.rotation.y = -0.24 + (motion.matches ? 0 : Math.sin(t * 0.35) * 0.06 + pointerX * 0.2 + scroll * 0.25);
      group.rotation.x = -0.08 + (motion.matches ? 0 : pointerY * 0.08 + scroll * 0.12);
      group.rotation.z = -0.09;
      group.position.y = motion.matches ? 0 : Math.sin(t * 0.8) * 0.06 - scroll * 0.65;
      renderer.render(scene, camera);
      last = time;
    }
    if (!motion.matches) frame = requestAnimationFrame(render);
  }
  function restart() { cancelAnimationFrame(frame); render(); }
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.set(0, 0.15, 8.9);
    camera.position.multiplyScalar(Math.max(1, 0.82 / camera.aspect));
    camera.updateProjectionMatrix(); restart();
  });
  resize.observe(host);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; restart(); }).observe(host);
  document.addEventListener('visibilitychange', restart);
  motion.addEventListener('change', restart);
  host.addEventListener('pointermove', event => {
    const bounds = host.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
  });
  host.addEventListener('pointerleave', () => { pointerX = pointerY = 0; });
  renderer.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); lost = true; host.classList.remove('three-ready'); cancelAnimationFrame(frame); });
  renderer.domElement.addEventListener('webglcontextrestored', () => { lost = false; restart(); host.classList.add('three-ready'); });
  host.append(renderer.domElement);
  renderer.setSize(host.clientWidth, host.clientHeight, false);
  camera.aspect = host.clientWidth / host.clientHeight;
  camera.updateProjectionMatrix();
  render();
  host.classList.add('three-ready');
}
