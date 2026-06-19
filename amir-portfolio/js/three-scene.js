// --- 3D Background Initialization ---
function initThreeJS() {
    const container = document.getElementById('canvas-container');
    
    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b1120, 0.002);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Particles - Representing Network/Connectivity
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 80; 
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material for particles
    const material = new THREE.PointsMaterial({
        size: 0.2,
        color: 0x38bdf8, // Accent color
        transparent: true,
        opacity: 0.8,
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    // Connecting Lines (Network effect via wireframe)
    const geoGeometry = new THREE.IcosahedronGeometry(15, 2);
    const geoMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x38bdf8, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.05 
    });
    const wireframeSphere = new THREE.Mesh(geoGeometry, geoMaterial);
    scene.add(wireframeSphere);

    // Interaction Variables
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    // Mouse Move Event
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        const targetX = mouseX * 0.001;
        const targetY = mouseY * 0.001;

        // Rotate particles
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        // React to mouse
        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

        // Wireframe rotates opposite direction
        wireframeSphere.rotation.y -= 0.002;
        wireframeSphere.rotation.x -= 0.001;

        // Gentle pulsing
        wireframeSphere.scale.setScalar(1 + Math.sin(elapsedTime * 0.5) * 0.05);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Execute immediately since script is loaded at bottom of body
initThreeJS();