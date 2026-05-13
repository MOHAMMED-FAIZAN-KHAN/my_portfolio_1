import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

// This component loads and places the 3D computer model.
// If you replace the computer with a car model later, this is one of the main files to edit.
const Computers = ({ isMobile }) => {
  // Loads the 3D model from public/desktop_pc/scene.gltf.
  // Keep the file inside public so the browser can load it directly.
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      {/* Lights make the 3D model visible. Change intensity values to make it brighter or darker. */}
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />

      {/* This displays the actual 3D model.
          scale = model size, position = model location, rotation = model angle. */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

// This component creates the 3D canvas area used in the Hero section.
const ComputersCanvas = () => {
  // isMobile helps us use different model size/position on small screens.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Watch if the screen is 500px wide or smaller.
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the correct mobile/desktop value when the page first loads.
    setIsMobile(mediaQuery.matches);

    // Update isMobile again if the browser is resized.
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Start listening for screen-size changes.
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Stop listening when this component is removed.
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    // Canvas is the Three.js drawing area.
    // camera.position controls where the viewer is looking from.
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* OrbitControls lets the user drag/rotate the model, but zoom is disabled. */}
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      {/* Preload helps all 3D assets load before they are needed. */}
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
